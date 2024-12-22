import { FC } from 'react'
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
      style={{
        width,
        height: 48,
        marginBottom: 32,
        borderRadius: 8,
        fontWeight: 600,
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
    >
      {label}
    </Button>
  )
}
