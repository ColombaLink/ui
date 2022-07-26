import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useClient } from '@based/react'
import { useRoute } from 'wouter'
import { LoadingIcon } from '~/icons'
import { Toast, useToast } from '../Toast'

type AuthProviderProps = {
  children: ReactNode
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const client = useClient()
  const toast = useToast()
  const [showLoader, setShowLoader] = useState(false)

  const [isGoogleRedirect] = useRoute('/auth-google')
  const [isMicrosoftRedirect] = useRoute('/auth-microsoft')
  const thirdPartyRedirect = isGoogleRedirect
    ? 'google'
    : isMicrosoftRedirect
    ? 'microsoft'
    : false
  useEffect(() => {
    if (thirdPartyRedirect && window) {
      setShowLoader(true)
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')
      const redirect = global.location.origin + `/auth-${thirdPartyRedirect}`
      let state: any
      try {
        state = JSON.parse(params.get('state'))
      } catch (error) {
        console.warn(error)
      }
      const codeVerifier = window.sessionStorage.getItem('code_verifier')
      client
        .call(
          `auth${
            thirdPartyRedirect.charAt(0).toUpperCase() +
            thirdPartyRedirect.slice(1)
          }`,
          {
            code,
            redirect,
            state,
            ...(codeVerifier ? { codeVerifier } : null),
          }
        )
        .then(async (response) => {
          const { token, refreshToken, email, id } = response
          await client.auth(token, { id, refreshToken })
          toast.add(<Toast label={'Signedin as ' + email} type="success" />)
          window.sessionStorage.removeItem('code_verifier')
          setShowLoader(false)
          if (window && state.redirectUrl) {
            window.location.href = state.redirectUrl
          }
        })
        .catch((error) => {
          console.error(error)
          toast.add(
            <Toast
              label="Authentication Error"
              type="error"
              description={error.message}
            />
          )
          setShowLoader(false)
        })
    }
  }, [isGoogleRedirect, isMicrosoftRedirect])

  return showLoader ? (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%,-50%,0)',
        }}
      >
        <LoadingIcon size={32} />
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}
