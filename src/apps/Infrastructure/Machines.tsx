import React, { FC, useMemo } from 'react'
import {
  Page,
  Button,
  Container,
  Text,
  Input,
  Accordion,
  Spacer,
  useDialog,
  AddIcon,
  useContextState,
  SearchIcon,
  RowSpaced,
  RowEnd,
} from '~'
import { useQuery, useClient } from '@based/react'
import { deepCopy } from '@saulx/utils'
import { Env, Machine, MachineConfig } from '@based/machine-config'
import { AddMachineModal } from './AddMachineTemplateModal'
import { ActionMenuButton } from './ActionMenu'
import { Services } from './Services'
import { MachinesSection } from './MachinesSection'
import { Settings } from './Settings'
import { UpdateButton } from './UpdateButton'

const MachineConfig: FC<{
  configName: string
  config: MachineConfig
  machines: Machine[]
  env: Env
}> = ({ configName, config, machines, env }) => {
  const client = useClient()
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
        <Settings
          configName={configName}
          config={config}
          onChange={(config) => {
            const payload = {
              ...env,
              ignorePorts: true, // tmp
              configName,
              config,
            }
            client.call('update-machine-config', payload)
          }}
        />
        <Services
          onChange={(config) => {
            const payload = {
              ...env,
              ignorePorts: true, // tmp
              configName,
              config,
            }
            client.call('update-machine-config', payload)
          }}
          machines={machines}
          configName={configName}
          config={config}
        />
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
  const { data: envData, checksum } = useQuery('env', env, {
    persistent: true,
  })

  const [filter, setFilter] = useContextState('filter', '')
  const { open } = useDialog()
  const config: { [key: string]: MachineConfig } = useMemo(() => {
    const c: { [key: string]: MachineConfig } =
      envData?.config?.machineConfigs || {}
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
        env={env}
        key={key}
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
        <UpdateButton
          machineConfigs={envData?.config?.machineConfigs}
          checksum={checksum}
        />
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
