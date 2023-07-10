import React, { CSSProperties, FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { CheckIcon } from '~/icons'
import { email as isEmail } from '@saulx/validators'
import useGlobalState from '@based/use-global-state'
import { renderOrCreateElement } from '~/utils'

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
  const [email = '', setEmail] = useGlobalState('email')
  const [emailSent, setEmailSent] = useState(false)

  return (
    <div style={style}>
      {!emailSent ? (
        <>
          <Text wrap style={{ marginBottom: 18 }}>
            If your account exists, will receive an email with a link to reset
            your password.
          </Text>
          <Input
            large
            value={email}
            style={{ marginBottom: 24 }}
            label="Email"
            // icon={EmailIcon}
            type="email"
            placeholder="Email address"
            onChange={setEmail}
          />
          <Button
            large
            style={{ height: 48, marginBottom: 16 }}
            keyboardShortcut="Enter"
            fill
            disabled={!isEmail(email)}
            onClick={async () => {
              try {
                await client.call('resetRequest', {
                  email,
                  redirectUrl: window.location.href,
                })
              } catch (err) {
                console.error(err)
              }
              setEmailSent(true)
            }}
          >
            Request Password Reset
          </Button>

          {onCancel ? (
            <Button
              keyboardShortcut="Esc"
              outline
              onClick={onCancel}
              large
              style={{ height: 48 }}
              fill
              ghost
            >
              Cancel
            </Button>
          ) : null}
        </>
      ) : (
        <>
          <Text wrap style={{ marginBottom: 24 }}>
            Check your email for the reset link.
          </Text>
          <Button
            icon={renderOrCreateElement(CheckIcon)}
            large
            keyboardShortcut="Enter"
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
