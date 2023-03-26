import React, { FC } from 'react'
import { Amount } from './Amount'
import { AccordionItem, useContextState } from '~'
import { MachineConfig } from '@based/machine-config'
import { Field, Settings as FieldSettings } from './Field'

export const Settings: FC<{
  configName: string
  config: MachineConfig
}> = ({ config, configName }) => {
  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const onChange = () => {}
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
      <FieldSettings style={{ minWidth: '100%', maxWidth: 500 }}>
        <Amount config={config} id={configName} />
        <Field
          width={208}
          field="Image"
          description="Image from cloud to use"
          onChange={onChange}
        />
        <Field
          width={208}
          field="Memory"
          type="number"
          description="Machine memory in gb"
          onChange={onChange}
        />
        <Field
          width={208}
          field="Cpu cores"
          type="number"
          description="Number of (v)Cpus"
          onChange={onChange}
        />
      </FieldSettings>
    </AccordionItem>
  )
}
