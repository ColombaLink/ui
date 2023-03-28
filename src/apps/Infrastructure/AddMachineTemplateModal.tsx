import React, { FC, useRef } from 'react'
import {
  Dialog,
  Select,
  Input,
  Spacer,
  useUpdate,
  StateProvider,
  useContextState,
} from '~'
import { Env, MachineConfig, Template } from '@based/machine-config'
import { deepCopy, deepMerge } from '@saulx/utils'
import { Services } from './Services'
import { Settings } from './Settings'
import { useQuery, useClient } from '@based/react'
import { Dist } from './types'

export const AddMachineModal: FC = () => {
  const update = useUpdate()

  const { data: dists = {} } = useQuery<{
    [key: string]: Dist[]
  }>(
    'dists',
    {
      type: 'env',
    },
    {
      persistent: true,
    }
  )

  const [env] = useContextState<Env>('env')
  const client = useClient()
  const newConfig = useRef<MachineConfig & { configName: string }>({
    services: {},
    min: 1,
    max: 1,
    configName: '',
  })

  const { data: templates = [] } = useQuery<Template[]>(
    'machine-templates',
    undefined,
    { persistent: true }
  )

  return (
    <Dialog
      style={{
        maxWidth: '90vw',
        width: '925px',
      }}
    >
      <Dialog.Label>Add machine template</Dialog.Label>
      <Dialog.Body>
        <Select
          options={templates.map((v) => v.configName)}
          value={newConfig.current.configName}
          placeholder="Select a predefined template"
          onChange={(name) => {
            if (name && newConfig.current.configName !== name) {
              // @ts-ignore
              newConfig.current = deepCopy(
                templates.find((t) => t.configName === name)
              )
              update()
            }
          }}
        />
        <Spacer space="32px" />
        <Input
          label="Template name"
          value={newConfig.current.configName}
          placeholder="Template name"
          onChange={(v) => {
            newConfig.current.configName = v
            update()
          }}
          type="text"
        />
        <Spacer space="32px" />

        <StateProvider>
          <Settings
            onChange={(values) => {
              deepMerge(newConfig.current, values)
              update()
            }}
            alwaysAccept
            config={newConfig.current}
            configName={newConfig.current.configName}
          />
          <Services
            onChange={(values) => {
              deepMerge(newConfig.current, values)
              update()
            }}
            alwaysAccept
            machines={[]}
            config={newConfig.current}
            configName={newConfig.current.configName}
          />
        </StateProvider>
      </Dialog.Body>
      <Dialog.Buttons>
        <Dialog.Cancel />
        <Dialog.Confirm
          onConfirm={async () => {
            const { configName, ...config } = newConfig.current
            for (const key in config.services) {
              if (config.services[key].distChecksum === 'latest') {
                config.services[key].distChecksum = dists[key][0].checksum
              }
            }
            const payload = {
              ...env,
              config,
              configName,
            }
            await client.call('update-machine-config', payload)
          }}
        />
      </Dialog.Buttons>
    </Dialog>
  )
}
