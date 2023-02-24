import React from 'react'
import { ContextDivider, useDialog, ContextItem } from '~'
import { useClient, useQuery } from '@based/react'
import getService from '@based/get-service'

export const UserProfile = ({ id }) => {
  const dialog = useDialog()
  const client = useClient()
  return (
    <>
      <ContextItem
        onClick={async () => {
          if (!id) {
            console.error('id must be passed to UserProfile component')
          }
          const url =
            (
              await getService(
                { ...client.opts, name: '@based/hub' },
                1,
                client.opts.cluster
              )
            ).url.replace('ws', 'http') +
            `/get?token=${encodeURIComponent(
              // @ts-ignore
              client.getToken()
            )}&q=${encodeURIComponent(
              JSON.stringify({
                $id: id,
                email: true,
                id: true,
                name: true,
                descendants: {
                  $all: true,
                  $list: true,
                },
              })
            )}`
          window.open(url)
        }}
      >
        Download user data
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={async () => {
          if (
            await dialog.confirm(
              'Are you sure you want to remove your account?'
            )
          ) {
            // @ts-ignore
            await client.delete({ $id: id })
            // @ts-ignore
            await client.logout()
          }
        }}
      >
        Delete account
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={async () => {
          // @ts-ignore
          await client.logout()
        }}
      >
        Logout
      </ContextItem>
    </>
  )
}
