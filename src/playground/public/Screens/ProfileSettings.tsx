import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Container, Button, Text, Input, Avatar } from '~'
import wait from '~/utils/wait'

export const ProfileSettings = () => {
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
            Profile
          </Text>
          <Container
            style={{ width: 730 }}
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
              Account Details
            </Text>
            <Input
              space="24px"
              placeholder="Your full name"
              label="Full name"
            />
            <Input
              space="8px"
              placeholder="maarten@saulx.com"
              disabled
              label="Email address"
            />
            <Text weight={400} secondary space="24px">
              Email address cannot be changed.
            </Text>
            <Text weight={600} space="12px">
              Profile picture
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar size={64}>MW</Avatar>
              <Button outline ghost>
                Upload picture
              </Button>
            </div>
          </Container>
        </Page>
      </div>
    </>
  )
}
