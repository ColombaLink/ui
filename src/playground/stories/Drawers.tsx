import React, { useState } from 'react'
import { Avatar } from '~/components/Avatar'
import { Drawer } from '~/components/Drawer'
import { Code } from '~/components/Code'
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

export const Drawers = () => {
  const [drawer, setDrawer] = useState(false)

  return (
    <div>
      {/* <Code value={codeExample} space /> */}
      <ComponentViewer
        component={Drawer}
        propsName="DrawerProps"
        // examples={[
        //   {
        //     props: {
        //       label: 'Label',
        //       isRendered: true,
        //       closeFunc: () => console.log('asdasd'),
        //     },
        //   },
        // ]}
      />

      {/* <div>
        <Drawer
          isRendered={drawer}
          closeFunc={() => setDrawer(false)}
          label="asdasd"
        >
          asdasd
        </Drawer>
      </div> */}
    </div>
  )
}

// export const Drawer = () =>{

// }
