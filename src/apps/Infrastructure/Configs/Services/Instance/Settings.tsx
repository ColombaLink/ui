import { FC } from 'react'
import { SettingsGroup } from '~'
import { ServiceInstance } from '@based/machine-config'

type SettingProps = {
  onChange: (values: { [field: string]: any }) => void
  instance: ServiceInstance
  // eslint-disable-next-line
  serviceName?: string
  alwaysAccept?: boolean
}

export const DefaultSettings: FC<SettingProps> = ({
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

export const DiscoverSettings: FC<SettingProps> = ({
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

export const HubSettings: FC<SettingProps> = ({
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
        disableAllSecurity: {
          type: 'boolean',
          label: 'Disable All Security Features',
        },
      }}
    />
  )
}

export const DbSettings: FC<SettingProps> = ({
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
