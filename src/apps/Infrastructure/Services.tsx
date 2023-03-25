import {
  MachineConfig,
  Service,
  ServiceInstance,
} from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC, ReactNode } from 'react'
import {
  Text,
  color,
  Button,
  AddIcon,
  AccordionItem,
  Badge,
  Select,
  RedoIcon,
  StopIcon,
} from '~'
import { Machine, ServiceNamed } from './types'
import { styled } from 'inlines'
import { ActionMenuButton } from './ActionMenu'
import { Instance } from './Instance'

const Service: FC<{
  service: ServiceNamed
  configName: string
  machines: Machine[]
  config: MachineConfig
}> = ({ service, config, configName, machines }) => {
  const instances: ReactNode[] = []

  for (const x in service.instances) {
    instances.push(
      <Instance
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

  return (
    <styled.div
      style={{
        marginBottom: 24,
        paddingBottom: 32,
        borderBottom: '1px solid ' + color('border'),
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          <Select
            label={
              <Text style={{ marginRight: 16 }} typo="body600">
                {service.name}
              </Text>
            }
            value={service.distChecksum.slice(-4)}
            options={[service.distChecksum.slice(-4)]}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ActionMenuButton config={config} configName={configName} />
          <Button color="text" icon={<AddIcon />} ghost />
        </div>
      </styled.div>
      <styled.div
        style={{
          flexWrap: 'wrap',
          marginTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {instances}
      </styled.div>
    </styled.div>
  )
}

export const Services: FC<{
  configName: string
  config: MachineConfig
  expanded?: boolean
  machines: Machine[]
}> = ({ config, configName, expanded, machines }) => {
  const services: ServiceNamed[] = []

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  return (
    <AccordionItem
      label="Services"
      expanded={expanded}
      topRight={<Badge>{services.length}</Badge>}
    >
      <styled.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          borderBottom: '1px solid ' + color('border'),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button icon={<StopIcon />} ghost>
            Stop all
          </Button>
          <Button icon={<RedoIcon />} ghost>
            Restart all
          </Button>
          <Button icon={<AddIcon />} ghost>
            Add service
          </Button>
        </styled.div>
      </styled.div>

      {services.map((s) => {
        return (
          <Service
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
