import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useClient } from '@based/react'
import { useLocation, useRoute } from 'wouter'
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
  useEffect(() => {
    if (isGoogleRedirect && window) {
      setShowLoader(true)
      console.log('wawa')
      const params = new URLSearchParams(window.location.search)
      console.log('>>>>', Array.from(params.entries()))
      const code = params.get('code')
      const redirect = global.location.origin + '/auth-google'
      let state: any
      try {
        state = JSON.parse(params.get('state'))
      } catch (error) {
        console.warn(error)
      }
      client
        .call('authGoogle', {
          code,
          redirect,
          state,
        })
        .then(async (response) => {
          console.log({ response })
          const { token, refreshToken, email } = response
          const result = await client.auth(token, { refreshToken })
          console.log('auth result', { result })
          toast.add(<Toast label={'Signedin as ' + email} type="success" />)
          setShowLoader(false)
          // if (window && state.redirectUrl) {
          //   window.location.href = state.redirectUrl
          // }
        })
        .catch((error) => {
          console.error(error)
          toast.add(
            <Toast
              label="Authentication Error"
              type="error"
              description="need to describe this message"
            />
          )
          setShowLoader(false)
        })
    }
  }, [isGoogleRedirect])

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
