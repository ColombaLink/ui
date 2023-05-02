import { useClient } from '@based/react'
import React, { FC } from 'react'
import {
  Table,
  styled,
  ExpandIcon,
  useContextState,
  Badge,
  border,
  Row,
  SearchIcon,
  MoreIcon,
  ChevronLeftIcon,
  Button,
  RowSpaced,
  Text,
  useContextMenu,
  Input,
  ContextItem,
  useSelect,
  useDialog,
  Dialog,
  Code,
} from '~'
import { Env } from '@based/machine-config'
import { MachineStatus, Status, StatusBadge } from './MachineStatus'
import { AllConnections, AllConnectionsTotal } from './Connections'
import { AllMachinesStatus } from '../AllMachinesStatus'
import { useMachineStatus } from './useMachineStatus'

const Services = ({ data }) => {
  let total = 0
  let counters = {}
  for (const key in data.stats?.services) {
    for (const instance in data.stats?.services[key]) {
      total++
      if (data.stats?.services[key][instance] !== 1) {
        if (data.stats?.services[key][instance] === 4) {
          if (!counters[0]) {
            counters[0] = 0
          }
          counters[0]++
        } else if (data.stats?.services[key][instance] === 3) {
          if (!counters[6]) {
            counters[6] = 0
          }
          counters[6]++
        } else if (data.stats?.services[key][instance] === 5) {
          if (!counters[5]) {
            counters[5] = 0
          }
          counters[5]++
        }
      }
    }
  }

  let status = `${total} Running`
  let statusCode = 1
  if (total === 0) {
    statusCode = 5
    status = `Installing`
  } else if (counters[0]) {
    statusCode = 0
    status = `${counters[0]}/${total} Not OK`
  } else if (counters[5]) {
    statusCode = 7
    status = `${counters[5]}/${total} In danger`
  } else if (counters[6]) {
    statusCode = 6
    status = `${counters[6]}/${total} Stopped`
  }

  // 1 = ok, 2 = starting, 3 = stopped, 4 = errored, 5 = danger
  const { open } = useDialog()

  return (
    <StatusBadge
      onClick={() => {
        open(
          <Dialog>
            <Code value={JSON.stringify(data.stats.services, null, 2)} />
          </Dialog>
        )
      }}
      status={statusCode}
    >
      {status}
    </StatusBadge>
  )
}

const Id = ({ data, header }) => {
  return (
    <Text selectable typography="caption400">
      {data[header.key]}
    </Text>
  )
}

const Domain = ({ data, header }) => {
  return (
    <a href={'https://' + data.domain} target="_blank">
      <Text selectable typography="caption400">
        {data.domain}
      </Text>
    </a>
  )
}

const Records = ({ data }) => {
  return (
    <Text selectable typography="caption400">
      {data.records?.hub ?? data.records?.discovery}
    </Text>
  )
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
      label: 'Machine',
      width: 130,
      customComponent: Status,
    },
    {
      key: 'services',
      customComponent: Services,
      width: 175,
      label: 'Services',
    },
    {
      key: 'stats',
      customComponent: MachineStatus,
      label: 'Stats',
      width: 200, // can also be an fn
    },
    { key: 'publicIp', label: 'Ip' },
    {
      key: 'id',
      label: 'ID',
      customComponent: Id,
    },
    {
      key: 'cloudMachineId',
      label: 'CloudId',
      customComponent: Id,
    },
    {
      key: 'domain',
      label: 'Domain',
      customComponent: Domain,
    },
    {
      key: 'connections',
      label: <AllConnectionsTotal envAdminHub={envAdminHub} />,
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
  const machineStatus = useMachineStatus(env, configName)
  const [filter, setFilter] = useContextState('filter', '')
  const [statusFilter, listener] = useSelect([
    { value: 'ok', label: 'Ok' },
    { value: 'fail', label: 'Failing' },
    { value: 'deploy', label: 'Deploying' },
  ])

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
        <Row
          style={{
            marginTop: 4,
          }}
        >
          <Button
            ghost
            style={{
              marginRight: 8,
            }}
            icon={ChevronLeftIcon}
            onClick={() => {
              setPage('overview')
            }}
          />
          <Text
            style={{
              marginRight: 16,
            }}
            typography="body600"
          >
            {configName ?? 'All'}
          </Text>
          <AllMachinesStatus
            goodColor="green"
            running={machineStatus.amount - machineStatus.failing}
            unreachable={machineStatus.failing}
            deploying={machineStatus.deploying}
            type="machine"
          />
        </Row>
        <Row>
          <Button icon={ExpandIcon} ghost onClick={listener} />
          <Input
            value={filter}
            onChange={setFilter}
            type="text"
            style={{ width: 250, marginLeft: 8 }}
            icon={<SearchIcon />}
            placeholder="Filter by id, ip or domain"
          />
        </Row>
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
          queryId={filter + (statusFilter ?? '')}
          query={(offset, limit) => {
            const status = statusFilter
            if (filter) {
              return client.query('machines', {
                ...env,
                offset,
                limit,
                configName,
                filter,
                status: statusFilter,
              })
            }
            return client.query('machines', {
              ...env,
              offset,
              limit,
              configName,
              status: statusFilter,
            })
          }}
          getQueryItems={(d) => {
            return d.machines
          }}
          // also filter this amount...
          itemCount={machineStatus.amount}
          context={{ envAdminHub }}
          headers={headers}
          onClick={handleClick}
        />
      </styled.div>
    </styled.div>
  )
}
