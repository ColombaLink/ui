import React, { FC } from 'react'
import { Menu } from '~/components/Menu'
import { useContextState } from '~/hooks'

export const InfraLeft: FC = () => {
  const [section, setSection] = useContextState('infraSection', 'overview')
  return (
    <Menu
      active={section}
      onChange={setSection}
      data={{
        services: {
          overview: 'Overview',
          machines: 'Machines',
        },
        security: {
          ips: 'Ips management',
          stats: 'Statistics',
          secrets: 'Secrets',
          events: 'Events',
        },
      }}
    />
  )
}
