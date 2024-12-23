
import { ContextDivider, useDialog, ContextItem } from '~'
import { useClient } from '@based/react'

export const UserProfile = ({ id }) => {
  const dialog = useDialog()
  const client = useClient()
  return (
    <>
      <ContextItem
        onClick={async () => {
          if (
            await dialog.confirm(
              'Are you sure you want to remove your account?'
            )
          ) {
            await client.call('user:delete', { userId: id })
          }
        }}
      >
        Delete account
      </ContextItem>
      <ContextDivider />

      <ContextItem
        onClick={async () => {
          await client.call('user:logout')
        }}
      >
        Logout
      </ContextItem>
    </>
  )
}
