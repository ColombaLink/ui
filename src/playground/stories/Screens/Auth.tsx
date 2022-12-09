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
      <pre>{JSON.stringify({ user }, null, 2)}</pre>
      <Avatar onClick={onProfile} />
    </>
  )
}

export const Auth = () => {
  return (
    <div style={{ maxWidth: 500, height: 'auto' }}>
      <Authorize
        logo
        overlay={false}
        app={AuthorizedCompoent}
        onLogin={() => {
          console.log('onLogin')
        }}
        onRegister={() => {
          console.log('onRegister')
        }}
        googleClientId="96290045386-rsvl0vdjdhmc3q12kgc0jli41edbk5dr.apps.googleusercontent.com"
        microsoftClientId="ee7485ca-a5e5-40b9-af82-748310d01da0"
        githubClientId="23ba4856b09e22976494"
      />
    </div>
  )
}
