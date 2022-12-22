import React from 'react'
import ComponentViewer from '../ComponentViewer'

import {
  Code,
  Button,
  ContextItem,
  ContextDivider,
  useContextMenu,
  DuplicateIcon,
  DeleteIcon,
} from '~'

// export const ContextHook = () => {
//   const codeExample = `
//     import {ContextItem, ContextDivider, useContextMenu} from '@based/ui'

//     // create a context menu component
//     const TestMenu = () => {
//         return (
//           <>
//             <ContextItem icon={DuplicateIcon}>Duplicate</ContextItem>
//             <ContextDivider />
//             <ContextItem onClick={() => {}} icon={DeleteIcon}>
//               Delete
//             </ContextItem>
//           </>
//         )
//       }

//     // use the hook (context menu you want to show, children, position)
//     <Button onClick={useContextMenu(TestMenu, {} , { placement: 'left' })}>Click me</Button>
//     `

//   return (
//     <>
//       <Code value={codeExample} space />
//       <Button onClick={useContextMenu(TestMenu, {}, { placement: 'left' })}>
//         Click me
//       </Button>
//     </>
//   )
// }

/*
(
  component: ComponentType<PropsWithChildren<P>>,
  props?: P | PropsWithChildren<P>,
  position?: PositionProps & { style?: CSSProperties },
  handler?: (selection: Event | any) => () => void | undefined
)
*/

export const UseContextMenu = () => {
  return (
    <>
      <ComponentViewer
        propsName="useContextMenu"
        title="useContextMenu"
        propsDef={{
          name: 'useContextMenu',
          props: {
            flap: { type: 'string', optional: true },
          },
          code: 'flap!',
          file: './hooks/useContextMenu.ts',
        }}
        examples={[
          {
            props: {
              children: 'Just a button',
              // eslint-disable-next-line
              onClick: () => console.log('clicked'),
            },
          },
        ]}
      />
    </>
  )
}

// const TestMenu = () => {
//   return (
//     <>
//       <ContextItem onClick={() => {}} icon={DuplicateIcon}>
//         Duplicate
//       </ContextItem>
//       <ContextDivider />
//       <ContextItem onClick={() => {}} icon={DeleteIcon}>
//         Delete
//       </ContextItem>
//     </>
//   )
// }
