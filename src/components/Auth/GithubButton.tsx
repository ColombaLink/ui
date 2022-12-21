import React, { FC } from 'react'
import { Button, GithubIcon } from '~'

type GithubButtonProps = {
  width?: number | string
  label?: string
  clientId: string
}

export const GithubButton: FC<GithubButtonProps> = ({
  width = '100%',
  label = 'Continue with Github',
  clientId,
}) => {
  return (
    <Button
      icon={GithubIcon}
      color="lightgrey"
      textAlign="center"
      weight={600}
      style={{
        width,
        height: 48,
        marginBottom: 8,
        borderRadius: 8,
      }}
      onClick={async () => {
        const state = { redirectUrl: window.location.href }
        window.sessionStorage.setItem('client_id', clientId)
        const thirdPartyRedirect = global.location.origin + '/auth-github'
        const scope = encodeURI('user:email')
        const url = `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${clientId}&redirect_uri=${thirdPartyRedirect}`
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
