import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useClient } from '@based/react'
import { EmailIcon, LockIcon, CheckIcon, CloseIcon } from '~/icons'
import { email as isEmail } from '@saulx/validators'

type RegisterProps = {
  width?: number
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({ width = '100%', onRegister }) => {
  const client = useClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<string>()
  const [cpassword, setCPassword] = useState<string>()
  const [name, setName] = useState<string>()
  const passwordIsValid = password && password === cpassword
  const valid = isEmail(email) && passwordIsValid

  return (
    <div
      style={{
        width,
      }}
    >
      <Input
        space="16px"
        large
        type="text"
        name="name"
        placeholder="Name"
        onChange={setName}
      />

      <Input
        type="email"
        large
        space="16px"
        iconLeft={EmailIcon}
        value={email}
        placeholder="Email address"
        onChange={setEmail}
      />
      <Input
        large
        space="16px"
        iconLeft={LockIcon}
        type="password"
        placeholder="Password"
        onChange={setPassword}
      />

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: password?.length > 0 ? 248 : 0,
          overflow: 'hidden',
        }}
      >
        <Input
          large
          iconLeft={
            !cpassword ? (
              LockIcon
            ) : passwordIsValid ? (
              <CheckIcon color="Green" />
            ) : (
              <CloseIcon color="Red" />
            )
          }
          space
          name="confirm-password"
          type="password"
          placeholder="Confirm password"
          onChange={setCPassword}
        />
      </div>

      <Button
        disabled={!valid}
        fill
        large
        onClick={async () => {
          let result: any
          result = await client.call('registerUser', {
            email,
            password,
            name,
            redirectUrl: window.location.href,
          })
          if (onRegister) {
            onRegister(result)
          }
        }}
      >
        Register
      </Button>
    </div>
  )
}
