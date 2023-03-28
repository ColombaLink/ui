import React, { FC } from 'react'
import { Card, SettingsGroup } from '~'
import { ServiceInstance, Machine, MachineConfig } from '@based/machine-config'
import { ServiceNamed, OnMachineConfigChange } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Status } from './Status'
import { deepMerge } from '@saulx/utils'

type SettingProps = {
  onChange: (values: { [field: string]: any }) => void
  instance: ServiceInstance
  // eslint-disable-next-line
  serviceName?: string
  alwaysAccept?: boolean
}

const DefaultSettings: FC<SettingProps> = ({
  instance,
  onChange,
  alwaysAccept,
}) => {
  return (
    <SettingsGroup
      alwaysAccept={alwaysAccept}
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        isDebug: {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
  )
}

const DiscoverSettings: FC<SettingProps> = ({
  alwaysAccept,
  instance,
  onChange,
}) => {
  return (
    <SettingsGroup
      alwaysAccept={alwaysAccept}
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        serverListSize: {
          type: 'number',
          label: 'List size',
          description: 'Servers/response',
          default: 5,
        },
        spread: {
          type: 'number',
          label: 'Spread',
          description: 'Max unique responses',
          default: 10e3,
        },
        name: {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
        isDebug: {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
  )
}

const HubSettings: FC<SettingProps> = ({
  alwaysAccept,
  instance,
  onChange,
}) => {
  return (
    <SettingsGroup
      alwaysAccept={alwaysAccept}
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        name: {
          label: 'Name',
          type: 'text',
          description: 'Instance name',
        },
        securityLevel: {
          label: 'Threat sensitivity',
          description: 'Auto block ips',
          options: [
            { value: 1, label: 'Level 1' },
            { value: 2, label: 'Level 2' },
            { value: 3, label: 'Level 3' },
          ],
        },
        'rateLimit.ws': {
          label: 'Rate limit (ws)',
          type: 'number',
          description: 'Max Rate limit tokens',
          default: 2e3,
        },
        'rateLimit.http': {
          label: 'Rate limit (http)',
          type: 'number',
          description: 'Max Rate limit tokens',
          default: 1e3,
        },
        'rateLimit.drain': {
          label: 'Rate limit drain',
          type: 'number',
          description: 'Drain Δ/30 sec',
          default: 500,
        },
        'ws.maxBackpressureSize': {
          label: 'Max backpressure',
          type: 'number',
          description: 'Backpressure in bytes',
          default: 1024 * 1024 * 10,
        },
        sharedPort: {
          type: 'boolean',
          label: 'Shared port',
        },
        disableRest: {
          type: 'boolean',
          label: 'Disable rest',
        },
        disableWs: {
          type: 'boolean',
          label: 'Disable ws',
        },
        isDebug: {
          type: 'boolean',
          label: 'Debug mode',
        },
      }}
    />
  )
}

const DbSettings: FC<SettingProps> = ({
  alwaysAccept,
  instance,
  onChange,
  serviceName,
}) => {
  return (
    <SettingsGroup
      alwaysAccept={alwaysAccept}
      values={instance}
      onChange={onChange}
      data={{
        port: {
          type: 'number',
          description: 'Network port',
        },
        name:
          serviceName === '@based/env-db'
            ? {
                label: 'Name',
                type: 'text',
                description: 'Instance name',
              }
            : null,
        noBackUps: {
          type: 'boolean',
          label: 'Disable Backups',
        },
        noIndexing: {
          type: 'boolean',
          label: 'Disable Dynamic Indexing',
        },
        isDebug: {
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
  alwaysAccept?: boolean
  configName: string
  machines: Machine[]
  onChange: OnMachineConfigChange
}> = ({
  index,
  instance,
  service,
  config,
  configName,
  machines,
  onChange,
  alwaysAccept,
}) => {
  let type: string

  if (service.name === '@based/env-hub-discovery') {
    type = 'discover'
  } else if (
    service.name === '@based/env-hub' ||
    service.name === '@based/env-admin-hub'
  ) {
    type = 'hub'
  } else if (
    service.name === '@based/env-db' ||
    service.name === '@based/env-metrics-db' ||
    service.name === '@based/env-config-db'
  ) {
    type = 'db'
  }

  const onChangeWrapped = (values) => {
    onChange({
      services: {
        [service.name]: {
          instances: {
            [index]: deepMerge(instance, values),
          },
        },
      },
    })
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
        <DiscoverSettings
          alwaysAccept={alwaysAccept}
          onChange={onChangeWrapped}
          instance={instance}
        />
      ) : type === 'hub' ? (
        <HubSettings
          alwaysAccept={alwaysAccept}
          onChange={onChangeWrapped}
          instance={instance}
        />
      ) : type === 'db' ? (
        <DbSettings
          alwaysAccept={alwaysAccept}
          onChange={onChangeWrapped}
          instance={instance}
          serviceName={service.name}
        />
      ) : (
        <DefaultSettings
          alwaysAccept={alwaysAccept}
          onChange={onChangeWrapped}
          instance={instance}
        />
      )}
    </Card>
  )
}
