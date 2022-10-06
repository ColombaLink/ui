import { useClient } from '@based/react'
import React from 'react'
import { Page } from '~/components/Page'
import { ContentEditor as Editor } from '../../components/Content/ContentEditor'

export const ContentEditor = () => {
  const id = '100632b95d'
  const client = useClient()

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Page>
        <Editor
          id={id}
          onChange={(data) => {
            return client.set({
              $id: id,
              ...data,
            })
          }}
        />
      </Page>
    </div>
  )
}
