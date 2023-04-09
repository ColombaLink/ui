import React, { FC, useState } from 'react'
import { styled, Style, Table, Page, useContextState } from '~'
import { useViews } from '../hooks/useViews'
import { View } from '../types'
import { useQuery } from '@based/react'

export const ContentMain: FC<{}> = () => {
  const [view, setView] = useContextState<View>('view')

  // get view

  const views = useViews()

  const currentView =
    views.custom?.find((v) => v.id === view.id) ??
    views.default?.find((v) => v.id === view.id)

  const { data, loading } = useQuery('db', currentView)

  console.log('???', data, currentView, view, views)

  return (
    <Page>
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
        data={data?.data}
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
