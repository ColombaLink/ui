import React from 'react'
import { Provider } from '~'
import {
  Container,
  Page,
  Topbar,
  Authorize,
  ResetRequest,
  LoadingIcon,
} from '~'
import { client } from './shared'
import { LargeLogo } from '~/components/Logo'
import { useData, useAuth } from '@based/react'

const App = ({ user }: { user: { id: string; token: string } }) => {
  const { data, loading } = useData({
    $id: user.id,
    todos: {
      $list: {
        $sort: {
          $field: 'createdAt',
          $order: 'asc',
        },
        $limit: 100,
        $offset: 0,
        $find: {
          $traverse: 'children',
          $filter: {
            $field: 'type',
            $operator: '=',
            $value: 'thing',
          },
        },
      },
    },
  })

  return (
    <>
      <Topbar
        data={{ Projects: '/', Settings: '/settings' }}
        onProfile={() => {
          // add more here
          console.log('clicked')
        }}
      />
      <Page
        style={{
          border: '10px solid red',
        }}
      >
        {true ? <LoadingIcon /> : null}
      </Page>
    </>
  )
}

export const AuthComponent = () => {
  return (
    <Provider client={client}>
      <Authorize logo app={App} />
    </Provider>
  )
}

// export const LoginComponent = () => {
//   return (
//     <Provider client={client}>
//       <Container style={{ width: 388 }}>
//         <Login />
//       </Container>
//       <LoginButton
//         style={{ marginTop: 16, width: 164 }}
//         onLogin={(data) => {
//           console.log({ data })
//         }}
//       >
//         Open in Dialog?
//       </LoginButton>
//     </Provider>
//   )
// }

// export const RegisterComponent = () => {
//   return (
//     <Provider client={client}>
//       <Container style={{ width: 388 }}>
//         <Register />
//       </Container>
//       <RegisterButton
//         style={{ marginTop: 16, width: 164 }}
//         onRegister={(data) => {
//           console.log({ data })
//         }}
//       >
//         Open in Dialog?
//       </RegisterButton>
//     </Provider>
//   )
// }

// export const ResetRequestComponent = () => {
//   return (
//     <Provider client={client}>
//       <Container style={{ width: 388 }}>
//         <LargeLogo
//           style={{
//             marginLeft: -8,
//             minHeight: 40,
//             minWidth: 40,
//           }}
//         />
//         <ResetRequest />
//       </Container>
//     </Provider>
//   )
// }
