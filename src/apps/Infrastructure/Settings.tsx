import React, { FC } from 'react'
import { AccordionItem, useContextState, SettingsGroup } from '~'
import { MachineConfig } from '@based/machine-config'

export const Settings: FC<{
  configName: string
  config: MachineConfig
}> = ({ config, configName }) => {
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
        onChange={(values) => {
          console.info(values)
        }}
        labelWidth={208}
        style={{ minWidth: '100%', maxWidth: 500 }}
        data={{
          amount: {
            type: 'range',
            label: 'Amount of machines',
            description: 'Min/Max amount of machines',
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
