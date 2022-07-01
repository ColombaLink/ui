import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Text } from '../Text'
import { Dialog, useDialog } from '~'
import { useClient } from '@based/react'
import { EmailIcon } from '~/icons'
import { Logo } from '../Topbar/Logo'

type RegisterProps = {
  width?: number
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({ width = 300, onRegister }) => {
  const client = useClient()
  const [email, setEmail] = useState<string>()
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
        name="email"
        placeholder="Enter your emailaddress..."
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

type RegisterButtonProps = {
  onRegister?: (data: { email: string; password: string; name: string }) => void
  width?: number
} & ButtonProps

export const RegisterButton: FC<RegisterButtonProps> = ({
  children,
  onRegister,
  width = 300,
  ...props
}) => {
  const dialog = useDialog()
  return (
    <Button
      ghost
      onClick={() => {
        const id = dialog.open(
          <Dialog style={{ width: width + 48, padding: 24, paddingTop: 12 }}>
            <Logo
              style={{
                minHeight: 40,
                minWidth: 40,
                marginLeft: -8,
                marginBottom: 12,
              }}
            />
            <Register
              onRegister={async (data) => {
                dialog.close(id)
                if (typeof onRegister === 'function') onRegister(data)
              }}
              width={width}
            />
          </Dialog>
        )
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
