import { useSchema } from '@based/react'
import React, { useState } from 'react'
import {
  Button,
  ContextItem,
  ScheduleIcon,
  MoreIcon,
  Dialog,
  useContextMenu,
  useDialog,
  DeleteIcon,
  useRoute,
  DuplicateIcon,
} from '~'

// const MyThing = () => {
//   return (
//     <>
//       <Route
//         route="environment-[name=youzi]-[flap]/[flip]?flip=1"
//         component={Hello}
//       />
//       <Route
//         route="environment-[name=youzi]-[flap]/[flip]?flip=1"
//         component={Foo}
//       />
//     </>
//   )
// }

// const Element = useRouter(
//   'environment-[name=youzi]-[flap]/[flip]?flip=1',
//   (props, { path, query, setRoute }) => {
//     return <div>

//     </div>
//   }
// )

// const RawRoute = ({ children }) => {
//   const flap = useRoute('killer-[snurp1]mysnup[power]/[snapje]')

//   // console.log(JSON.stringify(flap, null, 2))

//   return <div style={{ marginLeft: 0 }}> - RawRoute {children}</div>
// }

// const X = () => {
//   const flap = useRoute('[X]')

//   // console.log('RAW ROUTE NEST NEST! DOUBLE', JSON.stringify(flap, null, 2))

//   return <div>MY THING</div>
// }

// const RawRoute2 = ({ children }) => {
//   const [bla, setBla] = useState('snup')

//   const flap = useRoute('[id]/[envId]')

//   // console.log('RAW ROUTE NEST', JSON.stringify(flap, null, 2))

//   return (
//     <div style={{ marginLeft: 0 }}>
//       {' '}
//       RawRoute {children}{' '}
//       <button onClick={() => setBla(Math.random())}>poop</button>
//     </div>
//   )
// }

const TestRoute = () => {
  const X = useRoute('[snurp]')
  console.info(X)
  return (
    <div>
      hello {X.path.snurp}
      <Button
        onClick={() => {
          X.setLocation(
            '/' + String(~~(Math.random() * 1000)) + '?story=Router'
          )
        }}
      >
        Location!
      </Button>
    </div>
  )
}

export const Router = () => {
  return (
    <>
      <TestRoute />
      -------------------------------
      {/* <RawRoute>
        <TestRoute />
      </RawRoute> */}
    </>
  )
}
