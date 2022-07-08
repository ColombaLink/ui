import React from 'react'
import { Toast, useToast } from '~/components/Toast'
import { BasedIcon, CheckCircleIcon, CloseIcon, StackIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Avatar } from '~/components/Avatar'
import { Container } from '~/components/Container'
import ComponentViewer from '../ComponentViewer'

const Notification = ({ children }) => {
  const toast = useToast()

  return (
    <div
      style={{
        cursor: 'pointer',
        marginBottom: 16,
      }}
      onClick={() => toast.add(children)}
    >
      {children}
    </div>
  )
}

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
  // const toasts = [
  //   <Toast
  //     key={0}
  //     title="success"
  //     message="Account created."
  //     icon={CheckCircleIcon({ color: 'Purple' })}
  //   >
  //     We’ve created your account for you.
  //   </Toast>,

  //   <Toast
  //     key={1}
  //     title="error"
  //     message="Oops!"
  //     icon={CheckCircleIcon({ color: 'Red' })}
  //   >
  //     Something went wrong.
  //   </Toast>,

  //   <Toast key={2} title="Lil' Message?">
  //     Just something to think about.
  //   </Toast>,

  //   <Toast
  //     key={3}
  //     title="Crazy Toast?"
  //     message="Let's see"
  //     topLeft={<StackIcon />}
  //     topRight={<Avatar label="yo" color="Pink" />}
  //     style={{ backgroundColor: 'lightyellow' }}
  //   >
  //     <Button
  //       onClick={() => {
  //         console.log('yo')
  //       }}
  //     >
  //       Hello
  //     </Button>
  //   </Toast>,
  // ]

  return (
    <div>
      <ComponentViewer component={Toast} />
    </div>
  )
}
