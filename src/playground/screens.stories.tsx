import React from 'react'
import { Page } from '~/components/Page'
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
  Text,
  Block,
  color,
  Button,
} from '..'

export const Members = () => (
  <Provider>
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
  <Provider>
    <Topbar data={{ Projects: '/', Settings: '/settings' }} />
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

export const Dashboard = () => {
  return (
    <Provider>
      <Topbar data={{ Projects: '/', Settings: '/settings' }} />
      <Page>
        <Text size="20" space="32">
          Junior Eurovision - France 2022
        </Text>
        <Block space>
          <Text size="20" weight={700} space>
            Start building a project
          </Text>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: 24 }}>
              {[
                'Set up your schema',
                'Create content',
                'Make your API accessible',
                'Integrate your content with your front-end',
              ].map((text, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: index
                        ? null
                        : color('PrimaryLightSelected'),
                      display: 'flex',
                      alignItems: 'center',
                      height: 48,
                      padding: '0 16px',
                      borderRadius: 4,
                      marginBottom: 8,
                    }}
                  >
                    <Text
                      color="PrimaryMain"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: color('OtherForeground'),
                        textAlign: 'center',
                        lineHeight: '26px',
                        marginRight: 16,
                      }}
                    >
                      {index + 1}
                    </Text>
                    <Text>{text}</Text>
                  </div>
                )
              })}
            </div>
            <Block>
              <Text>First things first, set up your schema!</Text>
              <Text color="TextSecondary" space size="15">
                Define the building blocks of your content.
              </Text>
              <Button>Start your schema</Button>
            </Block>
          </div>
        </Block>
        <Block style={{ display: 'flex' }}>
          <Text size="20" weight="700">
            Project status
          </Text>
        </Block>
      </Page>
    </Provider>
  )
}
