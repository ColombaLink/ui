import React from 'react'
import { Toast, useToast } from '~/components/Toast'
import { BasedIcon, CheckCircleIcon, CloseIcon, StackIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Avatar } from '~/components/Avatar'
import { Container } from '~/components/Container'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { useToast, Toast, Button } from '@based/ui'
const toast = useToast()

const notify = () => {
  toast.add(<Toast title="Notify!" message="Account created." />)
}

<Button onClick={notify}>
  Notify!
</Button>`

const CloseAllButton = () => {
  const toast = useToast()
  const amount = toast.useCount()

  return (
    <>
      <Button
        disabled={!amount}
        iconLeft={<CloseIcon />}
        onClick={() => toast.close()}
      >
        Close All Toasts ({amount})
      </Button>
    </>
  )
}

export const Toasts = () => {
  return (
    <div>
      <ComponentViewer
        component={Toast}
        examples={[
          {
            props: {
              title: 'success',
              message: 'Account created.',
              icon: <CheckCircleIcon color="PrimaryMain" />,
              children: 'We’ve created your account for you.',
            },
          },
          {
            code: codeExample,
            // component: () => {
            //   return <Notification>{toasts}</Notification>
            // },
          },
        ]}
      />
    </div>
  )
}
