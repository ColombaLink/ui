import React, { FC, useRef } from 'react'
import { Dialog, Select, Input, Spacer, useUpdate, StateProvider } from '~'
import { Env, MachineConfig, Template } from '@based/machine-config'
import { deepCopy } from '@saulx/utils'
import { Services } from './Services'
import { Settings } from './Settings'
import { useQuery } from '@based/react'

export const AddMachineModal: FC<{ env: Env }> = ({ env }) => {
  const update = useUpdate()
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

  console.info(templates)

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
            config={newConfig.current}
            configName={newConfig.current.configName}
          />
          <Services
            machines={[]}
            config={newConfig.current}
            configName={newConfig.current.configName}
          />
        </StateProvider>
      </Dialog.Body>
    </Dialog>
  )
}
