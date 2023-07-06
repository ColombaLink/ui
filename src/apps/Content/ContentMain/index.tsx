import React, { FC, useEffect } from 'react'
import {
  useContextState,
  ContextItem,
  CloseIcon,
  DuplicateIcon,
  EditIcon,
  ContextDivider,
  useDialog,
  LoadingIcon,
} from '~'
import { View } from '../types'
import { useQuery, useClient, Provider } from '@based/react'
import { AddViewModal, EditViewModal } from '../ViewModals'
import { BasedClient } from '@based/client'
import { Content } from './types/Content'
import { Components } from './types/Custom'
import { Modal } from './types/Modal'

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
  const [view] = useContextState<View>('view')
  const [overlay, setOverlay] = useContextState<string>('overlay')

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

  const { data, loading } = useQuery(view ? 'db' : null, {
    $db: 'config',
    $id: view,
    $all: true,
  })

  const { type } = data?.config ?? {}

  if (loading) {
    return <LoadingIcon />
  }

  if (type === 'components') {
    return (
      <Provider client={hubClient}>
        <Components view={data} actions={Actions} />
      </Provider>
    )
  } else if (type === 'content' || type === 'content-modal') {
    return (
      <Provider client={hubClient}>
        <Content view={data} actions={Actions} />
      </Provider>
    )
  } else {
    // return (
    // <Provider client={hubClient}>
    //   <Components view={data} actions={Actions} />
    // </Provider>
    // )
  }

  return null
}
