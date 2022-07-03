import React, {
  FC,
  useState,
  CSSProperties,
  ReactChild,
  ReactNode,
} from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { LargeLogo } from '../Logo'
import useGlobalState from '@based/use-global-state'

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | ReactChild
  overlay?: boolean
  style?: CSSProperties
  children?: FC | ReactNode | ReactChild
}

export const Authorize: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register,
  onResetRequest,
  overlay = true,
  logo,
  style,
  children,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)
  const [showResetRequest, setShowResetRequest] = useState(false)

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
              onLogin={onLogin}
              onResetRequest={() => {
                setShowResetRequest(true)
              }}
            />
          </Tab>
          {register || onRegister ? (
            <Tab title="Sign up">
              <Register onRegister={onRegister} />
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
