import React from 'react'

import { Drawer } from '~/components/Drawer'

import ComponentViewer from '../ComponentViewer'

// const codeExample = ` import { Drawer } from '~/components/Drawer'

//     <Drawer
//       label="Label"
//       isRendered={drawer}
//       closeFunc={() => setDrawer(false)}
//       sidebar
//     >
//       <div>I am a drawer</div>
//     </Drawer>`

const children = () => {
  return <div>asdasldkasjd</div>
}

export const Drawers = () => {
  return (
    <div>
      <ComponentViewer
        component={Drawer}
        propsName="DrawerProps"
        examples={[
          {
            props: {
              label: 'Label',
              isRendered: true,
              sidebar: true,
              closeFunc: () => console.log('asdasd'),
              style: {
                height: 500,
                // paddingBottom: 20,
              },
              // children: { children },
              // sidebarElem: children,
            },
          },
        ]}
      />
    </div>
  )
}

// export const Drawer = () =>{

// }
