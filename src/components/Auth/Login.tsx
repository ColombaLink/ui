import React, { FC, useRef, useState } from 'react'
import { EmailIcon, GoogleIcon, LockIcon } from '~/icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { color, Separator } from '~'
import { styled } from 'inlines'
import { email as isEmail } from '@saulx/validators'
import useGlobalState from '@based/use-global-state'
import { GoogleButton } from './GoogleButton'
import { MicrosoftButton } from './MicrosoftButton'
import { GithubButton } from './GithubButton'

type LoginProps = {
  width?: number
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegisterRequest?: (email: string) => void
  onResetRequest?: () => void
}

// TODO: make width dynamic.
// width is needed for button animation
export const Login: FC<LoginProps> = ({
  width = '100%',
  onLogin,
  onRegisterRequest,
  onResetRequest,
}) => {
  const [email = '', setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValidationMessage, setEmailValidationMessage] =
    useState<string>(null)
  const [passwordExpanded, setPasswordExpanded] = useState(false)
  const client = useClient()
  const passwordRef = useRef<HTMLInputElement>(null)
  const valid = passwordExpanded && password && isEmail(email)

  return (
    <div
      style={{
        width,
      }}
    >
      <GoogleButton width={width} />
      <MicrosoftButton width={width} />
      <GithubButton width={width} />
      <Separator>or</Separator>

      <Input
        large
        value={email}
        type="email"
        icon={EmailIcon}
        placeholder="Email address"
        onChange={setEmail}
      />

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: emailValidationMessage ? 248 : 0,
          overflow: 'hidden',
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        <Text color="reddish" size="14px">
          {emailValidationMessage}
        </Text>
      </div>
      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: passwordExpanded ? 248 : 0,
          overflow: 'hidden',
        }}
      >
        <Input
          large
          inputRef={passwordRef}
          icon={LockIcon}
          type="password"
          placeholder="Password"
          onChange={setPassword}
          space
        />
      </div>
      <Button
        large
        fill
        style={{
          marginBottom: 24,
        }}
        actionKeys={['Enter']}
        disabled={!passwordExpanded ? !isEmail(email) : !valid}
        onClick={
          passwordExpanded
            ? async () => {
                const result = await client.login({
                  email,
                  password,
                })

                if (onLogin) {
                  // @ts-ignore
                  onLogin(result)
                }
              }
            : () => {
                if (isEmail(email)) {
                  setEmailValidationMessage(null)
                  setPasswordExpanded(true)
                  if (passwordRef.current) {
                    passwordRef.current.focus()
                  }
                } else {
                  setEmailValidationMessage('Enter a valid email address')
                }
              }
        }
      >
        {passwordExpanded ? 'Sign in' : 'Continue with Email'}
      </Button>
      {valid ? (
        <Text>
          Forgot your password?{' '}
          <styled.a
            style={{
              color: color('accent'),
              cursor: 'pointer',
              '&:hover': {
                color: color('accent:hover'),
              },
            }}
            onClick={() => {
              if (onResetRequest) {
                onResetRequest()
              }
            }}
          >
            Reset Password
          </styled.a>
        </Text>
      ) : (
        <Text>
          Don't have an account?{' '}
          <styled.a
            style={{
              color: color('accent'),
              cursor: 'pointer',
              '&:hover': {
                color: color('accent:hover'),
              },
            }}
            onClick={() => {
              if (onRegisterRequest) {
                onRegisterRequest(email)
              }
            }}
          >
            Sign up
          </styled.a>
        </Text>
      )}
    </div>
  )
}
