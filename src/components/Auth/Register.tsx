import React, { FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useClient } from '@based/react'
import {
  EmailIcon,
  LockIcon,
  CheckIcon,
  CloseIcon,
  ErrorIcon,
  GoogleIcon,
} from '~/icons'
import { Callout } from '../Callout'
import { email as isEmail, validatePassword } from '@saulx/validators'
import { border, color } from '~/utils'
import { Separator } from '../Separator'
import {
  generateCodeChallengeFromVerifier,
  generateCodeVerifier,
} from './utils'

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
      ? 'red'
      : passwordScore.entropy < 60
      ? 'yellow'
      : 'green'

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
      <Button
        icon={GoogleIcon}
        textAlign="center"
        style={{
          width,
          height: 48,
          marginTop: 28,
        }}
        onClick={async () => {
          const state = { redirectUrl: window.location.href }
          const { clientId } = await client.call('authGoogle', {
            getClientId: true,
          })
          if (!clientId) {
            throw new Error(
              'Cannot get client id from configuration. Google set up correctly?'
            )
          }
          const thirdPartyRedirect = global.location.origin + '/auth-google'
          const scope =
            'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email'
          const url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=${scope}&response_type=code&client_id=${clientId}&redirect_uri=${thirdPartyRedirect}`
          global.location.href = `${url}&state=${encodeURIComponent(
            JSON.stringify(state)
          )}`
        }}
        space
      >
        Signup with Google
      </Button>
      <Button
        textAlign="center"
        style={{
          width,
          height: 48,
        }}
        onClick={async () => {
          const state = { redirectUrl: window.location.href }
          const codeVerifier = generateCodeVerifier()
          const codeChallenge = await generateCodeChallengeFromVerifier(
            codeVerifier
          )
          console.log({
            codeVerifier,
            codeChallenge,
            wawa: codeChallenge.length,
            yeye: codeVerifier.length,
          })
          window.sessionStorage.setItem('code_verifier', codeVerifier)
          const { clientId } = await client.call('authMicrosoft', {
            getClientId: true,
          })
          const thirdPartyRedirect = global.location.origin + '/auth-microsoft'
          const scope = encodeURI('openid email profile User.Read')
          const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${thirdPartyRedirect}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`
          global.location.href = `${url}&state=${encodeURIComponent(
            JSON.stringify(state)
          )}`
        }}
        space
      >
        Signup with Microsoft
      </Button>
      <Separator>or</Separator>
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
        icon={EmailIcon}
        value={email}
        placeholder="Email address"
        onChange={setEmail}
      />
      <Input
        large
        space="16px"
        icon={LockIcon}
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
          icon={
            !cpassword ? (
              LockIcon
            ) : passwordIsValid ? (
              <CheckIcon color="green" />
            ) : (
              <CloseIcon color="red" />
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
            border: border(1, passWordColor),
            backgroundColor: color(passWordColor),
            borderRadius: 10,
            marginBottom: 16,
            transition: 'width 0.2s',
          }}
        />

        <Callout space icon={PasswordIcon({ color: passWordColor })}>
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
          console.info(result)
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
