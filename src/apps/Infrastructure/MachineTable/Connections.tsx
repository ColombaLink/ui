import { Provider, useQuery } from '@based/react'
import React, { FC } from 'react'
import { prettyNumber } from '@based/pretty-number'
import { Env } from '@based/machine-config'
import { Button, UserIcon, useContextState } from '~'

export const OverviewInner: FC<{
  names?: string[]
  data: any
  all?: boolean
}> = ({ data, all, names }) => {
  if (data.stats?.services) {
    let hasHub = false
    for (const key in data.stats?.services) {
      if (key.includes('hub')) {
        hasHub = true
        break
      }
    }
    if (!hasHub) {
      return <div></div>
    }
  }

  const { data: d } = useQuery('based:connections-per-hub')

  let cnt = 0

  for (const id in d) {
    if (all || id === data.id) {
      if (
        !names ||
        (names.includes('@based/env-hub') && !d[id][1]) ||
        names.includes(d[id][1])
      ) {
        cnt += d[id][0]
      }
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

export const AllConnectionsTotal = ({ envAdminHub }) => {
  const [infraSection] = useContextState<string>('infraSection')
  const [env] = useContextState<Env>('env')

  const machineConfigs = useQuery('env', env)

  let names: string[]

  if (infraSection !== 'all' && machineConfigs.data) {
    const config = machineConfigs.data.config?.machineConfigs?.[infraSection]
    if (config) {
      names = Object.keys(config.services)
    }
  }

  return (
    <Provider client={envAdminHub}>
      <OverviewInner data={{}} all names={names} />
    </Provider>
  )
}
