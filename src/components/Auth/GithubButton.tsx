import { useClient } from '@based/react'
import React, { FC } from 'react'
import { Button, GithubIcon } from '~'

type GithubButtonProps = {
  width?: number | string
  label?: string
}
export const GithubButton: FC<GithubButtonProps> = ({
  width = '100%',
  label = 'Continue with Github',
}) => {
  const client = useClient()
  return (
    <Button
      icon={GithubIcon}
      color="grey"
      textAlign="center"
      style={{
        width,
        height: 48,
        marginBottom: 8,
      }}
      onClick={async () => {
        const state = { redirectUrl: window.location.href }
        const { clientId } = await client.call('authGithub', {
          getClientId: true,
        })
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
