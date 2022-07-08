import React from 'react'
import { Avatar } from '~/components/Avatar'
import { Notification } from '~/components/Notification/Notification'
import { ArrowRightIcon, CheckCircleIcon, CloseCircleIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { createNotification } from '~/utils/createNotification'

export const Notifications = () => {
  return (
    <div>
      <Container wrap space>
        <Notification
          title="Account created"
          message="We’ve created your account for you."
          icon={CheckCircleIcon({ color: 'PrimaryMain' })}
        />
        <Notification
          title="Oops!"
          message="Something went terribly wrong."
          icon={CloseCircleIcon({ color: 'Red' })}
        />
        <Notification
          style={{ width: 360, backgroundColor: '#BADA55' }}
          title="Crazy Notification!"
          topLeft={<Avatar label="yo" size={32} color="Pink" />}
          topRight={<CheckCircleIcon />}
          message="Much wow. Amaze."
        >
          <Button onClick={() => {}}>Child Button</Button>
        </Notification>
      </Container>

      <Container wrap space>
        <Button
          space
          iconRight={<ArrowRightIcon />}
          onClick={() => {
            createNotification(
              <Notification
                title="Let's go dude"
                message="3 seconds timeout"
                icon={<CheckCircleIcon color="Green" />}
              />,
              document.getElementById('toast-target')
            )
          }}
        >
          Pop up a Notification
        </Button>
        <Button
          color="Yellow"
          onClick={() => {
            createNotification(
              <Notification
                title="Test this"
                message="3 seconds timeout"
                icon={<CheckCircleIcon color="Blue" />}
              />,
              document.getElementById('toast-target')
            )
          }}
        >
          Pop up a Notification
        </Button>
      </Container>

      <div
        id="toast-target"
        style={{
          position: 'fixed',
          bottom: 8,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      ></div>
    </div>
  )
}
