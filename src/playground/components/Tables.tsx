import React from 'react'
import { Table } from '../..'
import ComponentViewer from '../ComponentViewer'

export const Tables = () => {
  const clickFunction = (e, data) => {
    console.log(e, data)
  }

  return (
    <>
      <ComponentViewer
        component={Table}
        propsName="TableProps"
        examples={[
          {
            props: {
              data: Array.from(Array(100)).map((_, i) => ({
                title: `title ${i + 1}`,
                subtitle: `subtitle ${i + 1}`,
                description: `lorem ipsum ${i + 1}`,
                author: `mar${i + 1}o`,
                id: `xxxx${i}`,
              })),
              // rowCount: 10,
              onClick: clickFunction,
              headers: [
                {
                  key: 'title',
                  label: 'Title',
                },
                {
                  key: 'subtitle',
                  label: 'Subtitle',
                },
                {
                  key: 'description',
                  label: 'Description',
                },
                {
                  key: 'author',
                  label: 'Author',
                },
                {
                  key: 'id',
                  label: 'ID',
                },
              ],
            },
          },
        ]}
      />
    </>
  )
}
