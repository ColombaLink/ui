import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Text } from '../Text'
import { Dialog, useDialog } from '~'
import { useClient } from '@based/react'

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
      <Text size="32px" space>
        Register
      </Text>
      <Input
        name="email"
        label="Email"
        placeholder="Enter your email"
        onChange={(value) => {
          setEmail(String(value))
        }}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(value) => {
          setPassword(String(value))
        }}
      />
      <Input
        name="name"
        label="Name"
        placeholder="Enter your name"
        space
        onChange={(value) => {
          setName(String(value))
        }}
      />
      <Button
        disabled={working}
        loading={working}
        textAlign="center"
        style={{ width }}
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
  width,
  ...props
}) => {
  const dialog = useDialog()
  return (
    <Button
      onClick={() => {
        const id = dialog.open(
          <Dialog style={{ width: width + 48 }}>
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
