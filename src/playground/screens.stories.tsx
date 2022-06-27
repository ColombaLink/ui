import React, { CSSProperties, FC } from 'react'
import { Link } from '~/components/Link'
import { Page } from '~/components/Page'
import { Steps } from '~/components/Steps'
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
  Badge,
  DotIcon,
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
        <Text size="20px" space="32px">
          Junior Eurovision - France 2022
        </Text>
        <Block space>
          <Text size="20px" weight={700} space>
            Start building a project
          </Text>
          <div style={{ display: 'flex' }}>
            <Steps
              style={{ marginRight: 24 }}
              data={{
                'Set up your schema': '/',
                'Create content': '/create',
                'Make your API accessible': '/api',
                'Integrate your content with your front-end': '/integrate',
              }}
            />
            <Block>
              <Text>First things first, set up your schema!</Text>
              <Text color="TextSecondary" space size="15px">
                Define the building blocks of your content.
              </Text>
              <Button>Start your schema</Button>
            </Block>
          </div>
        </Block>
        <Block style={{ display: 'flex' }} space>
          <Text size="20px" weight="700">
            Project status
          </Text>
        </Block>
        <Block style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text size="20px" weight="700">
            Changelog
          </Text>
          <Badge
            outline
            iconLeft={(props) => <DotIcon color="AccentPurple" {...props} />}
          >
            Deploying: setting up servers 1/4
          </Badge>
        </Block>
      </Page>
    </Provider>
  )
}
