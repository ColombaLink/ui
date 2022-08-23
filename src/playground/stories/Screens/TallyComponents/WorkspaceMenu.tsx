import React from 'react'
import { Menu } from '~/components/Menu'

export const WorkspaceMenu = () => {
  return (
    <>
      <Menu
        prefix="/"
        data={{
          'Workspace Settings': {
            Users: '?story=Users',
            Organisations: '?story=Organisations',
            'User Roles': '?story=UserRoles',
            TEST: '?=Edition',
          },
        }}
      />
    </>
  )
}
