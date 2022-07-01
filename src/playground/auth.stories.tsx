import React from 'react'
import { Provider } from '~'
import {
  Auth,
  // Login,
  // LoginButton,
  // Register,
  // RegisterButton,
  ResetRequest,
} from '~/components/Auth'
import { Container } from '~'
import { client } from './shared'
import { Logo } from '~/components/Topbar/Logo'

export const AuthComponent = () => {
  return (
    <Provider client={client}>
      <Auth
        logo
        onLogin={(result) => {
          console.log('Did login', { result })
        }}
        onRegister={(result) => {
          console.log('Did register', { result })
        }}
        onResetRequest={() => {
          console.log('Did Request Reset Password')
        }}
      />
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

export const ResetRequestComponent = () => {
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
        <ResetRequest />
      </Container>
    </Provider>
  )
}
