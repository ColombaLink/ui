import React, { FC, useMemo } from 'react'
import {
  Page,
  Button,
  Container,
  Text,
  Input,
  Accordion,
  AccordionItem,
  Spacer,
  useDialog,
  AddIcon,
  useContextState,
  SearchIcon,
  Badge,
} from '~'
import { AddMachineModal } from './AddMachineModal'
import { useQuery } from '@based/react'
import { Env, MachineConfig, Machine } from './types'
import { styled } from 'inlines'
import { Amount } from './Amount'
import { ActionMenuButton } from './ActionMenu'
import { Services } from './Services'
import { MachinesSection } from './MachinesSection'
import { deepCopy } from '@saulx/utils'

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
}> = ({ configName, config, machines, env }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )

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
      <Text space typo="caption400">
        Some description of the machine
      </Text>
      <Accordion>
        <AccordionItem
          onExpand={(v) => {
            expanded[configName + '-settings'] = v
            setExpanded(expanded)
          }}
          expanded={expanded[configName + '-settings']}
          label="Settings"
        >
          <Amount config={config} env={env} id={configName} />
        </AccordionItem>
        <Services machines={machines} configName={configName} config={config} />
        <MachinesSection
          machines={machines}
          configName={configName}
          config={config}
          expanded={expanded[configName + '-machines']}
        />
      </Accordion>
    </Container>
  )
}

export const Machines: FC<{ env: Env }> = ({ env }) => {
  const { data: envData, checksum } = useQuery('env', env)
  const [filter, setFilter] = useContextState('filter', '')
  const { open } = useDialog()
  const config: MachineConfig = useMemo(() => {
    const c: MachineConfig = envData?.config?.machineConfigs || {}
    if (filter) {
      const filtered = deepCopy(c)
      for (const k in filtered) {
        const s = filtered[k].services
        for (const x in s) {
          if (!x.includes(filter)) {
            delete s[x]
          }
        }
        if (Object.keys(s).length === 0) {
          delete filtered[k]
        }
      }
      return filtered
    }
    return c
  }, [checksum, filter])

  const machineConfigs = []

  for (const key in config) {
    machineConfigs.push(
      <MachineConfig
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
          alignItems: 'center',
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Button
          style={{ marginRight: 8 }}
          onClick={() => {}}
          ghost
          icon={
            <Badge color="accent" style={{ marginRight: 8 }}>
              5
            </Badge>
          }
        >
          Upgrades available
        </Button>
        <Button
          color="text"
          ghost
          onClick={() => {
            open(<AddMachineModal env={env} />)
          }}
          icon={<AddIcon />}
        >
          Add machine template
        </Button>
        <Input
          value={filter}
          onChange={setFilter}
          type="text"
          style={{ width: 250, marginLeft: 16 }}
          icon={<SearchIcon />}
          placeholder="Filter by service name"
        />
      </styled.div>

      <Spacer space="32px" />
      {machineConfigs}
    </Page>
  )
}
