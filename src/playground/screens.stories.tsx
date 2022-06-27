import React, { CSSProperties, FC, useState } from 'react'
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
  AddIcon,
  MenuButton,
  Table,
  Link,
  Page,
  Steps,
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
    <Topbar
      data={{ Projects: '/', Settings: '/settings' }}
      onFilter={(e) => {
        console.log(e.target.value)
      }}
      onProfile={() => {
        console.log('clicked')
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
      <Table
        fields={{
          img: 'Preview',
          updatedAt: 'Updated At',
          createdBy: 'Author',
          handle: 'Handle',
          title: 'File Name',
        }}
        data={Array.from(Array(1000)).map((_, i) => {
          return {
            title: 'Title ' + i,
            createdBy: 'Blur ' + ~~(Math.random() * 1e4),
            updatedAt: Date.now(),
            img: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          }
        })}
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

export const Chat = () => {
  const [rooms, setRooms] = useState([
    {
      label: 'Room 1',
      href: '/room1',
    },
    {
      label: 'Room 2',
      href: '/room2',
    },
  ])
  return (
    <Provider>
      <Topbar />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Menu data={{ Rooms: rooms }}>
          <MenuButton
            ghost
            iconLeft={AddIcon}
            onClick={() => {
              const n = rooms.length + 1
              setRooms([
                ...rooms,
                {
                  label: 'Room ' + n,
                  href: '/room' + n,
                },
              ])
            }}
          >
            New room
          </MenuButton>
        </Menu>
      </div>
    </Provider>
  )
}
