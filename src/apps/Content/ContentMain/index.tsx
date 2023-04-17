import React, { FC } from 'react'
import { Table, Page, useContextState, AddIcon, Button, useSchema } from '~'
import { useViews } from '../hooks/useViews'
import { View } from '../types'
import { useQuery } from '@based/react'

export const ContentMain: FC<{}> = () => {
  const [view] = useContextState<View>('view')
  const [db] = useContextState('db', 'default')

  const views = useViews()

  const { data } = useQuery('db', view ? { $db: db, ...view.query } : undefined)

  console.info('data', data)

  // const { loading, schema } = useSchema(db)
  // console.log('SCHEMA ??', schema.types[view?.id]?.fields)

  console.log(
    'data ->',
    data,
    'Current view ->',
    view,
    'view -> ',
    view,
    'views -> ',
    views
  )

  return (
    <Page>
      {view ? (
        <>
          <Button icon={<AddIcon />} space>
            Add Item
          </Button>
          <Table headers={view.headers} data={data?.data ?? []} height={400} />
        </>
      ) : (
        <div>no view</div>
      )}
    </Page>
  )
}
