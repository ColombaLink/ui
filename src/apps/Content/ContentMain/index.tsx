import React, { FC } from 'react'
import { Table, Page, useContextState, AddIcon, Button } from '~'
import { useViews } from '../hooks/useViews'
import { View } from '../types'
import { useQuery } from '@based/react'

export const ContentMain: FC<{}> = () => {
  const [view] = useContextState<View>('view')

  const views = useViews()

  const currentView =
    views.custom?.find((v) => v.id === view?.id) ??
    views.default?.find((v) => v.id === view?.id)

  const { data } = useQuery('db', currentView)

  console.info('data', data)

  // const [db] = useContextState('db', 'default')
  // const { load, schema } = useSchema(db)

  // console.log('SCHEMA ??', schema.types[view]?.fields)

  // console.log(
  //   'data ->',
  //   data,
  //   'Current view ->',
  //   currentView,
  //   'view -> ',
  //   view,
  //   'views -> ',
  //   views
  // )

  return (
    <Page>
      <Button icon={<AddIcon />} space>
        Add Item
      </Button>
      <Table
        headers={[
          {
            key: 'name',
            label: 'Name',
          },
          {
            key: 'body',
            label: 'Story',
          },
          {
            key: 'createdAt',
            label: 'Date',
          },
          {
            key: 'snurp',
            label: 'Snurpies',
          },
        ]}
        data={data?.data || []}
        height={400}
        /* --- optional --- */
        // width={676}
        // rowCount={13}
        // columnCount={10}
        // columnWidth={142}
        // TODO onclic wil je de rowindex hebben ??
        // onClick={(e) => console.log(e)}
      />
    </Page>
  )
}
