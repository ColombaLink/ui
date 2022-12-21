import React, { FC } from 'react'
import { Button, GoogleIcon, color } from '~'

type GoogleButtonProps = {
  width?: number | string
  label?: string
  clientId: string
}
export const GoogleButton: FC<GoogleButtonProps> = ({
  width = '100%',
  label = 'Continue with Google',
  clientId,
}) => {
  return (
    <Button
      icon={GoogleIcon}
      color="lightgrey"
      textAlign="center"
      weight={600}
      style={{
        width,
        height: 48,
        borderRadius: 8,
        marginBottom: 8,
        fontWeight: 600,
        //   backgroundColor: color('background2'),
      }}
      onClick={async () => {
        const state = { redirectUrl: window.location.href }
        const thirdPartyRedirect = global.location.origin + '/auth-google'
        window.sessionStorage.setItem('client_id', clientId)
        const scope =
          'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email'
        const url = `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=${scope}&response_type=code&client_id=${clientId}&redirect_uri=${thirdPartyRedirect}`
        global.location.href = `${url}&state=${encodeURIComponent(
          JSON.stringify(state)
        )}`
      }}
      space
    >
      {label}
    </Button>
  )
}
