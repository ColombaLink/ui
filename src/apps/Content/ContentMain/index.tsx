import React, { FC, useState } from 'react'
import { styled, Style, Table, Page } from '~'

export const ContentMain: FC<{}> = () => {
  const [data, setData] = useState([
    {
      name: 'Jim',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
      snurp: 'florp',
    },
    {
      name: 'Yves',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
      snurp: 'flarp',
    },
    {
      name: 'Youri',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
      snurp: 'flurp',
    },
  ])

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
        data={data}
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
