import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useClient } from '@based/react'
import { EmailIcon, LockIcon, CheckIcon, CloseIcon, ErrorIcon } from '~/icons'
import { Callout } from '../Callout'
import { email as isEmail, validatePassword } from '@saulx/validators'
import { color } from '~/utils'

type RegisterProps = {
  width?: number
  email?: string
  onRegister?: (data: { email: string; password: string; name: string }) => void
}

export const Register: FC<RegisterProps> = ({
  email: initialEmail = '',
  width = '100%',
  onRegister,
}) => {
  const client = useClient()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [name, setName] = useState('')

  const passwordScore = validatePassword(password)

  const passwordIsValid = passwordScore.valid && password === cpassword

  const valid = isEmail(email) && passwordIsValid

  const passwordValidationMessage = password ? `${passwordScore.info}` : null

  const passwordPercentage = Math.min(passwordScore.entropy, 100) + '%'

  const passWordColor =
    passwordScore.entropy < 50
      ? 'Red'
      : passwordScore.entropy < 60
      ? 'Yellow'
      : 'Green'

  const PasswordIcon =
    passwordScore.entropy < 60
      ? ErrorIcon
      : passwordScore.entropy < 99
      ? CheckIcon
      : () => <div>🏆</div>

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

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: passwordValidationMessage ? 248 : 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: passwordPercentage,
            height: 4,
            border: '1px solid ' + color(passWordColor),
            backgroundColor: color(passWordColor),
            borderRadius: 10,
            marginBottom: 16,
            transition: 'width 0.2s',
          }}
        />

        <Callout space iconLeft={PasswordIcon({ color: passWordColor })}>
          {passwordScore.entropy < 50
            ? 'Password is too weak, add capitals, symbols or make it longer'
            : passwordValidationMessage}
        </Callout>
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
          if (onRegister) {
            // @ts-ignore
            onRegister(result)
          }
        }}
      >
        Sign up
      </Button>
    </div>
  )
}
