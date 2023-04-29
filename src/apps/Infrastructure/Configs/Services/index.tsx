import { MachineConfig } from '@based/machine-config'
import React, { FC } from 'react'
import {
  Button,
  AddIcon,
  AccordionItem,
  useContextState,
  Row,
  RowEnd,
  border,
} from '~'
import { AllMachinesStatus } from '../../AllMachinesStatus'
import { ServiceNamed, OnMachineConfigChange } from '../../types'
import { Service } from './Service'
import { useAddService } from './useAddService'
import { Commands } from './Commands'

export const Services: FC<{
  configName: string
  config: MachineConfig & { configName?: string }
  onChange: OnMachineConfigChange
  alwaysAccept?: boolean
}> = ({ config, configName, onChange, alwaysAccept }) => {
  const services: ServiceNamed[] = []

  // TODO: Weird selva bug
  // when empty record return an empty object not NULL
  if (config.services === null) {
    config.services = {}
  }

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 's'

  const [newServices, add] = useAddService(
    config,
    onChange,
    alwaysAccept,
    services.length
  )

  return (
    <AccordionItem
      label="Services"
      onExpand={(v) => {
        if (!v) {
          delete expanded[expandKey]
        } else {
          expanded[expandKey] = v
        }
        setExpanded(expanded)
      }}
      expanded={expanded[expandKey]}
      topRight={<AllMachinesStatus count={services.length} type="service" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Row>
          {alwaysAccept ? null : <Commands configName={configName} />}
          <Button icon={<AddIcon />} onClick={add} ghost>
            Add service
          </Button>
        </Row>
      </RowEnd>
      {services.map((s) => {
        return (
          <Service
            alwaysAccept={alwaysAccept}
            onChange={onChange}
            config={config}
            service={s}
            key={s.name}
          />
        )
      })}
      {newServices}
    </AccordionItem>
  )
}
