import React, { FC } from 'react'
import {
  Page,
  Button,
  Container,
  Text,
  ExpandableList,
  Spacer,
  MoreIcon,
  ContextItem,
  useContextMenu,
  ContextDivider,
  ExpandRightIcon,
  ReplaceIcon,
  DuplicateIcon,
  StopIcon,
  CloseIcon,
  Badge,
  LoadingIcon,
  WarningIcon,
  useDialog,
  CheckIcon,
  AddIcon,
} from '~'
import { AddMachineModal } from './AddMachineModal'
import { useQuery } from '@based/react'
import { Env } from './types'
import { styled } from 'inlines'
import { Amount } from './Amount'

const MachineMenu: FC<{
  id: string
  config: any
  machines: {
    id: string
    cloudMachineId: string
    status: number // add all
    machineConfigName: string
    publicIp: string
  }[]
}> = () => {
  return (
    <>
      <ContextItem icon={<ReplaceIcon />}>Reboot all machines</ContextItem>
      <ContextItem icon={<ExpandRightIcon />}>
        (Re)Start all services
      </ContextItem>
      <ContextItem icon={<StopIcon />}>Stop all services</ContextItem>
      <ContextDivider />
      <ContextItem icon={<DuplicateIcon />}>Duplicate</ContextItem>
      <ContextDivider />
      <ContextItem icon={<CloseIcon />}>Remove</ContextItem>
    </>
  )
}

const Machine: FC<{
  machine: {
    id: string
    cloudMachineId: string
    status: number // add all
    machineConfigName: string
    publicIp: string
  }
}> = ({ machine }) => {
  return (
    <styled.div style={{}}>
      <Text>{machine.publicIp}</Text>
    </styled.div>
  )
}

const MachineConfig: FC<{
  id: string
  config: any
  env: Env
  machines: {
    id: string
    cloudMachineId: string
    status: number // add all
    machineConfigName: string
    publicIp: string
  }[]
}> = ({ id, config, machines, env }) => {
  const servicesMapped = []
  const machinesMapped = machines.map((machine) => {
    return <Machine key={machine.id} machine={machine} />
  })

  for (const key in config.services) {
    servicesMapped.push(key)
  }

  return (
    <Container>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text typo="subtitle600">{id}</Text>
        <Button
          onClick={useContextMenu(
            MachineMenu,
            { id, config, machines },
            {
              offset: { y: -36, x: 0 },
            }
          )}
          ghost
          color="text"
          icon={<MoreIcon />}
        />
      </styled.div>
      <Spacer />

      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Badge iconRight={CheckIcon} style={{ marginRight: 12 }} color="green">
          1 machine running
        </Badge>
        <Badge
          style={{ marginRight: 12 }}
          color="accent"
          iconRight={LoadingIcon}
        >
          5 machines deploying
        </Badge>
        <Badge style={{ marginRight: 12 }} color="red" iconRight={WarningIcon}>
          2 machines unreachable
        </Badge>
      </styled.div>

      <Spacer />

      <Amount config={config} env={env} id={id} />

      <Spacer />

      <ExpandableList
        data={[
          { label: 'Services', items: servicesMapped },
          {
            label: 'Machines',
            items: machinesMapped,
          },
        ]}
      />
    </Container>
  )
}

export const Machines: FC<{ env: Env }> = ({ env }) => {
  const { data: envData } = useQuery('env', env)

  const { open } = useDialog()

  console.info(JSON.stringify(envData, false, 2))
  const config = envData?.config?.machineConfigs || {}
  const machineConfigs = []

  for (const key in config) {
    machineConfigs.push(
      <MachineConfig
        key={key}
        env={env}
        id={key}
        config={config[key]}
        machines={
          envData.machines?.filter((m) => {
            return m.machineConfigName === key
          }) || []
        }
      />
    )
  }

  return (
    <Page>
      <styled.div
        style={{
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Button
          ghost
          onClick={() => {
            open(<AddMachineModal env={env} />)
          }}
          icon={<AddIcon />}
        >
          Add machine template
        </Button>
      </styled.div>
      <Spacer space="32px" />
      {machineConfigs}
    </Page>
  )
}
