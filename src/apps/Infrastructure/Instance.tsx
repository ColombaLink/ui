import React, { FC } from 'react'
import { Checkbox, Row, border, Card, Select, Label } from '~'
import { ServiceInstance, Machine, MachineConfig } from '@based/machine-config'
import { ServiceNamed } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Status } from './Status'
import { Field, Settings, Empty } from './Field'

type SettingProps = {
  onChange: (field: string, value: any) => void
  instance: ServiceInstance
}

const DefaultSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <Settings>
      <Field
        value={instance.port}
        field="port"
        type="number"
        description='"Network port"'
        onChange={onChange}
      />
      <Field
        value={instance.args?.name}
        field="name"
        description="Instance name"
        onChange={onChange}
      />
      <Empty />
      <Empty />
      <Empty />
    </Settings>
  )
}

const HubSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <Settings>
      <Field
        value={instance.port}
        field="port"
        type="number"
        description='"Network port"'
        onChange={onChange}
      />
      <Field
        value={instance.args?.name}
        field="name"
        description="Instance name"
        onChange={onChange}
      />
      <Field
        label="Rate limit (ws)"
        description="Max Rate limit tokens"
        field="rateLimit.wsTokens"
        value={instance?.args?.rateLimit?.wsTokens}
        onChange={onChange}
      />
      <Field
        label="Rate limit drain (ws)"
        description="Drain Δ/30 sec"
        field="rateLimit.wsDrain"
        value={instance?.args?.rateLimit?.wsDrain}
        onChange={onChange}
      />
      <Field
        label="Rate limit (http)"
        description="Max Rate limit tokens"
        field="rateLimit.httpTokens"
        value={instance?.args?.rateLimit?.httpTokens}
        onChange={onChange}
      />
      <Field
        label="Rate limit drain (http)"
        description="Drain Δ/30 sec"
        field="rateLimit.httpDrain"
        value={instance?.args?.rateLimit?.httpDrain}
        onChange={onChange}
      />
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
      <Empty />
      <Empty />
      <Row
        style={{
          width: '100%',
          borderTop: border(1),
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
      </Row>
    </Settings>
  )
}

const DbSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <Settings>
      <Field
        value={instance.port}
        field="port"
        type="number"
        description='"Network port"'
        onChange={onChange}
      />
      <Field
        value={instance.args?.name}
        field="name"
        description="Instance name"
        onChange={onChange}
      />
      <Empty />
      <Empty />
      <Empty />
      <Row
        style={{
          width: '100%',
          borderTop: border(1),
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
          label="Dynamic Indexing"
        />
        <Checkbox
          style={{
            marginLeft: 32,
          }}
          label="Debug Mode"
        />
      </Row>
    </Settings>
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
  } else if (service.name.includes('db') && !service.name.includes('ts-')) {
    type = 'db'
  }

  const onChange = (field, v) => {
    console.info('change this!', field, v)
  }

  return (
    <Card
      style={{
        minWidth: '100%',
      }}
      label={service.name + ' #' + index}
      topRight={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Status type="instance" running={machines.length} />
          <ActionMenuButton config={config} configName={configName} />
        </div>
      }
    >
      {type === 'hub' ? (
        <HubSettings onChange={onChange} instance={instance} />
      ) : type === 'db' ? (
        <DbSettings onChange={onChange} instance={instance} />
      ) : (
        <DefaultSettings onChange={onChange} instance={instance} />
      )}
    </Card>
  )
}
