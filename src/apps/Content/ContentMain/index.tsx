import React, { FC, useEffect, useState } from 'react'
import {
  useContextState,
  ContextItem,
  CloseIcon,
  DuplicateIcon,
  EditIcon,
  ContextDivider,
  Text,
  useDialog,
  styled,
  LoadingIcon,
  useSchema,
} from '~'
import { View } from '../types'
import { useQuery, useClient, Provider } from '@based/react'
import { AddViewModal, EditViewModal } from '../ViewModals'
import { BasedClient } from '@based/client'
import { Content } from './types/Content'
import { Components } from './types/Custom'
import { Modal } from './types/Modal'
import { createRootEditor, createTypeTable } from './types/schema'

const AnimatedWrapper = styled('div', {
  height: '100%',
  width: '100%',
  display: '100%',
})

const Actions: FC<{ view: View }> = ({ view }) => {
  const { open } = useDialog()
  const client = useClient()
  return (
    <>
      <ContextItem
        icon={EditIcon}
        onClick={() => {
          open(
            <EditViewModal
              save
              onChange={(v) => {
                return client.call('db:set', {
                  $db: 'config',
                  $id: view.id,
                  ...v,
                })
              }}
              view={view}
            />
          )
          return false
        }}
      >
        Edit
      </ContextItem>
      <ContextItem
        onClick={() => {
          open(
            <AddViewModal
              view={{
                ...view,
                name: view.name + ' copy',
              }}
            />
          )
          return false
        }}
        icon={DuplicateIcon}
      >
        Clone
      </ContextItem>
      <ContextDivider />
      <ContextItem
        icon={CloseIcon}
        onClick={async () => {
          await client.call('db:delete', {
            $db: 'config',
            $id: view.id,
          })
          return false
        }}
      >
        Remove
      </ContextItem>
    </>
  )
}

export const ContentMain: FC<{ hubClient: BasedClient }> = ({ hubClient }) => {
  const [view] = useContextState<string>('view')
  const [overlay, setOverlay] = useContextState<string>('overlay')
  const { schema, loading: loadingSchema } = useSchema()

  const [animate, setanimate] = useState(false)
  useEffect(() => {
    setanimate(true)
    const timer = setTimeout(() => {
      setanimate(false)
    }, 0)
    return () => {
      clearTimeout(timer)
    }
  }, [view])

  // full view
  // if view === schema:type
  // if overlay === shchema:overlay
  // then auto generate them!

  const [, setOverlayTarget] = useContextState<string>('overlay-target')

  const { open, close } = useDialog()

  useEffect(() => {
    if (overlay) {
      const id = open(<Modal overlay={overlay} />, () => {
        setOverlay(null)
        setOverlayTarget(null)
        setOverlay('')
      })
      return () => {
        setOverlay(null)
        setOverlayTarget(null)
        close(id)
      }
    }
  }, [overlay])

  const isType = view?.startsWith('type-')

  let { data, loading } = useQuery(view && !isType ? 'db' : null, {
    $db: 'config',
    $id: view,
    $all: true,
  })

  if (isType && !loadingSchema) {
    const type = view.replace(/^type-/, '')
    if (!type || !schema.types[type]) {
      return (
        <Text style={{ marginTop: 48 }}>Cannot find type {type} in schema</Text>
      )
    }
    loading = false
    data =
      type === 'root' ? createRootEditor(schema) : createTypeTable(schema, type)
  }

  const { type } = data?.config ?? {}

  if (loading || loadingSchema) {
    return <LoadingIcon />
  }

  if (animate) {
    return
  }

  if (type === 'components') {
    return (
      <AnimatedWrapper>
        <Provider client={hubClient}>
          <Components view={data} actions={Actions} />
        </Provider>
      </AnimatedWrapper>
    )
  } else if (type === 'content' || type === 'content-modal') {
    return (
      <AnimatedWrapper>
        <Provider client={hubClient}>
          <Content view={data} actions={Actions} />
        </Provider>
      </AnimatedWrapper>
    )
  }
  return null
}
