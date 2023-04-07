import React, { FC, useState } from 'react'
import { styled, Style, Table } from '~'

export const ContentMain: FC<{}> = () => {
  const [data, setData] = useState([
    {
      name: 'Jim',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
    },
    {
      name: 'Yves',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
    },
    {
      name: 'Youri',
      body: 'lorem ipsum',
      createdAt: 1680860825264,
    },
  ])

  return (
    <styled.div>
      Table from ContentMain:
      <Table
        headers={[
          {
            key: 'name',
            label: 'The Name',
          },
          {
            key: 'body',
            label: 'Story',
          },
          {
            key: 'createdAt',
            label: 'Date',
          },
        ]}
        data={data}
        // rowCount={13}
        // columnCount={5}
        width={600}
        height={400}
      />
    </styled.div>
  )
}
