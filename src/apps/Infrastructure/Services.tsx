import {
  MachineConfig,
  Service,
  ServiceInstance,
} from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC, ReactNode } from 'react'
import {
  Text,
  Badge,
  Input,
  Checkbox,
  CloseIcon,
  color,
  Button,
  AddIcon,
  Card,
  AccordionItem,
  Select,
  Label,
} from '~'
import { styled } from 'inlines'
import { ActionMenuButton } from './ActionMenu'

const Instance: FC<{
  instance: ServiceInstance
  index: string
  service: ServiceNamed
  config: MachineConfig
  configName: string
}> = ({ index, instance, service, config, configName }) => {
  // different options for diffrent serivies

  let type: string
  if (service.name.includes('hub')) {
    // shared port
    type = 'hub'
  }

  return (
    <Card
      style={{
        minWidth: '100%',
      }}
      label={service.name + ' #' + index}
      topRight={<ActionMenuButton config={config} configName={configName} />}
    >
      {type === 'hub' ? (
        <styled.div
          style={{
            borderTop: '1px solid ' + color('border'),
            marginLeft: -8,
            marginRight: -8,
            marginTop: 8,
            paddingTop: 8,
            flexWrap: 'wrap',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Port"
            description="Network port"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Port"
              value={instance?.port}
              type="number"
              onChange={() => {}}
            />
          </Label>
          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Name"
            description="Instance name"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Name"
              value={instance?.args?.name}
              type="text"
              onChange={() => {}}
            />
          </Label>
          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Rate limit (ws)"
            description="Max Rate limit tokens"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Rate limit tokens"
              value={instance?.args?.rateLimit?.ws}
              type="number"
              onChange={() => {}}
            />
          </Label>
          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Rate limit drain (ws)"
            description="Drain Δ/30 sec"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Δ/30sec"
              value={instance?.args?.rateLimit?.ws}
              type="number"
              onChange={() => {}}
            />
          </Label>

          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Rate limit (http)"
            description="Max Rate limit tokens"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Rate limit tokens"
              value={instance?.args?.rateLimit?.ws}
              type="number"
              onChange={() => {}}
            />
          </Label>
          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Rate limit drain (http)"
            description="Drain Δ/30 sec"
          >
            <Input
              style={{ width: '100%', marginTop: 8 }}
              placeholder="Δ/30sec"
              value={instance?.args?.rateLimit?.ws}
              type="number"
              onChange={() => {}}
            />
          </Label>

          <Label
            style={{
              margin: 8,
            }}
            labelWidth={140}
            direction="row"
            label="Threat sensitivity"
            description="Auto block ips"
          >
            <Select style={{ width: 185 }} options={[]} />
          </Label>

          <div
            style={{
              width: '100%',
              borderTop: '1px solid ' + color('border'),
              display: 'flex',
              marginTop: 16,
              padding: 8,
              paddingTop: 16,
            }}
          >
            <Checkbox label="Shared port" />
            <Checkbox
              style={{
                marginLeft: 32,
              }}
              label="Disable http"
            />
            <Checkbox
              style={{
                marginLeft: 32,
              }}
              label="Debug Mode"
            />
          </div>
        </styled.div>
      ) : null}
    </Card>
  )
}

type ServiceNamed = Service & { name: string }

const Service: FC<{
  service: ServiceNamed
  configName: string
  config: MachineConfig
}> = ({ service, config, configName }) => {
  const instances: ReactNode[] = []

  for (const x in service.instances) {
    instances.push(
      <Instance
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
          <div
            style={{
              flexShrink: 0,
              // marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ActionMenuButton
              color="lighttext"
              config={config}
              configName={configName}
            />
            <Button color="lighttext" icon={<AddIcon />} ghost />
          </div>
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
}> = ({ config, configName, expanded }) => {
  const services: ServiceNamed[] = []

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  return (
    <AccordionItem label="Services" expanded={expanded}>
      <styled.div>
        {services.map((s) => {
          return (
            <Service
              config={config}
              configName={configName}
              service={s}
              key={s.name}
            />
          )
        })}
      </styled.div>
    </AccordionItem>
  )
}
