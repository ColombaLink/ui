import React from 'react'
import { Toast, useToast } from '~/components/Toast'
import { CheckCircleIcon, CloseIcon } from '~/icons'
import { Button } from '~/components/Button'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { CheckCircleIcon, useToast, Toast, Button } from '@based/ui'

const toast = useToast()

const notify = () => {
  toast.add(<Toast 
    title="notify"
    icon={CheckCircleIcon}
    message="Account created." 
  />)
}

<Button onClick={notify}>
  Notify!
</Button>
`

const closeAllExample = `import { CheckCircleIcon, useToast, Toast, Button, CloseIcon } from '@based/ui'

const toasty = useToast()
const amount = toasty.useCount()

const closeAll = () => {
  toasty.close()
}

<Button onClick={closeAll} disabled={!amount}>Close All Toasties ({amount})</Button>
`

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
              icon: <CheckCircleIcon color="accent" />,
              children: 'We’ve created your account for you.',
            },
          },
          {
            code: codeExample,
            // component: () => {
            //   return <Notification>{toasts}</Notification>
            // },
          },
          {
            code: closeAllExample,
          },
        ]}
      />
    </div>
  )
}
