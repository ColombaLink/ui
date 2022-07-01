import React, { FC, useRef, useState } from 'react'
import { EmailIcon } from '~/icons'
import { Button } from '../Button'
import { Input } from '../Input'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { RegisterButton } from '~'

const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

type LoginProps = {
  width?: number
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: any) => void
}

export const Login: FC<LoginProps> = ({ width = 300, onLogin, onRegister }) => {
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
        <Text>{emailValidationMessage}</Text>
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
        }}
      >
        <Button
          onClick={() => {
            if (validEmail(email)) {
              setEmailValidationMessage(null)
              setPasswordExpanded(true)
            } else {
              setEmailValidationMessage('Enter an Email address')
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
      {onRegister ? (
        <RegisterButton
          style={{ marginTop: 32, width }}
          textAlign="center"
          onRegister={(data) => {
            if (typeof onRegister === 'function') onRegister(data)
          }}
          width={width}
        >
          Register
        </RegisterButton>
      ) : null}
    </div>
  )
}
