import React from 'react'
import { Topbar } from '~/components/Topbar'
import { Menu, Page, Container, Button, Text, Input, Avatar } from '~'

export const TallyScreens = () => {
  return (
    <>
      <Topbar data={{ Projects: '/', Settings: '/settings' }} logo={<></>} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Menu
          prefix="/"
          data={{
            'Tally App': {
              'Project settings': '/project settings',
              General: '/general',
            },
          }}
        />
        <Page>
          <Text size="20px" space="32px" weight={700}>
            Tally ho
          </Text>
        </Page>
      </div>
    </>
  )
}
