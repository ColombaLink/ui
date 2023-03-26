import React, { FC } from 'react'
import { Card, SettingsGroup } from '~'
import { ServiceInstance, Machine, MachineConfig } from '@based/machine-config'
import { ServiceNamed } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Status } from './Status'

type SettingProps = {
  onChange: (values: { [field: string]: any }) => void
  instance: ServiceInstance
}

const DefaultSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <SettingsGroup
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        'args.name': {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
      }}
    />
  )
}

const HubSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <SettingsGroup
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        'args.name': {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
        'args.securityLevel': {
          label: 'Threat sensitivity',
          description: 'Auto block ips',
          options: ['Level 1', 'Level 2', 'Level 3'],
        },
        'args.rateLimit.wsTokens': {
          label: 'Rate limit (ws)',
          type: 'number',
          description: 'Max Rate limit tokens',
        },
        'args.rateLimit.wsDrain': {
          label: 'Rate limit drain (ws)',
          type: 'number',
          description: 'Drain Δ/30 sec',
        },
        'args.rateLimit.httpTokens': {
          label: 'Rate limit (http)',
          type: 'number',
          description: 'Max Rate limit tokens',
        },
        'args.rateLimit.httpDrain': {
          label: 'Rate limit drain (http)',
          type: 'number',
          description: 'Drain Δ/30 sec',
        },
        'args.sharedPort': {
          type: 'boolean',
          label: 'Shared port',
        },
        'args.noHttp': {
          type: 'boolean',
          label: 'Disable http',
        },
        'args.debugMode': {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
  )
}

const DbSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <SettingsGroup
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        'args.name': {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
        'args.noBackUps': {
          type: 'boolean',
          label: 'Disable Backups',
        },
        'args.noIndexing': {
          type: 'boolean',
          label: 'Disable Dynamic Indexing',
        },
        'args.debugMode': {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
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

  const onChange = (values) => {
    console.info('change this!', values)
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
