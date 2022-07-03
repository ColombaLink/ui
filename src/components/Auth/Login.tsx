import React, { FC, useRef, useState } from 'react'
import { EmailIcon } from '~/icons'
import { Button, ButtonProps } from '../Button'
import { Input } from '../Input'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { color, Dialog, Link, RegisterButton, useDialog } from '~'
import { Logo } from '../Topbar/Logo'
import { styled } from 'inlines'

// allow buttons for google etc

// use saulx validator
const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

type LoginProps = {
  width?: number
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: any) => void
  onResetRequest?: () => void
}

// TODO: make width dynamic.
// width is needed for button anymation
export const Login: FC<LoginProps> = ({
  width = 300,
  onLogin,
  onRegister,
  onResetRequest,
}) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [emailValidationMessage, setEmailValidationMessage] =
    useState<string>(null)
  const [passwordExpanded, setPasswordExpanded] = useState<boolean>(false)
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
        iconLeft={EmailIcon}
        placeholder="Enter your email address..."
        style={{ flexGrow: 1 }}
        onChange={(value: string) => {
          setEmail(value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault()
            if (validEmail(email)) {
              setPasswordExpanded(true)
              if (passwordRef.current) {
                passwordRef.current.focus()
              }
            }
          }
        }}
      />

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: emailValidationMessage ? 200 : 0,
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
          maxHeight: passwordExpanded ? 200 : 0,
          overflow: 'hidden',
        }}
      >
        <Input
          inputRef={passwordRef}
          label="Password"
          type="password"
          style={{ flexGrow: 1 }}
          placeholder="Type your password"
          onChange={(value: string) => {
            setPassword(value)
          }}
          space
        />
      </div>
      <div
        style={{
          overflow: 'hidden',
          height: 48,
          marginBottom: 24,
        }}
      >
        <Button
          onClick={() => {
            if (validEmail(email)) {
              setEmailValidationMessage(null)
              setPasswordExpanded(true)
            } else {
              setEmailValidationMessage('Enter a valid email address')
            }
          }}
          textAlign="center"
          style={{
            transition: 'transform 0.15s ease-out',
            transform: passwordExpanded
              ? `translate(-${width}px, 0)`
              : 'translate(0px, 0)',
            justifyContent: 'flex-end',
            height: 48,
            width,
          }}
        >
          Continue with Email
        </Button>
        <Button
          onClick={async () => {
            const result = await client.login({
              email,
              password,
            })
            console.log({ result })
            const { token, refreshToken } = result
            if (typeof onLogin === 'function') onLogin({ token, refreshToken })
          }}
          textAlign="center"
          style={{
            transition: 'transform 0.15s ease-out',
            transform: passwordExpanded
              ? 'translate(0px, -48px)'
              : `translate(${width}px, -48px)`,
            justifyContent: 'flex-end',
            height: 48,
            width,
          }}
        >
          Sign in with your password
        </Button>
      </div>
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
            if (typeof onResetRequest === 'function') onResetRequest()
          }}
        >
          Reset Password
        </styled.a>
      </Text>
    </div>
  )
}

type LoginButtonProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  width?: number
} & ButtonProps

export const LoginButton: FC<LoginButtonProps> = ({
  children,
  onLogin,
  width = 300,
  ...props
}) => {
  const dialog = useDialog()
  return (
    <Button
      textAlign="center"
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
            <Login
              onLogin={async (data) => {
                dialog.close(id)
                if (typeof onLogin === 'function') onLogin(data)
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
