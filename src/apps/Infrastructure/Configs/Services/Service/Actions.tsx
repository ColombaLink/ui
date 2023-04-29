import { MachineConfig } from '@based/machine-config'
import React, { FC } from 'react'
import { Text, useDialog, ContextItem, CloseIcon, Dialog } from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { deepCopy } from '@saulx/utils'

export const Actions: FC<{
  config: MachineConfig
  service: ServiceNamed
  alwaysAccept?: boolean
  onChange: OnMachineConfigChange
}> = ({ config, onChange, alwaysAccept, service }) => {
  const { open } = useDialog()
  return (
    <>
      <ContextItem
        onClick={() => {
          if (alwaysAccept) {
            delete config.services[service.name]
            return onChange(config)
          } else {
            open(
              <Dialog>
                <Dialog.Label style={{ marginTop: 24 }}>
                  Remove service
                </Dialog.Label>
                <Dialog.Body>
                  <Text>
                    Are you sure you want ro remove <b>{service.name}</b>?
                  </Text>
                </Dialog.Body>
                <Dialog.Buttons border>
                  <Dialog.Cancel />
                  <Dialog.Confirm
                    onConfirm={() => {
                      // Copy so it does not use this config for rendering
                      const updateConf = deepCopy(config)
                      // @ts-ignore need to pass this for removal
                      updateConf.services[service.name] = { $delete: true }
                      return onChange(updateConf)
                    }}
                  />
                </Dialog.Buttons>
              </Dialog>
            )
          }
        }}
        icon={<CloseIcon />}
      >
        Remove
      </ContextItem>
    </>
  )
}
