import React, { FC } from 'react'
import { Table, Page, useContextState, AddIcon, Button } from '~'
import { useViews } from '../hooks/useViews'
import { View } from '../types'
import { useQuery } from '@based/react'

export const ContentMain: FC<{}> = () => {
  const [view] = useContextState<View>('view')
  const [db] = useContextState('db', 'default')

  const views = useViews()

  const { data, loading } = useQuery(
    'db',
    view ? { $db: db, ...view.query } : undefined
  )

  console.info('data', data, view && { $db: db, ...view.query })

  console.info(
    'data ->',
    data,
    'Current view ->',
    view,
    'view -> ',
    view,
    'views -> ',
    views
  )

  console.info('DATA', data, loading, view)

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
