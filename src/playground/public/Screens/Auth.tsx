import { useAuth } from '@based/react'
import React, { FC } from 'react'
import { Avatar, useContextMenu } from '~'
import { UserProfile } from '~/components/Auth'
import { Authorize } from '../../../components/Auth/Auth'

const AuthorizedCompoent: FC = () => {
  const user = useAuth()
  const onProfile = useContextMenu(
    UserProfile,
    { id: user && user.id },
    { position: 'right', offset: { x: 0, y: 28 } }
  )

  return (
    <>
      This is authorized
      <Avatar onClick={onProfile} />
    </>
  )
}

export const Auth = () => {
  return (
    <Authorize
      app={AuthorizedCompoent}
      onLogin={() => {
        console.log('onLogin')
      }}
      onRegister={() => {
        console.log('onRegister')
      }}
    />
  )
}
