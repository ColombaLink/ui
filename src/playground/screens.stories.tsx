import React, { CSSProperties, FC, useState } from 'react'
import { RightSidebar } from '~/components/RightSidebar'
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
import { client } from './shared'

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
  <Provider client={client}>
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
        // fields={['id']}
        query={(offset, limit) => ({
          $all: true,
          $list: {
            $offset: offset,
            $limit: limit,
            // $sort: {
            //   $field: 'index',
            //   $order: 'asc',
            // },
            $find: {
              $traverse: 'descendants',
              $filter: {
                $field: 'type',
                $operator: '=',
                $value: 'file',
              },
            },
          },
        })}
      />
      {/* <Table
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
      /> */}
    </div>
  </Provider>
)

export const Dashboard = () => {
  return (
    <Provider>
      <Topbar data={{ Projects: '/', Settings: '/settings' }} />
      <Page style={{ marginTop: 80 }}>
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
        <Block
          style={{ display: 'flex', justifyContent: 'space-between' }}
          space
        >
          <Text size="20px" weight="700">
            Project status
          </Text>
          <Badge
            outline
            ghost
            iconLeft={(props) => <DotIcon color="AccentPurple" {...props} />}
          >
            Deploying: setting up servers 1/4
          </Badge>
        </Block>
        <Block style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text size="20px" weight="700">
            Changelog
          </Text>
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
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
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

export const ContentArticle = () => {
  return (
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

        <Page>
          <Text size="20px" weight={700} space="4px">
            Article
          </Text>
          <Text weight={400} italic color="TextSecondary">
            A post or blog that will be published on Eurovision website
          </Text>
        </Page>

        <RightSidebar>
          <Text space size="20px" weight={700}>
            Fields
          </Text>
          <Button
            iconLeft={AddIcon}
            style={{ width: '100%' }}
            textAlign="center"
            space
          >
            Add field
          </Button>
          <Text space="20px">Documentation</Text>
          <Text
            space
            size="13px"
            color="TextSecondary"
            wrap
            style={{ lineHeight: '20px' }}
          >
            Read more about schema types in our{' '}
            <a href="#" style={{ color: color('PrimaryMain') }}>
              guide to schema editing
            </a>
          </Text>
        </RightSidebar>
      </div>
    </Provider>
  )
}
