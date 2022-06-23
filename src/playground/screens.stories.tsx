import React from 'react'
import {
  Topbar,
  Sidebar,
  Menu,
  GridIcon,
  LayersIcon,
  EditIcon,
  AttachmentIcon,
  ModelIcon,
  UsersIcon,
  Provider,
} from '..'

export const Members = () => (
  <Provider
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Topbar
      data={{
        Projects: '/',
        Settings: '/settings',
      }}
    />
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Menu
        data={{
          'Personal settings': {
            Profile: '/profile',
            Preferences: '/preferences',
            Notifications: '/notifications',
            'Keyboard shortcuts': '/keyboard',
          },
          'Product settings': {
            Integrations: '/integrations',
            API: '/api',
            Import: '/import',
          },
          'Organization settings': {
            EBU: '/ebu',
            Saulx: '/saulx',
          },
        }}
      />
      <Menu
        prefix="/ebu"
        data={{
          EBU: {
            General: '/general',
            'Roles & Permissions': '/roles',
            Members: '/members',
            Billing: '/billing',
          },
        }}
      />
    </div>
  </Provider>
)

const Edit = ({ id, data }) => {
  return <div>{id}</div>
}

export const Assets = () => (
  <Provider
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Topbar
      data={{
        Projects: '/',
        Settings: '/settings',
      }}
    />
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Sidebar
        data={{
          Overview: ['/', GridIcon],
          Schema: ['/schema', LayersIcon],
          Content: ['/content', EditIcon],
          Files: ['/files', AttachmentIcon],
          Users: ['/users', UsersIcon],
          Graphql: ['/graphql', ModelIcon],
        }}
      />
      <Menu
        data={{
          'Project Settings': '/project',
          General: '/general',
        }}
      />
      <Edit
        id={'x'}
        data={{
          'Project details': {
            'Project name': 'name',
            'Email address': ['email', 'Enter Email Address'],
            'Project picture': ['picture', 'Add picture'],
          },
          'Privacy settings': {
            'Make project private': ['name', false],
            // 'Allow specific organization members access': []
          },
        }}
      />
    </div>
  </Provider>
)
