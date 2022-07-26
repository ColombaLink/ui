import { useClient } from '@based/react'
import React, { FC } from 'react'
import { Button, GoogleIcon } from '~'

type GoogleButtonProps = {
  width?: number | string
}
export const GoogleButton: FC<GoogleButtonProps> = ({ width = '100%' }) => {
  const client = useClient()
  return (
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
  )
}
