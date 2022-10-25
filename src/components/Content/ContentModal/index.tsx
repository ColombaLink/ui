import { useClient, useData } from '@based/react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Badge } from '~/components/Badge'
import { Button } from '~/components/Button'
import { RightSidebar } from '~/components/RightSidebar'
import { ScrollArea } from '~/components/ScrollArea'
import { Text } from '~/components/Text'
import { useLocation, useSchema } from '~/hooks'
import { CloseIcon } from '~/icons'
import { border, color } from '~/utils'
import { ContentEditor } from '../ContentEditor'
import { useDescriptor } from '../hooks/useDescriptor'
import { prettyDate } from '@based/pretty-date'
import { Select } from '~/components/Select'
import useLocalStorage from '@based/use-local-storage'
import languageNames from 'countries-list/dist/minimal/languages.en.min.json'
import { Dialog, useDialog } from '~/components/Dialog'

const Topbar = ({ id, type, onClose }) => {
  const { descriptor, type: schemaType, loading } = useDescriptor(id)
  return (
    <div
      style={{
        display: 'flex',
        padding: '0 24px',
        height: 64,
        borderBottom: border(1),
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
      <Text style={{ marginLeft: 24 }} weight={600}>
        {id
          ? loading
            ? null
            : `Edit ${schemaType}: ${descriptor}`
          : `Create new ${type}`}
      </Text>
    </div>
  )
}

const SideHeader: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        marginBottom: 12,
        paddingBottom: 8,
      }}
    >
      <Text>{title}</Text>
      {children}
    </div>
  )
}

const LastSaved = ({ id }) => {
  const {
    data: { updatedAt },
  } = useData({
    $id: id,
    updatedAt: true,
  })

  const prettyTime = prettyDate(updatedAt, 'date-time-human')

  return (
    <Text
      color="text2"
      size="13px"
      style={{
        marginTop: 12,
        marginBottom: 24,
      }}
    >
      Last saved {prettyTime === 'Now' ? 'just now' : prettyTime}
    </Text>
  )
}

const Translation = ({ language, setLanguage }) => {
  const { schema, loading } = useSchema()

  return loading ? null : (
    <Select
      value={
        schema.languages.includes(language) ? language : schema.languages[0]
      }
      options={schema.languages.map((iso) => {
        return {
          value: iso,
          label: `${languageNames[iso]} (${iso})`,
        }
      })}
      onChange={(val) => {
        setLanguage(val)
      }}
    />
  )
}

const ContentModalInner = ({ prefix, id, field }) => {
  const client = useClient()
  const [, setLocation] = useLocation()
  const [disabled, setDisabled] = useState(true)
  const ref = useRef({})
  const published = useRef(false)
  const { current: changes } = ref
  const [language, setLanguage] = useLocalStorage('bui_lang')
  const { open } = useDialog()
  const type = id ? null : field

  const onClose = async () => {
    const changedFields = Object.keys(ref.current).length
    if (changedFields) {
      open(
        <Dialog
          label={`You have ${changedFields} unpublished change${
            changedFields === 1 ? '' : 's'
          }`}
        >
          Are you sure you want to exit?
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm
              onConfirm={() => {
                setLocation(prefix)
              }}
            >
              Discard changes (Enter)
            </Dialog.Confirm>
          </Dialog.Buttons>
        </Dialog>
      )
    } else {
      setLocation(prefix)
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
      }}
    >
      <div
        onClick={onClose}
        style={{
          opacity: 0.6,
          width: 300,
          flexGrow: 1,
          backgroundColor: color('background2'),
        }}
      />
      <div
        style={{
          width: 1200,
          backgroundColor: color('background'),
          boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Topbar id={id} type={type} onClose={onClose} />
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
          }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <ContentEditor
              id={id}
              type={type}
              language={language}
              style={{ padding: '48px 76px' }}
              autoFocus={id ? field : null}
              onChange={(data) => {
                setDisabled(false)
                // TODO need to fix this for refs etc
                Object.assign(changes, data)
              }}
            />
          </ScrollArea>
          <RightSidebar style={{ width: 260 }}>
            <SideHeader title="Status" />
            <Button
              disabled={disabled}
              textAlign="center"
              // icon={AddIcon}
              style={{ width: '100%' }}
              onClick={async () => {
                const res = await client.set({
                  $id: id || undefined,
                  type,
                  ...changes,
                })
                published.current = true
                ref.current = {}
                setDisabled(true)
                setLocation(`${prefix}/${res.id}`)
              }}
            >
              {published.current
                ? disabled
                  ? 'Published'
                  : 'Publish changes'
                : 'Publish'}
            </Button>
            <div style={{ minHeight: 18 }}>
              {id ? (
                <>
                  <LastSaved id={id} />
                  <SideHeader title="ID" />
                  <Badge style={{ marginBottom: 24 }}>{id}</Badge>
                </>
              ) : null}
            </div>
            <SideHeader title="Translation" />
            <Translation language={language} setLanguage={setLanguage} />
          </RightSidebar>
        </div>
      </div>
    </div>
  )
}

export const ContentModal = (props) => {
  if (!props.id) {
    return null
  }

  if (props.id === 'create') {
    return <ContentModalInner {...props} id={null} />
  }

  return <ContentModalInner {...props} />
}
