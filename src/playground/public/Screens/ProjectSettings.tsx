import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Page, Text, Container, Button, Menu, Input, Avatar, Checkbox } from '~'
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
                outline
                light
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
            <Text weight={400} color="text2" space="24px">
              We will email you to verify a change.
            </Text>
            <Text weight={600} space="12px">
              Project picture
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <Avatar size={40} color="purple">
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
            <Checkbox
              checked
              space="24px"
              label=" Make project private"
            ></Checkbox>
            <Text weight={600} space="24px">
              Allow specific organisation members access
            </Text>
          </Container>

          <Container
            style={{ maxWidth: '730px' }}
            space
            bottomRight={<Button color="red">Delete project</Button>}
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
