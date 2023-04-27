import { useQuery } from '@based/react'
import React, { FC } from 'react'
import { Table, styled, useContextState, Badge } from '~'
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

  // get all machine data from rest
  // table is still total shit

  /*
  envId: string
    org: string
    project: string
    env: string
    configName?: string
    limit?: number
    offset?: number
    sort?: any
  */

  // use effect etc

  const { data, loading } = useQuery('machines', {
    ...env,
    configName,
  })

  console.info(data)

  /*
  cloudMachineId
: 
"ma17128edb"
id
: 
"ma17128edb"
machineConfigName
: 
"env"
publicIp
: 
"192.168.178.88"
stats
: 
{cpu: 4.04541015625, lastUpdate: 1682601230001, memory: 171921408, services: {…}}
  */

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

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Table
        context={{ envAdminHub }}
        data={data?.machines ?? []}
        headers={headers}
        onClick={handleClick}
      />
    </styled.div>
  )
}

// {
/* <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 8,
          paddingBottom: machines.length > 1 ? 24 : 0,
        }}
      >
        {machines.length > 1 ? (
          <Button
            onClick={() => {
              return client.call('send-commands', {
                ...env,
                commands: machines
                  .filter((m) => m.status === 1)
                  .map((m) => {
                    return {
                      machineId: m.id,
                      command: 'restart',
                    }
                  }),
              })
            }}
            icon={<ReplaceIcon />}
            ghost
          >
            Reboot all
          </Button>
        ) : null}
      </RowEnd>
      {machines.map((m) => {
        return <Machine config={config} machine={m} key={m.id} />
      })} */
// }

// onExpand={(v) => {
//   if (!v) {
//     delete expanded[expandKey]
//   } else {
//     expanded[expandKey] = v
//   }
//   setExpanded(expanded)
// }}
// expanded={expanded[expandKey]}
