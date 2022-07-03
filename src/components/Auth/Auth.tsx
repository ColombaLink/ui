import React, {
  FC,
  useState,
  CSSProperties,
  ReactChild,
  ReactNode,
  useEffect,
  ReactChildren,
} from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { LargeLogo } from '../Logo'
import { useClient } from '@based/react'
import useLocalStorage from '@based/use-local-storage'

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | ReactChild
  overlay?: boolean
  style?: CSSProperties
  app?: FC<any | { user: { id: string; email: string } }>
}

export const Authorize: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register = true,
  app,
  onResetRequest,
  overlay = true,
  logo,
  style,
}) => {
  const [showResetRequest, setShowResetRequest] = useState(false)

  // TOKEN SHOULD NOT PUT FALSE ETC
  // Stores the token and refreshToken in local storage
  const [token, setToken] = useLocalStorage('token')
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken')
  const [userId, setUserId] = useLocalStorage('userId')
  const [userEmail, setUserEmail] = useLocalStorage('userEmail')

  const user = { id: userId || '', email: userEmail || '' }

  const client = useClient()

  const renewHandler = ({ token: newToken }: { token: string }) => {
    setToken(newToken)
  }

  useEffect(() => {
    client.on('renewToken', renewHandler)
    return () => {
      client.removeListener('renewToken', renewHandler)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (token) {
        const x = await client.auth(token, { refreshToken })
        if (!x) {
          console.warn('Invalid token', token)
          // ls does not allow us to set with boolean false...
          setToken('')
          setRefreshToken('')
        }
      }
      // very weirs
      // else {
      //   console.warn('No token - reset refresh and ls')
      //   await client.auth(false)
      //   setToken('')
      //   setRefreshToken('')
      // }
    })()
  }, [token])

  const auth = (
    <Container
      style={{
        padding: 32,
        maxWidth: '100vw',
        width: 400,
        ...style,
      }}
    >
      {!logo ? null : logo === true ? <LargeLogo /> : logo}
      {!showResetRequest ? (
        <Tabs space small>
          <Tab title="Sign in">
            <Login
              onLogin={(r) => {
                console.info('--------->', r)
                // @ts-ignore
                setToken(r.token)
                // @ts-ignore
                setRefreshToken(r.refreshToken)
                // @ts-ignore
                setUserId(r.id)
                // @ts-ignore
                setUserEmail(r.email)
                if (onLogin) {
                  onLogin(r)
                }
              }}
              onResetRequest={() => {
                setShowResetRequest(true)
              }}
            />
          </Tab>
          {register || onRegister ? (
            <Tab title="Sign up">
              <Register
                onRegister={(r) => {
                  // @ts-ignore
                  setToken(r.token)
                  // @ts-ignore
                  setRefreshToken(r.refreshToken)
                  // @ts-ignore
                  setUser({ id: r.id, email: r.email })
                  if (onRegister) {
                    onRegister(r)
                  }
                }}
              />
            </Tab>
          ) : null}
        </Tabs>
      ) : (
        <ResetRequest
          style={{ marginTop: 24 }}
          onSuccess={() => {
            setShowResetRequest(false)
            onResetRequest()
          }}
          onCancel={() => {
            setShowResetRequest(false)
          }}
        />
      )}
    </Container>
  )

  if (token) {
    if (app) {
      // @ts-ignore
      return React.createElement(app, { user })
    } else {
      return <div>Loggedin!</div>
    }
  }

  return overlay ? (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {auth}
    </div>
  ) : (
    auth
  )
}
