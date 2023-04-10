import React from 'react'
import { Table, Callout, Card, Thumbnail, StackIcon, CalendarIcon } from '../..'
import ComponentViewer from '../ComponentViewer'

export const Tables = () => {
  return (
    <>
      <ComponentViewer
        component={Table}
        propsName="TableProps"
        examples={[
          {
            props: {
              data: Array.from(Array(4)).map((_, i) => ({
                title: `title ${i + 1}`,
                subtitle: `subtitle ${i + 1}`,
                description: `lorem ipsum ${i + 1}`,
                author: 'mario',
              })),
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
              ],
            },
          },
        ]}
      />
    </>
  )
}
