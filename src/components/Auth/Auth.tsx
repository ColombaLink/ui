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

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | ReactChild
  style?: CSSProperties
  children?: FC | ReactNode | ReactChild
}

export const Authorize: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register,
  onResetRequest,
  logo,
  style,
  children,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)

  const [showResetRequest, setShowResetRequest] = useState(false)
  return (
    <>
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
            <Tab title="Login">
              <Login
                onLogin={onLogin}
                onResetRequest={() => {
                  setShowResetRequest(true)
                }}
              />
            </Tab>
            {register || onRegister ? (
              <Tab title="Register">
                <Register onRegister={onRegister} />
              </Tab>
            ) : null}
          </Tabs>
        ) : (
          <ResetRequest
            style={{ marginTop: 24 }}
            onSuccess={() => {
              setShowResetRequest(false)
              if (typeof onResetRequest === 'function') onResetRequest()
            }}
            onCancel={() => {
              setShowResetRequest(false)
            }}
          />
        )}
      </Container>
    </>
  )
}
