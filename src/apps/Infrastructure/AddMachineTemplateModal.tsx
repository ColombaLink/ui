import React, { FC, useMemo, useRef, useState } from 'react'
import {
  Dialog,
  Select,
  Input,
  Spacer,
  useUpdate,
  StateProvider,
  Button,
  useContextState,
  CurlyBracesIcon,
  RowSpaced,
} from '~'
import { Env, MachineConfig, Template } from '@based/machine-config'
import { deepCopy, deepMerge } from '@saulx/utils'
import { Services } from './Services'
import { Settings } from './Settings'
import { useQuery, useClient } from '@based/react'
import { Dist } from './types'
import { EditJsonModalBody } from './EditJson'

export const AddMachineModal: FC<{
  config?: MachineConfig
  configName?: string
}> = ({ config, configName }) => {
  const update = useUpdate()

  const [isJSON, setJSON] = useState(false)

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

  const copiedConfig = useMemo(() => {
    return config
      ? {
          configName: configName + '-copy',
          config: deepCopy(config),
        }
      : undefined
  }, [config])

  const [env] = useContextState<Env>('env')
  const client = useClient()
  const newConfig = useRef<{ configName: string; config: MachineConfig }>(
    copiedConfig || {
      config: {
        services: {},
        min: 1,
        max: 1,
      },
      configName: '',
    }
  )

  const { data: templates = [] } = useQuery<Template[]>(
    'machine-templates',
    undefined,
    { persistent: true }
  )

  const onConfirm = async (
    configTotal: {
      configName: string
      config: MachineConfig
    },
    ignorePorts: boolean = false
  ) => {
    const { configName, config } = configTotal
    for (const key in config.services) {
      if (config.services[key].distChecksum === 'latest') {
        config.services[key].distChecksum = dists[key][0].checksum
      }
    }
    const payload = {
      ...env,
      config,
      configName,
      ignorePorts,
    }
    await client.call('update-machine-config', payload)
  }

  return (
    <Dialog
      style={{
        maxWidth: '90vw',
        width: '925px',
      }}
    >
      {isJSON ? (
        <EditJsonModalBody
          label={' Add machine template'}
          actions={
            <Button
              color={isJSON ? 'accent' : 'text'}
              onClick={() => {
                setJSON(!isJSON)
              }}
              ghost
              icon={<CurlyBracesIcon size={12} />}
            />
          }
          object={newConfig.current}
          onChange={(totalConfig) => {
            // @ts-ignore TODO: make generic
            return onConfirm(totalConfig, true)
          }}
        />
      ) : (
        <>
          <Dialog.Label>
            <RowSpaced>
              Add machine template
              <Button
                color={isJSON ? 'accent' : 'text'}
                onClick={() => {
                  setJSON(!isJSON)
                }}
                ghost
                icon={<CurlyBracesIcon size={12} />}
              />
            </RowSpaced>
          </Dialog.Label>
          <Dialog.Body>
            <Select
              options={templates.map((v) => v.configName)}
              value={newConfig.current.configName}
              placeholder="Select a predefined template"
              onChange={(name) => {
                if (name && newConfig.current.configName !== name) {
                  // @ts-ignore
                  const { configName, ...config } = deepCopy(
                    templates.find((t) => t.configName === name)
                  )
                  newConfig.current = {
                    configName,
                    config,
                  }
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
                  deepMerge(newConfig.current.config, values)
                  update()
                }}
                alwaysAccept
                config={newConfig.current.config}
                configName={newConfig.current.configName}
              />
              <Services
                onChange={(values) => {
                  deepMerge(newConfig.current.config, values)
                  update()
                }}
                alwaysAccept
                machines={[]}
                config={newConfig.current.config}
                configName={newConfig.current.configName}
              />
            </StateProvider>
          </Dialog.Body>
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm onConfirm={() => onConfirm(newConfig.current)} />
          </Dialog.Buttons>
        </>
      )}
    </Dialog>
  )
}
