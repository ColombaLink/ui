import React from 'react'
import { Table as TableComponent } from '../..'
import ComponentViewer from '../ComponentViewer'

global.genTableData = (): {
  title?: string
  subtitle?: string
  description?: string
  author?: string
  id?: string
}[] => {
  return Array.from(Array(1e2)).map((_, i) => ({
    title: `title ${i + 1}`,
    subtitle: `subtitle ${i + 1}`,
    description: Math.random() > 0.5 ? `lorem ipsum ${i + 1}` : undefined,
    author: `mar${i + 1}o`,
    id: `xxxx${i}`,
  }))
}

export const Table = () => {
  return (
    <>
      <ComponentViewer
        component={TableComponent}
        propsName="TableProps"
        examples={[
          {
            code: `import { Table, Badge, Avatar } from '@based/ui'

const YellowBlock = ({children}) => {
  return <div style={{backgroundColor: 'yellow' }}>{children}</div>
}

const headers = [
  { key: 'id', label: 'ID', render: Badge },
  { key: 'title', label: 'Name', render: YellowBlock },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'author', label: 'Author', render: Badge, renderProps:{color:'accent', outline:true} },
  { key: 'description', label: 'Description' },
]


const handleClick = (e, rowData) => {
  console.log('Clicked on row:', rowData)
}

<Table data={genTableData()} headers={headers} onClick={handleClick} height={400} />
            `,
          },
        ]}
      />
    </>
  )
}
