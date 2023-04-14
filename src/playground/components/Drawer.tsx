import React from 'react'

import { Drawer as DrawerComponent } from '~'

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

export const Drawer = () => {
  return (
    <div>
      <ComponentViewer
        component={DrawerComponent}
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
