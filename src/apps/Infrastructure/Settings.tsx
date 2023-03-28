import React, { FC } from 'react'
import { AccordionItem, useContextState, SettingsGroup } from '~'
import { MachineConfig } from '@based/machine-config'
import { OnMachineConfigChange } from './types'

export const Settings: FC<{
  configName: string
  config: MachineConfig
  alwaysAccept?: boolean
  onChange: OnMachineConfigChange
}> = ({ config, configName, onChange, alwaysAccept }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 'g'

  return (
    <AccordionItem
      onExpand={(v) => {
        if (!v) {
          delete expanded[expandKey]
        } else {
          expanded[expandKey] = v
        }
        setExpanded(expanded)
      }}
      expanded={expanded[expandKey]}
      label="Settings"
    >
      <SettingsGroup
        alwaysAccept={alwaysAccept}
        onChange={(values) => {
          if (values.amount) {
            Object.assign(values, values.amount)
            delete values.amount
          }
          onChange(values)
        }}
        labelWidth={208}
        values={config}
        style={{ minWidth: '100%', maxWidth: 500 }}
        data={{
          amount: {
            type: 'range',
            label: 'Amount of machines',
            description: 'Min/Max amount of machines',
            value: { min: config.min, max: config.max },
          },
          image: {
            type: 'text',
            description: 'Image from cloud to use',
          },
          memory: {
            type: 'number',
            description: 'Machine memory in gb',
          },
          cpu: {
            type: 'number',
            description: 'Number of (v)Cpus',
          },
        }}
      />
    </AccordionItem>
  )
}
