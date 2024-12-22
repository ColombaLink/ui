import { useClient } from '@based/react'
import { FC } from 'react'
import { Button, MicrosoftIcon } from '~'
import {
  generateCodeChallengeFromVerifier,
  generateCodeVerifier,
} from './utils'

type MicrosoftButtonProps = {
  width?: number | string
  label?: string
  clientId: string
}
export const MicrosoftButton: FC<MicrosoftButtonProps> = ({
  width = '100%',
  label = 'Continue with Microsoft',
  clientId,
}) => {
  // TODO nuno fix
  const client = useClient()
  return (
    <Button
      icon={MicrosoftIcon}
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
        const codeVerifier = generateCodeVerifier()
        const codeChallenge = await generateCodeChallengeFromVerifier(
          codeVerifier
        )
        window.sessionStorage.setItem('client_id', clientId)
        window.sessionStorage.setItem('code_verifier', codeVerifier)
        const thirdPartyRedirect = global.location.origin + '/auth-microsoft'
        const scope = encodeURI('openid email profile User.Read')
        const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${thirdPartyRedirect}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`
        global.location.href = `${url}&state=${encodeURIComponent(
          JSON.stringify(state)
        )}`
      }}
    >
      {label}
    </Button>
  )
}
