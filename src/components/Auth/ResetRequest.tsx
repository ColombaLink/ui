import React, { CSSProperties, FC, useState } from 'react'
import { Input } from '../Input'
import { Button, ButtonProps } from '../Button'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { EmailIcon } from '~/icons'
import { Logo } from '../Topbar/Logo'

type ResetRequestProps = {
  onSuccess?: () => void
  style?: CSSProperties
}

export const ResetRequest: FC<ResetRequestProps> = ({ onSuccess, style }) => {
  const client = useClient()
  const [email, setEmail] = useState<string>()
  const [working, setWorking] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  return (
    <div style={style}>
      {!emailSent ? (
        <>
          <Text wrap space>
            Request a Password Reset. If your account exists, will receive an
            email with a link to reset your password.
          </Text>
          <Input
            space="16px"
            iconLeft={EmailIcon}
            name="email"
            placeholder="Enter your email address..."
            onChange={(value) => {
              setEmail(String(value))
            }}
          />
          <Button
            disabled={working}
            loading={working}
            textAlign="center"
            style={{
              width: '100%',
            }}
            onClick={async () => {
              setWorking(true)
              let result: any
              try {
              } catch (err) {
                console.error(err)
              }
              setWorking(false)
              setEmailSent(true)
            }}
          >
            Request Password Reset
          </Button>
        </>
      ) : (
        <>
          <Text wrap space>
            Check your email for the reset link.
          </Text>
          <Button
            textAlign="center"
            onClick={async () => {
              if (typeof onSuccess === 'function') onSuccess()
            }}
          >
            OK
          </Button>
        </>
      )}
    </div>
  )
}