import React from 'react'
import { Toast, useToast } from '~/components/Toast'
import { CheckCircleIcon, CloseIcon } from '~/icons'
import { Button } from '~/components/Button'
import ComponentViewer from '../ComponentViewer'

const codeExample = `import { CheckCircleIcon, useToast, Toast, Button } from '@based/ui'

const toast = useToast()

const notify = () => {
  toast.add(<Toast 
    label="notify"
    type="success"
    description="Account created." 
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
        icon={<CloseIcon />}
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
              label: 'success',
              description: 'Account created.',
              type: 'success',
              children: 'We’ve created your account for you.',
            },
          },
          {
            props: {
              label: 'Error',
              description: 'Oof. 😓',
              type: 'error',
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
