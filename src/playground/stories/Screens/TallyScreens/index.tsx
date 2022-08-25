import React from 'react'
import { useLocation } from '~'
import { Shows } from './Shows/Shows'
import { Users } from './Settings/Users'
import { WorkspaceSettings } from './Settings/WorkspaceSettings'
import { Organisations } from './Settings/Organisations'
import { UserRoles } from './Settings/UserRoles'
import { Show } from './Show/Show'
import { Content } from './Edition/Editor/Content/Content'
import { Design } from './Edition/Editor/Design/Design'

export const TallyScreens = () => {
  const [location] = useLocation()

  // Shows
  if (location === '/' || location === '/shows') {
    return <Shows />
  }

  // Single shows overview
  if (location === '/shows/1') {
    // '/shows/:id'
    // pass data props??
    return <Show />
  }

  // Editions / Editor
  if (location === '/content') {
    return <Content />
  }
  if (location === '/design') {
    return <Design />
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
