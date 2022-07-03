import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useClient } from '@based/react'
import { EmailIcon, LockIcon, CheckIcon, CloseIcon, ErrorIcon } from '~/icons'
import { Callout } from '../Callout'
import { email as isEmail, validatePassword } from '@saulx/validators'

console.info(validatePassword)

type RegisterProps = {
  width?: number
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({ width = '100%', onRegister }) => {
  const client = useClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [name, setName] = useState<string>()

  const passwordScore = validatePassword(password)

  const passwordIsValid =
    passwordScore.valid && password && password === cpassword
  const valid = isEmail(email) && passwordIsValid
  const [passwordValidationMessage, setpasswordValidationMessage] =
    useState<string>(null)

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
          maxHeight: passwordValidationMessage ? 248 : 0,
          overflow: 'hidden',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        <Callout space iconLeft={ErrorIcon({ color: 'PurpleBright' })}>
          {passwordValidationMessage}
        </Callout>
      </div>

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: passwordScore.valid ? 248 : 0,
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
        actionKeys={['Enter']}
        onClick={async () => {
          const result = await client.register({
            email,
            password,
            name,
            redirectUrl: window.location.href,
          })
          console.info(result)
          if (onRegister) {
            // @ts-ignore
            onRegister(result)
          }
        }}
      >
        Register
      </Button>
    </div>
  )
}
