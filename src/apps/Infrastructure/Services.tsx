import {
  MachineConfig,
  Service,
} from '../../../../based-cloud/packages/machine-config/dist'
import React, { FC, ReactNode } from 'react'
import {
  Text,
  Button,
  AddIcon,
  AccordionItem,
  useContextState,
  Select,
  RedoIcon,
  StopIcon,
  RowSpaced,
  Row,
  RowEnd,
  border,
} from '~'
import { Status } from './Status'
import { Machine, ServiceNamed } from './types'
import { styled } from 'inlines'
import { ActionMenuButton } from './ActionMenu'
import { Instance } from './Instance'

const Service: FC<{
  service: ServiceNamed
  configName: string
  machines: Machine[]
  config: MachineConfig
}> = ({ service, config, configName, machines }) => {
  const instances: ReactNode[] = []

  for (const x in service.instances) {
    instances.push(
      <Instance
        machines={machines}
        config={config}
        configName={configName}
        key={x}
        service={service}
        instance={service.instances[x]}
        index={x}
      />
    )
  }

  return (
    <styled.div
      style={{
        marginBottom: 24,
        paddingBottom: 32,
        borderBottom: border(1),
      }}
    >
      <RowSpaced>
        <styled.div
          style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}
        >
          <Select
            label={
              <Text style={{ marginRight: 16 }} typo="body600">
                {service.name}
              </Text>
            }
            value={service.distChecksum.slice(-4)}
            options={[service.distChecksum.slice(-4)]}
          />
        </styled.div>
        <Row>
          <ActionMenuButton config={config} configName={configName} />
          <Button color="text" icon={<AddIcon />} ghost />
        </Row>
      </RowSpaced>
      <RowSpaced
        style={{
          flexWrap: 'wrap',
          marginTop: 24,
        }}
      >
        {instances}
      </RowSpaced>
    </styled.div>
  )
}

export const Services: FC<{
  configName: string
  config: MachineConfig
  machines: Machine[]
}> = ({ config, configName, machines }) => {
  const services: ServiceNamed[] = []

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 's'

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
      topRight={<Status running={services.length} type="service" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Row>
          <Button color="accent" icon={<StopIcon />} ghost>
            Stop all
          </Button>
          <Button color="accent" icon={<RedoIcon />} ghost>
            Restart all
          </Button>
          <Button color="accent" icon={<AddIcon />} ghost>
            Add service
          </Button>
        </Row>
      </RowEnd>

      {services.map((s) => {
        return (
          <Service
            machines={machines}
            config={config}
            configName={configName}
            service={s}
            key={s.name}
          />
        )
      })}
    </AccordionItem>
  )
}
