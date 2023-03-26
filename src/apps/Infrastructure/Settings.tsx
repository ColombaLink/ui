import React, { FC } from 'react'
import { Amount } from './Amount'
import { AccordionItem, useContextState } from '~'
import { MachineConfig } from '@based/machine-config'

export const Settings: FC<{
  configName: string
  config: MachineConfig
}> = ({ config, configName }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )

  // Add description

  const expandKey = configName + 'm'
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
      <Amount config={config} id={configName} />
    </AccordionItem>
  )
}
