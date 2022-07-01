import React, { CSSProperties, FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { EmailIcon } from '~/icons'
import { styled } from 'inlines'
import { color } from '~/utils'

type ResetRequestProps = {
  onSuccess?: () => void
  onCancel?: () => void
  style?: CSSProperties
}

export const ResetRequest: FC<ResetRequestProps> = ({
  onSuccess,
  onCancel,
  style,
}) => {
  const client = useClient()
  const [email, setEmail] = useState<string>()
  const [working, setWorking] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  return (
    <div style={style}>
      {!emailSent ? (
        <>
          <Text wrap space>
            If your account exists, will receive an email with a link to reset
            your password.
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
              height: 48,
            }}
            onClick={async () => {
              setWorking(true)
              let result: any
              try {
                result = await client.call('resetRequest', {
                  email,
                  redirectUrl: window.location.href,
                })
                console.log({ result })
              } catch (err) {
                console.error(err)
              }
              setWorking(false)
              setEmailSent(true)
            }}
          >
            Request Password Reset
          </Button>
          {onCancel ? (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <styled.a
                style={{
                  color: color('TextSecondary'),
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (typeof onCancel === 'function') onCancel()
                }}
              >
                Cancel
              </styled.a>
            </div>
          ) : null}
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
