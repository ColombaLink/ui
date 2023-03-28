import { MachineConfig, Service, Machine } from '@based/machine-config'
import React, { FC, ReactNode } from 'react'
import {
  Text,
  Button,
  AddIcon,
  AccordionItem,
  useContextState,
  Select,
  RedoIcon,
  StopIcon,
  RowSpaced,
  Row,
  RowEnd,
  styled,
  border,
  SelectOption,
} from '~'
import { Status } from './Status'
import { ServiceNamed, OnMachineConfigChange } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Instance } from './Instance'
import { UpdateButton } from './UpdateButton'
import { useQuery } from '@based/react'

const Service: FC<{
  service: ServiceNamed
  configName: string
  machines: Machine[]
  onChange: OnMachineConfigChange
  config: MachineConfig
  alwaysAccept?: boolean
}> = ({ service, config, configName, machines, onChange, alwaysAccept }) => {
  const instances: ReactNode[] = []

  for (const x in service.instances) {
    instances.push(
      <Instance
        alwaysAccept={alwaysAccept}
        onChange={onChange}
        machines={machines}
        config={config}
        configName={configName}
        key={x}
        service={service}
        instance={service.instances[x]}
        index={x}
      />
    )
  }

  const { data: dists = {} } = useQuery<{
    [key: string]: any[]
  }>(
    'dists',
    {
      type: 'env',
    },
    {
      persistent: true,
    }
  )

  const selectOptions: SelectOption[] =
    dists[service.name]?.map((v) => {
      return {
        label: v.version,
        value: v.checksum,
      }
    }) || []

  return (
    <styled.div
      style={{
        marginBottom: 24,
        paddingBottom: 32,
        borderBottom: border(1),
      }}
    >
      <RowSpaced>
        <styled.div
          style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}
        >
          <Select
            label={
              <Text style={{ marginRight: 16 }} typo="body600">
                {service.name}
              </Text>
            }
            value={service.distChecksum}
            options={selectOptions}
          />
        </styled.div>
        <Row>
          <UpdateButton
            machineConfigs={{
              [configName]: {
                services: {
                  [service.name]: service,
                },
              },
            }}
          />
          <ActionMenuButton config={config} configName={configName} />
          <Button color="text" icon={<AddIcon />} ghost />
        </Row>
      </RowSpaced>
      <RowSpaced
        style={{
          flexWrap: 'wrap',
          marginTop: 24,
        }}
      >
        {instances}
      </RowSpaced>
    </styled.div>
  )
}

export const Services: FC<{
  configName: string
  config: MachineConfig & { configName?: string }
  machines: Machine[]
  onChange: OnMachineConfigChange
  alwaysAccept?: boolean
}> = ({ config, configName, machines, onChange, alwaysAccept }) => {
  const services: ServiceNamed[] = []

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 's'

  return (
    <AccordionItem
      label="Services"
      onExpand={(v) => {
        if (!v) {
          delete expanded[expandKey]
        } else {
          expanded[expandKey] = v
        }
        setExpanded(expanded)
      }}
      expanded={expanded[expandKey]}
      topRight={<Status count={services.length} type="service" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Row>
          <Button icon={<StopIcon />} ghost>
            Stop all
          </Button>
          <Button icon={<RedoIcon />} ghost>
            Restart all
          </Button>
          <Button icon={<AddIcon />} ghost>
            Add service
          </Button>
        </Row>
      </RowEnd>

      {services.map((s) => {
        return (
          <Service
            alwaysAccept={alwaysAccept}
            onChange={onChange}
            machines={machines}
            config={config}
            configName={configName}
            service={s}
            key={s.name}
          />
        )
      })}
    </AccordionItem>
  )
}
