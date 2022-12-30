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

const PowerRoute = () => {
  const X = useRoute('powerplay-[nested]/[gur]')

  return (
    <div
      style={{
        border: '1px solid red',
        padding: 10,
        margin: 10,
      }}
    >
      MY PATH - {X.path.nested}
      <Button
        onClick={() => {
          X.setPath({
            nested: Math.round(Math.random() * 1000),
          })
        }}
      >
        set NESTED!
      </Button>
    </div>
  )
}

const TestRoute = () => {
  const X = useRoute('flapper[snurp]/[snap]!!!!!')
  // console.info(X) -- update control
  return (
    <div>
      hello {X.path.snurp}
      <PowerRoute />
      <Button
        onClick={() => {
          X.setLocation(
            '/flapper' + String(~~(Math.random() * 1000)) + '?story=Router'
          )
        }}
      >
        Location!
      </Button>
      <Button
        onClick={() => {
          X.setPath({
            snap: 'SNURF' + Math.round(Math.random() * 1000),
            snurp: Math.round(Math.random() * 1000),
          })
        }}
      >
        set path!
      </Button>
      <Button
        onClick={() => {
          X.setQuery({
            best: Math.round(Math.random() * 1000),
          })
        }}
      >
        set query!
      </Button>
      <Button
        onClick={() => {
          X.setHash('hashtime')
        }}
      >
        set hash!
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
