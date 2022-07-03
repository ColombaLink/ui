import React, { CSSProperties, FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { Text } from '../Text'
import { useClient } from '@based/react'
import { EmailIcon, CheckIcon } from '~/icons'
import { email as isEmail } from '@saulx/validators'
import useGlobalState from '@based/use-global-state'

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
            space="24px"
            iconLeft={EmailIcon}
            type="email"
            placeholder="Email address"
            onChange={setEmail}
          />
          <Button
            large
            actionKeys={['Enter']}
            fill
            space="16px"
            disabled={!isEmail(email)}
            onClick={async () => {
              let result: any
              try {
                result = await client.call('resetRequest', {
                  email,
                  redirectUrl: window.location.href,
                })
                // console.log({ result })
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
              actionKeys={['Esc']}
              outline
              onClick={onCancel}
              large
              fill
              ghost
            >
              Cancel
            </Button>
          ) : null}
        </>
      ) : (
        <>
          <Text wrap space>
            Check your email for the reset link.
          </Text>
          <Button
            iconLeft={<CheckIcon />}
            large
            actionKeys={['Enter']}
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
