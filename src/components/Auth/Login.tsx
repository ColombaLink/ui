import React, { FC, useRef, useState } from 'react'
import { LockIcon } from '~/icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { color, Separator } from '~'
import { styled } from 'inlines'
import { email as isEmail } from '@saulx/validators'
import { GoogleButton } from './GoogleButton'
import { MicrosoftButton } from './MicrosoftButton'
import { GithubButton } from './GithubButton'

type LoginProps = {
  width?: number
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegisterRequest?: (email: string) => void
  onResetRequest?: () => void
  googleClientId?: string
  microsoftClientId?: string
  githubClientId?: string
}

// TODO: make width dynamic.
// width is needed for button animation
export const Login: FC<LoginProps> = ({
  width = '100%',
  onLogin,
  onRegisterRequest,
  onResetRequest,
  googleClientId,
  microsoftClientId,
  githubClientId,
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
      {googleClientId || microsoftClientId || githubClientId ? (
        <>
          {googleClientId ? (
            <GoogleButton width={width} clientId={googleClientId} />
          ) : null}
          {microsoftClientId ? (
            <MicrosoftButton width={width} clientId={microsoftClientId} />
          ) : null}
          {githubClientId ? (
            <GithubButton width={width} clientId={githubClientId} />
          ) : null}
          <Separator space={16} style={{ marginTop: 16 }}>
            <Text color="text2" size={14} weight={500}>
              OR
            </Text>
          </Separator>
        </>
      ) : null}

      <Input
        large
        label="Email"
        value={email}
        type="email"
        //  icon={EmailIcon}
        placeholder="Enter your email address"
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
          passwordInput
          space
        />
      </div>
      <Button
        large
        fill
        style={{
          marginBottom: 24,
          height: 48,
        }}
        textAlign="center"
        actionKeys={['Enter']}
        disabled={!passwordExpanded ? !isEmail(email) : !valid}
        onClick={
          passwordExpanded
            ? async () => {
                // @ts-ignore
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
        <Text size={16}>
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
