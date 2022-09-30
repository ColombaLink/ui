import { useClient, useData } from '@based/react'
import React from 'react'
import { Button } from '~/components/Button'
import { RightSidebar } from '~/components/RightSidebar'
import { ScrollArea } from '~/components/ScrollArea'
import { Separator } from '~/components/Separator'
import { Text } from '~/components/Text'
import { AddIcon, CloseIcon } from '~/icons'
import { border, color } from '~/utils'
import { ContentEditor } from '../ContentEditor'
import { useItemSchema } from '../hooks/useItemSchema'
import { useLanguage } from '../hooks/useLanguage'

const getDescriptors = (fields, meta) => {
  const options = Object.keys(fields)
    .filter((key) => {
      const { type } = fields[key]
      return type === 'string' || type === 'text'
    })
    .sort((a, b) => {
      return fields[a].meta?.index > fields[b].meta?.index ? 1 : -1
    })

  return meta.descriptor ? [meta.descriptor, ...options] : options
}

const useDescriptor = (id) => {
  const { fields, meta, loading } = useItemSchema(id)
  const { language } = useLanguage()
  const { data } = useData(
    loading
      ? null
      : {
          $id: id,
          $language: language,
          descriptor: {
            $field: getDescriptors(fields, meta),
          },
        }
  )
  return data.descriptor || ''
}

const Topbar = ({ id }) => {
  const descriptor = useDescriptor(id)
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
      <CloseIcon />
      <Text style={{ marginLeft: 24 }} weight={600}>
        {descriptor}
      </Text>
    </div>
  )
}

export const ContentModal = () => {
  const id = '5060967721'
  const client = useClient()

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
        <Topbar id={id} />
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
          }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <ContentEditor
              id={id}
              style={{ padding: '48px 76px' }}
              onChange={(data) => {
                return client.set({
                  $id: id,
                  ...data,
                })
              }}
            />
          </ScrollArea>
          <RightSidebar style={{ minWidth: 210 }}>
            <Text space="16px" size={18} weight={700}>
              Status
            </Text>
            <Separator />
            <Button
              textAlign="center"
              space="24px"
              icon={AddIcon}
              style={{ width: '100%' }}
              // onClick={openSelectField}
            >
              Publish
            </Button>
            {/* <Text space="12px" size={14} weight={600}>
            Documentation
          </Text>
          <Text size={12} color="text2" wrap>
            Read more about schema types in our guide to schema editing.
          </Text> */}
          </RightSidebar>
        </div>
      </div>
    </div>
  )
}
