import React, { FC } from 'react'
import { Login, Register } from '~'
import { Tab, Tabs } from '../Tabs'

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  onRequestResetPassword?: () => void
}

export const Auth: FC<AuthProps> = ({
  onLogin,
  onRegister,
  onRequestResetPassword,
}) => {
  return (
    <Tabs space small>
      <Tab title="Login">
        <Login onLogin={onLogin} />
      </Tab>
      <Tab title="Register">
        <Register onRegister={onRegister} />
      </Tab>
    </Tabs>
  )
}
