import React, { useState } from 'react'
import { Page } from '~/components/Page'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import { useClient, useSchema, useData } from '@based/react'
import { useLocation } from '~/hooks'

export const FileOrderSystem = () => {
  // now gotta set up some references to files...

  const db = 'default' // TODO

  const [files, setFiles] = useState<any>([])
  const [folders, setFolders] = useState<any>([])
  const [, setLocation] = useLocation()

  const [newRefName, setNewRefName] = useState<string>('')

  const { schema, loading: loadingSchema } = useSchema()
  const { data: views } = useData('basedObserveViews')
  const client = useClient()

  console.log('client', client)
  console.log('data', views)
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

  // mediafolder?story=based-app&filter=%5B%5D&target=70bff050cb&field=animals
  //  setLocation(`?target=${item.id}&field=${field}&filter=%5B%5D`)

  //  /content/mediafolder?story=based-app&filter=%5B%5D&target=70bff050cb&field=animals

  //  setFolders([...folderArr])
  // console.log('files --->', schema?.types?.file)

  return (
    <Page>
      <Text typo="body600" space="24px">
        hello - type(mediafolder) for link need target id , field name
      </Text>
      {/* show references in media folder */}
      {folderArr.length > 0 &&
        folderArr.map((name, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid blue',
              margin: 4,
              width: 100,
              height: 100,
              display: 'inline-block',
            }}
            onDoubleClick={() => {
              setLocation(
                `/content/mediafolder?story=based-app&filter=%5B%5D&target=70bff050cb&field=${name}`
              )
            }}
          >
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
        Show all file ids
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
