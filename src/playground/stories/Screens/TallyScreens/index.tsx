import React from 'react'
import { useLocation } from '~'
import { Shows } from './Shows/Shows'
import { Users } from './Settings/Users'
import { WorkspaceSettings } from './Settings/WorkspaceSettings'
import { Organisations } from './Settings/Organisations'
import { UserRoles } from './Settings/UserRoles'

export const TallyScreens = () => {
  const [location] = useLocation()

  // Shows
  if (location === '/' || location === '/shows') {
    return <Shows />
  }

  // Workspace Settings
  if (location === '/settings') {
    return <WorkspaceSettings />
  }
  if (location === '/users') {
    return <Users />
  }
  if (location === '/organisations') {
    return <Organisations />
  }
  if (location === '/user-roles') {
    return <UserRoles />
  }
}
