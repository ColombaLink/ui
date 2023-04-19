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
  return Array.from(Array(1e3)).map((_, i) => ({
    title: `title ${i + 1}`,
    subtitle: `subtitle ${i + 1}`,
    description: Math.random() > 0.5 ? `lorem ipsum ${i + 1}` : undefined,
    author: `mar${i + 1}o`,
    id: `xxxx${i}`,
    options: '',
  }))
}

global.YellowBlock = ({ data, key }) => {
  return <div style={{ backgroundColor: 'yellow' }}>xxx{data[key]}</div>
}

// const SimpleMenu = global.SimpleMenu = () => {
//   const dialog = useDialog()
//   return (
//     <>
//       <ContextItem
//         onClick={() => {
//           dialog.open(<Button>Yes</Button>)
//         }}
//       >
//         Open dialog
//       </ContextItem>
//       <ContextItem inset>Do something else</ContextItem>
//       <ContextItem
//         onClick={() => {
//           alert('close it')
//         }}
//         icon={ScheduleIcon}
//         iconRight={() => {
//           return (
//             <MoreIcon
//               onClick={() => {
//                 alert('snapje')
//               }}
//             />
//           )
//         }}
//       >
//         Flap
//       </ContextItem>
//     </>
//   )
// }

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
            code: `import { Table, Badge, Avatar, Button, MoreIcon, useContextMenu, ContextItem, ScheduleIcon, useDialog } from '@based/ui'


const headers = [
  { key: 'title', label: 'Name' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'author', label: 'Author', customComponent: YellowBlock },
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
