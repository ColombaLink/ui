import React, { FC } from 'react'
import {
  Button,
  AccordionItem,
  Text,
  border,
  ReplaceIcon,
  Badge,
  useContextState,
  useCopyToClipboard,
  CheckIcon,
  CopyIcon,
  copyToClipboard,
  Row,
  RowSpaced,
  RowEnd,
  ContextItem,
  RedoIcon,
  MoreIcon,
  useContextMenu,
  CloseIcon,
  ContextDivider,
  Table,
} from '~'
import { Status } from './Status'
import { MachineStatus } from './MachineStatus'
import {
  Env,
  Machine as MachineType,
  MachineConfig,
} from '@based/machine-config'
import { useClient } from '@based/react'

const Actions: FC<{
  machine: MachineType
}> = ({ machine }) => {
  const [env] = useContextState<Env>('env')
  const client = useClient()
  return (
    <>
      <ContextItem
        onClick={async () => {
          await client.call('send-commands', {
            ...env,
            commands: [
              {
                machineId: machine.id,
                command: 'restart',
                service: '*',
              },
            ],
          })
        }}
        icon={RedoIcon}
      >
        Restart all services
      </ContextItem>
      <ContextItem
        onClick={async () => {
          await client.call('send-commands', {
            ...env,
            commands: [
              {
                machineId: machine.id,
                command: 'restart',
              },
            ],
          })
        }}
        icon={ReplaceIcon}
      >
        Reboot machine
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={async () => {
          await client.call('send-commands', {
            ...env,
            commands: [
              {
                machineId: machine.id,
                command: 'stop',
              },
            ],
          })
        }}
        icon={CloseIcon}
      >
        Stop machine manager
      </ContextItem>
    </>
  )
}

const Machine: FC<{
  machine: MachineType
  config: MachineConfig
}> = ({ machine, config }) => {
  const [copied, copy] = useCopyToClipboard(machine.id)

  if (!machine.stats) {
    machine.stats = {
      lastUpdate: 0,
      memory: 0,
      cpu: 0,
      services: {},
    }
  }

  return (
    <RowSpaced
      style={{
        borderBottom: border(1),
        paddingBottom: 8,
        marginBottom: 8,
      }}
    >
      <Row>
        <MachineStatus
          status={machine.status}
          machineTypeValue={config.machine}
          cpu={machine.stats.cpu}
          memory={machine.stats.memory}
        />
        <Button
          style={{ marginLeft: 32 }}
          clickAnimation
          onClick={() => copyToClipboard(machine.publicIp)}
          ghost
          transparent
        >
          {machine.publicIp}
        </Button>
        {machine.domain ? (
          <Button
            style={{ marginLeft: 24 }}
            clickAnimation
            onClick={() => copyToClipboard(machine.domain)}
            ghost
            transparent
          >
            <Text color="text2">{machine.domain}</Text>
          </Button>
        ) : null}
        <Button
          clickAnimation
          style={{ marginLeft: 24 }}
          onClick={() => copyToClipboard(machine.cloudMachineId)}
          ghost
          transparent
        >
          <Text color="text2">{machine.cloudMachineId}</Text>
        </Button>
      </Row>
      <Row>
        <Button
          ghost
          transparent
          clickAnimation
          onClick={() => {
            copy()
          }}
          icon={
            <Badge iconRight={copied ? <CheckIcon /> : <CopyIcon />}>
              {machine.id}
            </Badge>
          }
        />
        <Button
          icon={MoreIcon}
          ghost
          onClick={useContextMenu(Actions, { machine })}
        />
      </Row>
    </RowSpaced>
  )
}

export const MachinesSection: FC<{
  configName: string
  config: MachineConfig
  machineStatus: any
}> = ({ config, configName, machineStatus }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const [env] = useContextState<Env>('env')

  const client = useClient()

  // console.log(machines)

  // let running = 0
  // let unreachable = 0
  // let deploying = 0
  // // 1 = ok, 2 = creating, 3 = rebooting, 4 = removing,
  // for (const machine of machines) {
  //   if (machine.status === 1) {
  //     running++
  //   } else if (machine.status === 2) {
  //     deploying++
  //   } else if (machine.status === 0) {
  //     unreachable++
  //   }
  // }

  const expandKey = configName + 'm'
  return (
    <AccordionItem
      label="Machines"
      // onExpand={(v) => {
      //   if (!v) {
      //     delete expanded[expandKey]
      //   } else {
      //     expanded[expandKey] = v
      //   }
      //   setExpanded(expanded)
      // }}
      // expanded={expanded[expandKey]}
      topRight={
        <Status
          goodColor={expanded[expandKey] ? 'accent' : 'green'}
          running={machineStatus.amount - machineStatus.failing}
          unreachable={machineStatus.failing}
          deploying={machineStatus.deploying}
          type="machine"
        />
      }
    >
      {/* <RowEnd
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
      })} */}
    </AccordionItem>
  )
}
