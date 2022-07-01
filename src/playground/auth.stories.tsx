import React from 'react'
import { Provider } from '~'
import {
  Login,
  Register,
  RegisterButton,
  RequestResetPassword as RequestResetPasswordComponent,
} from '~/components/Auth'
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

export const LoginRegister = () => {
  return (
    <Provider client={client}>
      <Container style={{ width: 388 }}>
        <Logo
          style={{
            marginBottom: -20,
            marginLeft: -8,
            minHeight: 40,
            minWidth: 40,
          }}
        />
        <Tabs space>
          <Tab title="Login">
            <Login />
          </Tab>
          <Tab title="Register">
            <Register
              onRegister={(data) => {
                console.log({ data })
              }}
            />
            <RegisterButton
              style={{ marginTop: 16, width: 300 }}
              onRegister={(data) => {
                console.log({ data })
              }}
            >
              Open in Dialog?
            </RegisterButton>
          </Tab>
        </Tabs>
      </Container>
    </Provider>
  )
}

export const RequestResetPassword = () => {
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
        <RequestResetPasswordComponent />
      </Container>
    </Provider>
  )
}
