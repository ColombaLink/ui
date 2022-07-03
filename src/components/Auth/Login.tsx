import React, { FC, useRef, useState } from 'react'
import { EmailIcon } from '~/icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { color } from '~'
import { styled } from 'inlines'
import { email as isEmail } from '@saulx/validators'

// allow buttons for google etc

type LoginProps = {
  width?: number
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: any) => void
  onResetRequest?: () => void
}

// TODO: make width dynamic.
// width is needed for button anymation
export const Login: FC<LoginProps> = ({
  width = '100%',
  onLogin,
  onRegister,
  onResetRequest,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValidationMessage, setEmailValidationMessage] =
    useState<string>(null)
  const [passwordExpanded, setPasswordExpanded] = useState(false)
  const client = useClient()
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div
      style={{
        width,
      }}
    >
      {/*<Button
        iconLeft={GoogleIcon}
        textAlign="center"
        style={{
          width,
          height: 48,
        }}
        onClick={() => {
          console.log('google')
        }}
        space
      >
        Continue with Google
      </Button>
      <div
        style={{
          borderTop: '1px solid gray',
          content: '',
          marginTop: 16,
          marginBottom: 16,
        }}
      />*/}

      <Input
        large
        iconLeft={EmailIcon}
        placeholder="Email address"
        style={{ flexGrow: 1 }}
        onChange={(value: string) => {
          setEmail(value)
        }}
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
        <Text color="Reddish" size="14px">
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
          label="Password"
          type="password"
          style={{ flexGrow: 1 }}
          placeholder="Password"
          onChange={(value: string) => {
            setPassword(value)
          }}
          space
        />
      </div>
      <Button
        large
        fill
        style={{
          marginBottom: 24,
        }}
        actionKeys={passwordExpanded ? ['Enter'] : ['Enter', 'Tab']}
        disabled={passwordExpanded ? !password : !isEmail(email)}
        onClick={
          passwordExpanded
            ? async () => {
                const result = await client.login({
                  email,
                  password,
                })
                const { token, refreshToken } = result
                if (onLogin) {
                  onLogin({ token, refreshToken })
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
      <Text>
        Forgot your password?{' '}
        <styled.a
          style={{
            color: color('PrimaryMain'),
            cursor: 'pointer',
            '&:hover': {
              color: color('PrimaryMainHover'),
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
    </div>
  )
}
