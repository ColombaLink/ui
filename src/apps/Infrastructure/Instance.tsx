import React, { FC } from 'react'
import { Card, SettingsGroup, useContextState } from '~'
import {
  ServiceInstance,
  Machine,
  MachineConfig,
  Env,
} from '@based/machine-config'
import { ServiceNamed } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Status } from './Status'
import { useClient } from '@based/react'
import { deepMerge } from '@saulx/utils'

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
        'args.debugMode': {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
  )
}

const DiscoverSettings: FC<SettingProps> = ({ instance, onChange }) => {
  return (
    <SettingsGroup
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        'args.serverBatchSize': {
          type: 'number',
          label: 'Server batch size',
          description: 'Servers/reply',
          default: 5,
        },
        'args.spread': {
          type: 'number',
          label: 'Spread',
          description: 'Max unique replies',
          default: 10e3,
        },
        'args.name': {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
        'args.debugMode': {
          type: 'boolean',
          label: 'Debug mode',
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
          options: [
            { value: 1, label: 'Level 1' },
            { value: 2, label: 'Level 2' },
            { value: 3, label: 'Level 3' },
          ],
        },
        'args.rateLimit.ws': {
          label: 'Rate limit (ws)',
          type: 'number',
          description: 'Max Rate limit tokens',
          default: 2e3,
        },
        'args.rateLimit.http': {
          label: 'Rate limit (http)',
          type: 'number',
          description: 'Max Rate limit tokens',
          default: 1e3,
        },
        'args.rateLimit.drain': {
          label: 'Rate limit drain',
          type: 'number',
          description: 'Drain Δ/30 sec',
          default: 500,
        },
        'args.ws.maxBackpressureSize': {
          label: 'Max backpressure',
          type: 'number',
          description: 'Backpressure in bytes',
          default: 1024 * 1024 * 10,
        },
        'args.sharedPort': {
          type: 'boolean',
          label: 'Shared port',
        },
        'args.disableRest': {
          type: 'boolean',
          label: 'Disable rest',
        },
        'args.disableWs': {
          type: 'boolean',
          label: 'Disable ws',
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

  const [env] = useContextState<Env>('env')

  if (service.name === '@based/env-hub-discovery') {
    type = 'discover'
  } else if (
    service.name === '@based/env-hub' ||
    service.name === '@based/env-admin-hub'
  ) {
    type = 'hub'
  } else if (service.name.includes('db') && !service.name.includes('ts-')) {
    type = 'db'
  }
  const client = useClient()

  const onChange = (values) => {
    const payload = {
      ...env,
      ignorePorts: true, // tmp
      configName,
      config: {
        services: {
          [service.name]: {
            instances: {
              [index]: deepMerge(instance, values),
            },
          },
        },
      },
    }
    client.call('update-machine-config', payload)
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
      {type === 'discover' ? (
        <DiscoverSettings onChange={onChange} instance={instance} />
      ) : type === 'hub' ? (
        <HubSettings onChange={onChange} instance={instance} />
      ) : type === 'db' ? (
        <DbSettings onChange={onChange} instance={instance} />
      ) : (
        <DefaultSettings onChange={onChange} instance={instance} />
      )}
    </Card>
  )
}
