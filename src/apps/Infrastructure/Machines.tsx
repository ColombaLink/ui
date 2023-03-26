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
  RowSpaced,
  RowEnd,
} from '~'
import { useQuery } from '@based/react'
import { Env, Machine, MachineConfig } from '@based/machine-config'
import { AddMachineModal } from './AddMachineModal'
import { ActionMenuButton } from './ActionMenu'
import { Services } from './Services'
import { MachinesSection } from './MachinesSection'
import { deepCopy } from '@saulx/utils'
import { Settings } from './Settings'

const MachineConfig: FC<{
  configName: string
  config: MachineConfig
  machines: Machine[]
}> = ({ configName, config, machines }) => {
  return (
    <Container>
      <RowSpaced>
        <Text typo="subtitle600">{configName}</Text>
        <ActionMenuButton configName={configName} config={config} />
      </RowSpaced>
      <Text space typo="caption400">
        Some description of the machine
      </Text>
      <Accordion>
        <Settings configName={configName} config={config} />
        <Services machines={machines} configName={configName} config={config} />
        <MachinesSection
          machines={machines}
          configName={configName}
          config={config}
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
      <RowEnd>
        <Button
          style={{ marginRight: 8 }}
          onClick={() => {}}
          ghost
          color="accent"
          icon={
            <Badge color="accent" style={{ marginRight: 8 }}>
              5
            </Badge>
          }
        >
          Upgrades available
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
        <Input
          value={filter}
          onChange={setFilter}
          type="text"
          style={{ width: 250, marginLeft: 16 }}
          icon={<SearchIcon />}
          placeholder="Filter by service name"
        />
      </RowEnd>
      <Spacer space="32px" />
      {machineConfigs}
    </Page>
  )
}
