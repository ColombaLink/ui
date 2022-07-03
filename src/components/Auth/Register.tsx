import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Dialog, useDialog } from '~'
import { useClient } from '@based/react'
import { EmailIcon } from '~/icons'
import { LargeLogo } from '../Logo'
import useGlobalState from '@based/use-global-state'

type RegisterProps = {
  width?: number
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({ width = '100%', onRegister }) => {
  const client = useClient()
  const [email = '', setEmail] = useGlobalState('email')
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
        iconLeft={EmailIcon}
        value={email}
        name="email"
        placeholder="Enter your email address"
        onChange={(value) => {
          setEmail(String(value))
        }}
      />
      <Input
        space="16px"
        name="password"
        type="password"
        placeholder="Enter your password"
        onChange={(value) => {
          setPassword(String(value))
        }}
      />
      <Input
        space="16px"
        name="name"
        placeholder="Enter your name"
        onChange={(value) => {
          setName(String(value))
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
