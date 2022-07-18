import React, {
  FC,
  useState,
  CSSProperties,
  ReactChild,
  useEffect,
} from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { LargeLogo } from '../Logo'
import { useAuth } from '@based/react'
import useGlobalState from '@based/use-global-state'

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
  const [email = '', setEmail] = useGlobalState('email')
  const [fadeIn, setFade] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFade(true), 300)
    return () => {
      clearTimeout(t)
    }
  }, [])

  const user = useAuth()
  const [activeTab, setActiveTab] = useState(0)

  const auth = (
    <Container
      style={{
        padding: 32,
        maxWidth: '100vw',
        width: 400,
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s',
        ...style,
      }}
    >
      {logo === true ? <LargeLogo /> : logo}
      {!showResetRequest ? (
        <Tabs space setActiveTab={setActiveTab} activeTab={activeTab}>
          <Tab label="Sign in">
            <Login
              onLogin={onLogin}
              onRegisterRequest={(email) => {
                setActiveTab(1)
              }}
              onResetRequest={() => {
                setShowResetRequest(true)
              }}
            />
          </Tab>
          {register || onRegister ? (
            <Tab label="Sign up">
              <Register email={email} onRegister={onRegister} />
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

  if (user) {
    if (app) {
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
