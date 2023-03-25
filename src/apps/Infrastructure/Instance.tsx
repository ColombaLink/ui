import {
  MachineConfig,
  ServiceInstance,
} from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC } from 'react'
import { Input, Checkbox, color, Card, Select, Label } from '~'
import { Machine, ServiceNamed } from './types'
import { styled } from 'inlines'
import { ActionMenuButton } from './ActionMenu'
import { Status } from './Status'

const HubSettings: FC<{
  instance: ServiceInstance
}> = ({ instance }) => {
  return (
    <styled.div
      style={{
        borderTop: '1px solid ' + color('border'),
        marginLeft: -8,
        marginRight: -8,
        marginTop: 16,
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
        label="Threat sensitivityx"
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
  )
}

const DbSettings: FC<{
  instance: ServiceInstance
}> = ({ instance }) => {
  return (
    <styled.div
      style={{
        borderTop: '1px solid ' + color('border'),
        marginLeft: -8,
        marginRight: -8,
        marginTop: 16,
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
        <Checkbox checked label="Backups" />
        <Checkbox
          style={{
            marginLeft: 32,
          }}
          checked
          label="Auto indexing"
        />
        <Checkbox
          style={{
            marginLeft: 32,
          }}
          label="Debug Mode"
        />
      </div>
    </styled.div>
  )
}

export const Instance: FC<{
  instance: ServiceInstance
  index: string
  service: ServiceNamed
  config: MachineConfig
  configName: string
  machines: Machine[]
}> = ({ index, instance, service, config, configName, machines }) => {
  let type: string
  if (service.name.includes('hub')) {
    type = 'hub'
  } else if (service.name.includes('db')) {
    type = 'db'
  }

  return (
    <Card
      style={{
        minWidth: '100%',
      }}
      label={service.name + ' #' + index}
      topRight={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Status type="service" running={machines.length} />
          <ActionMenuButton config={config} configName={configName} />
        </div>
      }
    >
      {type === 'hub' ? (
        <HubSettings instance={instance} />
      ) : type === 'db' ? (
        <DbSettings instance={instance} />
      ) : null}
    </Card>
  )
}
