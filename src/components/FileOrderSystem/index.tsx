import React, { useState } from 'react'
import { Page } from '~/components/Page'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import { useClient, useSchema, useData } from '@based/react'

export const FileOrderSystem = () => {
  // now gotta set up some references to files...

  const db = 'default' // TODO

  const [files, setFiles] = useState<any>([])
  const [folders, setFolders] = useState<any>([])

  const [newRefName, setNewRefName] = useState<string>('')

  const { schema, loading: loadingSchema } = useSchema()
  const { data: views } = useData('basedObserveViews')

  // console.log('client', client)
  // console.log('data', views)
  console.log("schema's languages", schema)

  const mediaFolderFields = schema?.types?.mediafolder?.fields

  console.log('----', mediaFolderFields)

  const folderArr = []

  if (mediaFolderFields) {
    console.log('keys ', Object.keys(mediaFolderFields))

    for (const key in mediaFolderFields) {
      if (
        mediaFolderFields[key].type === 'references' &&
        key !== 'parents' &&
        key !== 'children' &&
        key !== 'ancestors' &&
        key !== 'descendants'
      ) {
        folderArr.push(key)
        console.log('key', key)
      }
    }
  }

  //  setFolders([...folderArr])
  // console.log('files --->', schema?.types?.file)

  const client = useClient()

  return (
    <Page>
      <Text typo="body600" space="24px">
        hello file order system branchje
      </Text>
      {/* show references in media folder */}
      {folderArr.length > 0 &&
        folderArr.map((name, idx) => (
          <div key={idx} style={{ border: '1px solid blue', margin: 4 }}>
            {name}
          </div>
        ))}
      <Button
        space="24px"
        onClick={async () => {
          const moreData = await client.get({
            $id: 'root',
            children: {
              $all: true,
              $list: true,
            },
          })
          console.log('moreData', moreData)
          setFiles(moreData.children)
        }}
      >
        Show file ids
      </Button>
      {files?.length > 0 ? (
        <div>
          {files?.map((file: any) => {
            if (file.id.substr(0, 2) === 'fi') {
              return <div key={file.id}>{file.id}</div>
            }
          })}
        </div>
      ) : null}
      {/* show reference names as folders */}
      <Text>Add new ref foldername</Text>
      <Input
        placeholder=""
        value={newRefName}
        onChange={(e) => setNewRefName(e)}
      />
      <Button
        style={{ marginTop: 24 }}
        onClick={async () => {
          await client.updateSchema({
            schema: {
              types: {
                mediafolder: {
                  fields: {
                    [newRefName]: { type: 'references' },
                  },
                },
              },
              db,
            },
          })

          console.log('just created a new reference on')
        }}
      >
        Add new reference folder
      </Button>
    </Page>
  )
}
