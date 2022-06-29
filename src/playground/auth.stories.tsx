import React from 'react'
import { Provider } from '~'
import { Login, Register, RegisterButton } from '~/components/Auth'
import { client } from './shared'

export const LoginEmbedded = () => {
  return (
    <Provider client={client}>
      <Login />
    </Provider>
  )
}

export const RegisterEmbedded = () => {
  return (
    <Provider client={client}>
      <Register
        onRegister={(data) => {
          console.log({ data })
        }}
      />
      <RegisterButton
        style={{ marginTop: 32, width: 300 }}
        onRegister={(data) => {
          console.log({ data })
        }}
      >
        Open in Dialog
      </RegisterButton>
    </Provider>
  )
}
