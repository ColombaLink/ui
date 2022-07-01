import React from 'react'
import { Provider } from '~'
import { Auth, RegisterButton, RequestResetPassword } from '~/components/Auth'
import { Tabs, Tab } from '~/components/Tabs'
import { Container } from '~'
import { client } from './shared'
import { Logo } from '~/components/Topbar/Logo'

// export const LoginEmbedded = () => {
//   return (
//     <Provider client={client}>
//       <Login />
//     </Provider>
//   )
// }

// export const RegisterEmbedded = () => {
//   return (
//     <Provider client={client}>
//       <Register
//         onRegister={(data) => {
//           console.log({ data })
//         }}
//       />
//       <RegisterButton
//         style={{ marginTop: 32, width: 300 }}
//         onRegister={(data) => {
//           console.log({ data })
//         }}
//       >
//         Open in Dialog
//       </RegisterButton>
//     </Provider>
//   )
// }

export const AuthEmbedded = () => {
  return (
    <Provider client={client}>
      <Container style={{ width: 388 }}>
        <Logo
          style={{
            marginBottom: -12,
            marginLeft: -8,
            minHeight: 40,
            minWidth: 40,
          }}
        />
        <Auth
          onLogin={(result) => {
            console.log('Did login', { result })
          }}
          onRegister={(result) => {
            console.log('Did register', { result })
          }}
          onRequestResetPassword={() => {
            console.log('Did register')
          }}
        />
      </Container>
    </Provider>
  )
}

export const RegisterEmbedded = () => {
  return (
    <Provider client={client}>
      <RegisterButton
        style={{ marginTop: 16, width: 164 }}
        onRegister={(data) => {
          console.log({ data })
        }}
      >
        Open in Dialog?
      </RegisterButton>
    </Provider>
  )
}

export const RequestResetPasswordEmbedded = () => {
  return (
    <Provider client={client}>
      <Container style={{ width: 388 }}>
        <Logo
          style={{
            marginLeft: -8,
            minHeight: 40,
            minWidth: 40,
          }}
        />
        <RequestResetPassword />
      </Container>
    </Provider>
  )
}
