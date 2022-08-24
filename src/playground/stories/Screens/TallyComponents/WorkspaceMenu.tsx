import React from 'react'
import { Menu } from '~/components/Menu'

export const WorkspaceMenu = () => {
  return (
    <Menu
      data={{
        'Workspace Settings': {
          Users: '/users',
          Organisations: '/organisations',
          'User Roles': '/user-roles',
        },
      }}
    />
  )
}
