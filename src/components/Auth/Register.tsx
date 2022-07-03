import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Dialog, useDialog } from '~'
import { useClient } from '@based/react'
import { EmailIcon } from '~/icons'

type RegisterProps = {
  width?: number
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({ width = '100%', onRegister }) => {
  const client = useClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<string>()
  const [name, setName] = useState<string>()
  const [working, setWorking] = useState(false)

  return (
    <div
      style={{
        width,
      }}
    >
      <Input
        space="16px"
        large
        name="name"
        placeholder="Name"
        onChange={(value) => {
          setName(String(value))
        }}
      />

      <Input
        large
        space="16px"
        iconLeft={EmailIcon}
        value={email}
        name="email"
        placeholder="Email address"
        onChange={(value) => {
          setEmail(String(value))
        }}
      />
      <Input
        large
        space="16px"
        name="password"
        type="password"
        placeholder="Password"
        onChange={(value) => {
          setPassword(String(value))
        }}
      />

      <Input
        large
        space="16px"
        name="confirm-password"
        type="password"
        placeholder="Confirm password"
        onChange={(value) => {
          setPassword(String(value))
        }}
      />

      <Button
        disabled={working}
        loading={working}
        textAlign="center"
        style={{
          transition: 'transform 0.15s ease-out',
          justifyContent: 'flex-end',
          height: 48,
          width,
        }}
        onClick={async () => {
          setWorking(true)
          let result: any
          try {
            result = await client.call('registerUser', {
              email,
              password,
              name,
              redirectUrl: window.location.href,
            })
          } catch (err) {
            console.error(err)
          }
          setWorking(false)
          if (typeof onRegister === 'function') onRegister(result)
        }}
      >
        Register
      </Button>
    </div>
  )
}
