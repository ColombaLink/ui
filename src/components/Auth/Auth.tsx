import React, {
  FC,
  useState,
  ReactChild,
  ReactNode,
  CSSProperties,
} from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { LargeLogo } from '../Logo'

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | FC
  style?: CSSProperties
}

// totally different

export const Auth: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register,
  onResetRequest,
  logo,
  style,
}) => {
  const [showResetRequest, setShowResetRequest] = useState(false)
  const ParsedLogo: FC = !logo
    ? null
    : logo === true
    ? () => <LargeLogo />
    : logo
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
        {ParsedLogo ? <ParsedLogo /> : null}
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
