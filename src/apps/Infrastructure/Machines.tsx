import React, { FC } from 'react'
import {
  Page,
  Button,
  Container,
  Text,
  Accordion,
  AccordionItem,
  Spacer,
  Badge,
  LoadingIcon,
  ChevronUpIcon,
  WarningIcon,
  useDialog,
  CheckIcon,
  AddIcon,
  ChevronDownIcon,
  useContextState,
} from '~'
import { AddMachineModal } from './AddMachineModal'
import { useQuery } from '@based/react'
import { Env, MachineConfig, Machine } from './types'
import { styled } from 'inlines'
import { Amount } from './Amount'
import { ActionMenuButton } from './ActionMenu'
import { Services } from './Services'

const Machine: FC<{
  machine: Machine
}> = ({ machine }) => {
  return (
    <styled.div style={{}}>
      <Text>{machine.publicIp}</Text>
    </styled.div>
  )
}

const MachineConfig: FC<{
  configName: string
  expanded: boolean
  config: MachineConfig
  env: Env
  machines: {
    id: string
    configName: string
    cloudMachineId: string
    status: number // add all
    machineConfigName: string
    publicIp: string
  }[]
}> = ({ configName, config, machines, expanded, env }) => {
  return (
    <Container>
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text typo="subtitle600">{configName}</Text>
        <ActionMenuButton configName={configName} config={config} />
      </styled.div>
      <Spacer space="24px" />
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Badge
            iconRight={CheckIcon}
            style={{ marginRight: 12 }}
            color="green"
          >
            1 machine running
          </Badge>
          <Badge
            style={{ marginRight: 12 }}
            color="accent"
            iconRight={LoadingIcon}
          >
            5 machines deploying
          </Badge>
          <Badge
            style={{ marginRight: 12 }}
            color="red"
            iconRight={WarningIcon}
          >
            2 machines unreachable
          </Badge>
        </styled.div>
      </styled.div>
      <Spacer space="32px" />
      <Accordion>
        <AccordionItem label="Settings" expanded={expanded}>
          <Amount config={config} env={env} id={configName} />
        </AccordionItem>
        <Services configName={configName} config={config} expanded={expanded} />
        <AccordionItem label="Machines" expanded={expanded}></AccordionItem>
      </Accordion>
    </Container>
  )
}

export const Machines: FC<{ env: Env }> = ({ env }) => {
  const { data: envData } = useQuery('env', env)
  const [expanded, setExpanded] = useContextState('expanded', false)

  const { open } = useDialog()

  console.info(JSON.stringify(envData, null, 2))

  const config = envData?.config?.machineConfigs || {}
  const machineConfigs = []

  for (const key in config) {
    machineConfigs.push(
      <MachineConfig
        expanded={expanded}
        key={key}
        env={env}
        configName={key}
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
          style={{ marginRight: 8 }}
          onClick={() => {
            setExpanded(!expanded)
          }}
          ghost
          icon={expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          {expanded ? 'Collapse all' : 'Expand all'}
        </Button>
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
