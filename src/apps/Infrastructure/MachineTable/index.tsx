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
} from '~'
import { Env } from '@based/machine-config'
import { MachineStatus, Status } from './MachineStatus'
import { AllConnections } from './Connections'
import { AllMachinesStatus } from '../AllMachinesStatus'
import { useMachineStatus } from './useMachineStatus'

const Id = ({ data, header }) => {
  return (
    <Text selectable typo="caption400">
      {data[header.key]}
    </Text>
  )
}

const Records = ({ data }) => {
  // console.log(data)
  return (
    <Text selectable typo="caption400">
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
      label: '',
      width: 130,
      customComponent: Status,
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
            typo="body600"
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
