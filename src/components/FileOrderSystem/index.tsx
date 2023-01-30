import React from 'react'
import { Page } from '~/components/Page'
import { Text } from '~/components/Text'
import { Button } from '~/components/Button'

import { useClient, useSchema, useData } from '@based/react'

export const FileOrderSystem = () => {
  // now gotta set up some references to files...

  const client = useClient()

  const { schema, loading: loadingSchema } = useSchema()
  const { data: views, loading } = useData('basedObserveViews')

  console.log('client', client)
  console.log('data', views)
  console.log("schema's languages", schema)

  return (
    <Page>
      <Text typo="body600" space="24px">
        hello file order system branchje
      </Text>
      <Button space="24px">Add Reference/folder</Button>
      <div>map through them here ??</div>
    </Page>
  )
}
