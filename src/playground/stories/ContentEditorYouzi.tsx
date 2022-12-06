import { useClient } from '@based/react'
import React from 'react'
import { Page } from '~/components/Page'
import { ContentEditor as Editor } from '../../components/Content/ContentEditor'

export const ContentEditorYouzi = () => {
  const id = '100739b8d3'
  const client = useClient()

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Page>
        <Editor
          id={id}
          onChange={(data) => {
            console.log(JSON.stringify(data, null, 2))
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