import { useClient, useQuery } from '@based/react'
import React, { FC } from 'react'
import {
  Table,
  styled,
  useContextState,
  Badge,
  border,
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
  const { data: envData, checksum } = useQuery('env', env)

  const headers = [
    {
      key: 'status',
      label: '',
      width: 120,
      customComponent: Status,
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
    {
      key: 'connections',
      label: '',
      width: 90,
      customComponent: AllConnections,
    },
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

  let itemCount = 0
  // lets add more info

  if (configName) {
    itemCount = envData?.machineStatus[configName].amount
  } else {
  }

  // add info

  return (
    <styled.div
      style={{
        padding: 32,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
      <styled.div
        style={{
          marginTop: 24,
          border: border(1, 'border'),
          borderRadius: 8,
          width: '100%',
          flexGrow: 1,
          overflow: 'hidden',
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
          itemCount={itemCount}
          context={{ envAdminHub }}
          headers={headers}
          onClick={handleClick}
        />
      </styled.div>
    </styled.div>
  )
}
