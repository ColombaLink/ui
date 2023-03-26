import React, { FC, useRef } from 'react'
import {
  Dialog,
  Select,
  Button,
  Input,
  Spacer,
  ExpandableList,
  CloseIcon,
  AddIcon,
} from '~'
import { useUpdate } from '~/hooks/useUpdate'
import { Env } from './types'
import { deepCopy } from '@saulx/utils'

export const AddMachineModal: FC<{ env: Env }> = ({ env }) => {
  console.info(env)
  const update = useUpdate()
  const newConfig = useRef({
    services: {},
    min: 1,
    max: 1,
    configName: '',
  })

  return (
    <Dialog>
      <Dialog.Label>Add machine template</Dialog.Label>
      <Dialog.Body>
        <Select
          value={newConfig.current.configName}
          placeholder="Select a predefined template"
          options={templateNames}
          onChange={(name) => {
            if (name && newConfig.current.configName !== name) {
              // @ts-ignore
              newConfig.current = deepCopy(
                templates.find((v) => v.configName === name)
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

        <Spacer />
        <Button ghost icon={<AddIcon />} />
        <ExpandableList
          data={Object.keys(newConfig.current.services).map((v) => {
            const instances = newConfig.current.services[v].instances
            const items = []

            for (const key in instances) {
              const instance = instances[key]
              items.push({
                label: 'Instance #' + key + ' port: ' + instance.port,
                value: <Button ghost icon={<CloseIcon />} />,
              })
            }

            return {
              label: v,
              value: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {newConfig.current.services[v].distChecksum.slice(-4) +
                    ' instances ' +
                    items.length}
                  <Button ghost icon={<CloseIcon />} />
                </div>
              ),
              items,
            }
          })}
        />
      </Dialog.Body>
    </Dialog>
  )
}
