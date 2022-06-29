import React, { CSSProperties, FC, useRef, useState } from 'react'
import { Size } from '~/types'
import { Form } from '../Form'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Text } from '../Text'
import { Dialog, useDialog } from '~'

type RegisterProps = {
  width?: Size
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({
  width = '300px',
  onRegister,
}) => {
  return (
    <div
      style={{
        width,
      }}
    >
      <Text size="32px" space>
        Register
      </Text>
      <Form
        onSubmit={(res) => {
          if (typeof onRegister === 'function') {
            onRegister({
              email: res.email.value || null,
              password: res.password.value || null,
              name: res.name.value || null,
            })
          }
        }}
      >
        <Input name="email" label="Email" placeholder="Enter your email" />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Input name="name" label="Name" placeholder="Enter your name" space />
        <Button>Register</Button>
      </Form>
    </div>
  )
}

type RegisterButtonProps = {
  onRegister?: (data: { email: string; password: string; name: string }) => void
} & ButtonProps

export const RegisterButton: FC<RegisterButtonProps> = ({
  children,
  onRegister,
  ...props
}) => {
  const dialog = useDialog()
  return (
    <Button
      onClick={() => {
        dialog.open(
          <Dialog>
            <Register onRegister={onRegister} />
          </Dialog>
        )
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
