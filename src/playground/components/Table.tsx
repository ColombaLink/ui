
import { Table as TableComponent } from '../..'
import ComponentViewer from '../ComponentViewer'

global.genTableData = (): {
  title?: string
  subtitle?: string
  description?: string
  author?: string
  id?: string
}[] => {
  return Array.from(Array(1e4)).map((_, i) => ({
    title: `title ${i + 1}`,
    subtitle: `subtitle ${i + 1}`,
    description: Math.random() > 0.5 ? `lorem ipsum ${i + 1}` : undefined,
    author: `mar${i + 1}o`,
    id: `xxxx${i}`,
    height: Math.max(~~(Math.random() * 500), 56),
    options: '',
  }))
}

global.YellowBlock = ({ data, header }) => {
  return <div style={{ backgroundColor: 'yellow' }}>{data[header.key]}</div>
}

export const Table = () => {
  //   <Button
  //   icon={MoreIcon}
  //   ghost
  //   onClick={useContextMenu(Actions, { machine })}
  // />

  return (
    <>
      <ComponentViewer
        component={TableComponent}
        propsName="TableProps"
        examples={[
          {
            code: `import { Table, } from '@based/ui'

const headers = [
  { key: 'title', label: 'Title'},
  { key: 'author', label: 'Author', customComponent: YellowBlock },
  { key: 'description', label: 'Description'  },
  { key: 'subtitle', label: 'Subtitle' },
]

const handleClick = (e, rowData) => {
  console.log('Clicked on row:', rowData)
}

<Table data={genTableData()} headers={headers} onClick={handleClick} height={400} outline />
            `,
          },
          {
            code: `import { Table, } from '@based/ui'

const headers = [
  { key: 'title', label: 'Title'},
  { key: 'author', label: 'Author', customComponent: YellowBlock },
  { key: 'description', label: 'Description'  },
  { key: 'subtitle', label: 'Subtitle' },
]

const handleClick = (e, rowData) => {
  console.log('Clicked on row:', rowData)
}

<Table data={genTableData()} headers={headers} calcRowHeight={(data) => data.height} onClick={handleClick} height={400} />
            `,
          },
        ]}
      />
    </>
  )
}
