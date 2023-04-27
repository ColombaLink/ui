import { Provider, useQuery } from '@based/react'
import React from 'react'
import { prettyNumber } from '@based/pretty-number'
import { Button, UserIcon } from '~'

export const OverviewInner = ({ data }) => {
  const { data: d } = useQuery('based:connectionsPerHub')

  // get all services together and put it
  let cnt = 0
  for (const key in d) {
    const [ip] = key.split(':')
    if (ip === data.publicIp) {
      cnt += d[key]
    }
  }

  return (
    <Button
      style={{
        marginTop: -4,
      }}
      icon={UserIcon}
      ghost
      color="accent"
    >
      {prettyNumber(cnt, 'number-short')}
    </Button>
  )
}

export const AllConnections = ({ data, context }) => {
  return (
    <Provider client={context.data.context.envAdminHub}>
      <OverviewInner data={data} />
    </Provider>
  )
}
