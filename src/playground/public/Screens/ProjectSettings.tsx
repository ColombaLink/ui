import React from 'react'
import { Topbar } from '~/components/Topbar'
import {
  Page,
  Text,
  Container,
  Button,
  Menu,
  Input,
  Avatar,
  Checkbox,
  StackedListItemsWrapper,
  StackedListItem,
} from '~'
import wait from '~/utils/wait'

export const ProjectSettings = () => {
  return (
    <>
      <Topbar data={{ Projects: '/', Settings: '/settings' }} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Menu
          prefix="/"
          data={{
            'Project settings': '/project settings',
            General: '/general',
          }}
        />

        <Page>
          <Text size="20px" space="32px" weight={700}>
            General
          </Text>
          <Container
            style={{ maxWidth: '730px' }}
            space
            bottomRight={
              <Button
                color="Greylight"
                onClick={async () => {
                  await wait(1000)
                  throw new Error('error loading async')
                }}
              >
                Save Changes
              </Button>
            }
          >
            <Text size="20px" space="24px" weight={700}>
              Project details
            </Text>
            <Input
              space="24px"
              placeholder="Project name"
              label="Project name"
            />
            <Input
              placeholder="Your emailadress..."
              label="Email address"
              space="8px"
            />
            <Text weight={400} secondary space="24px">
              We will email you to verify a change.
            </Text>
            <Text weight={600} space="12px">
              Project picture
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <Avatar size={40} color="Purple">
                EU
              </Avatar>
              <Button outline ghost>
                Upload picture
              </Button>
            </div>
          </Container>

          <Container style={{ maxWidth: '730px' }} space>
            <Text size="20px" space="24px" weight={700}>
              Privacy settings
            </Text>
            <Checkbox checked space="24px">
              Make project private
            </Checkbox>
            <Text weight={600} space="24px">
              Allow specific organisation members access
            </Text>

            <StackedListItem>
              <Checkbox />
              <Avatar
                size={40}
                backgroundImg="https://robohash.org/BX4.png?set=set4&size=150x150"
                color="Red"
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text>Maarten de Winter</Text>
                <Text weight={400} secondary>
                  maarten@saulx.com
                </Text>
              </div>
            </StackedListItem>

            <StackedListItem>
              <Checkbox />
              <Avatar
                size={40}
                backgroundImg="https://robohash.org/2ZP.png?set=set4&size=150x150"
                color="Mustard"
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text>Youzi</Text>
                <Text weight={400} secondary>
                  youzi@saulx.com
                </Text>
              </div>
            </StackedListItem>
          </Container>

          <Container
            style={{ maxWidth: '730px' }}
            space
            bottomRight={<Button color="Redlight">Delete project</Button>}
          >
            <Text size="20px" space="24px" weight={700}>
              Delete project
            </Text>
            <Text size="14px" wrap space="20px">
              Deleting this project will be irreversable. Make sure you have
              made a backup if you want to keep your data.
            </Text>
          </Container>
        </Page>
      </div>
    </>
  )
}
