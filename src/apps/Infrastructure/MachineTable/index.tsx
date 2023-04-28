import { useClient, useQuery } from '@based/react'
import React, { FC } from 'react'
import {
  Table,
  styled,
  useContextState,
  Badge,
  ChevronLeftIcon,
  Button,
  Container,
  RowSpaced,
} from '~'
import { Env } from '@based/machine-config'
import { MachineStatus, Status } from './MachineStatus'
import { AllConnections } from './Connections'

const Id = ({ data }) => {
  return <Badge>{data.id}</Badge>
}

export const MachineTable: FC<{
  configName?: string
  envAdminHub: any
}> = ({ configName, envAdminHub }) => {
  const [env] = useContextState<Env>('env')
  const [, setPage] = useContextState<string>('infraSection')

  const headers = [
    {
      key: 'status',
      label: '',
      width: 100,
      customComponent: Status,
    },
    {
      key: 'connections',
      label: '',
      width: 100,
      customComponent: AllConnections,
    },
    {
      key: 'id',
      label: 'ID',
      width: 150,
      customComponent: Id,
    },

    {
      key: 'stats',
      customComponent: MachineStatus,
      label: 'Stats',
      width: 200, // can also be an fn
    },
    { key: 'publicIp', label: 'Ip' },
    { key: 'cloudMachineId', label: 'CloudId' },
    { key: 'domain', label: 'Domain' },
  ]

  if (!configName) {
    headers.push({
      key: 'machineConfigName',
      label: 'Config',
    })
  }

  const handleClick = (e, rowData) => {
    console.info('Clicked on row:', rowData)
  }

  const client = useClient()

  return (
    <styled.div
      style={{
        padding: 32,
        width: '100%',
        height: '100%',
      }}
    >
      <RowSpaced>
        <Button
          style={{
            marginTop: 4,
          }}
          ghost
          icon={ChevronLeftIcon}
          onClick={() => {
            setPage('overview')
          }}
        >
          Machine configs
        </Button>
      </RowSpaced>
      <Container
        style={{
          marginTop: 32,
          padding: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Table
          // sort option in query
          query={(offset, limit) => {
            return client.query('machines', {
              ...env,
              offset,
              limit,
              configName,
            })
          }}
          getQueryItems={(d) => {
            return d.machines
          }}
          // do an aggregate query here...
          itemCount={20e3}
          context={{ envAdminHub }}
          headers={headers}
          onClick={handleClick}
        />
      </Container>
    </styled.div>
  )
}
