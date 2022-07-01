import React, { FC, useState, ReactChild, ReactNode } from 'react'
import { Container, Login, Register, ResetRequest } from '~'
import { Tab, Tabs } from '../Tabs'
import { Logo } from '../Topbar/Logo'

type AuthProps = {
  onLogin?: (props: { token: string; refreshToken: string }) => void
  onRegister?: (data: { email: string; password: string; name: string }) => void
  register?: boolean
  onResetRequest?: () => void
  logo?: boolean | FC
}

export const Auth: FC<AuthProps> = ({
  onLogin,
  onRegister,
  register,
  onResetRequest,
  logo,
}) => {
  const [showResetRequest, setShowResetRequest] = useState(false)
  const ParsedLogo: FC = !logo
    ? null
    : logo === true
    ? () => (
        <Logo
          style={{
            marginBottom: -12,
            marginLeft: -8,
            minHeight: 40,
            minWidth: 40,
          }}
        />
      )
    : logo
  return (
    <>
      <Container
        style={{
          width: 350,
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
