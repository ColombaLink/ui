import { MachineConfig, Service, Machine } from '@based/machine-config'
import React, { FC, Fragment, ReactNode, useMemo, useRef } from 'react'
import { hash } from '@saulx/hash'
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
  styled,
  border,
  SelectOption,
  useSelect,
  Accept,
  useUpdate,
} from '~'
import { Status } from './Status'
import { ServiceNamed, OnMachineConfigChange, Dist } from './types'
import { ActionMenuButton } from './ActionMenu'
import { Instance } from './Instance'
import { UpdateButton } from './UpdateButton'
import { useQuery } from '@based/react'
import { deepMerge } from '@saulx/utils'

const Service: FC<{
  service: ServiceNamed
  configName: string
  machines: Machine[]
  onChange: OnMachineConfigChange
  config: MachineConfig
  alwaysAccept?: boolean
  children?: ReactNode
}> = ({
  service,
  config,
  configName,
  machines,
  onChange,
  alwaysAccept,
  children,
}) => {
  const instances: ReactNode[] = []

  for (const x in service.instances) {
    instances.push(
      <Instance
        alwaysAccept={alwaysAccept}
        onChange={onChange}
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

  const { data: dists = {} } = useQuery<{
    [key: string]: any[]
  }>(
    'dists',
    {
      type: 'env',
    },
    {
      persistent: true,
    }
  )

  const selectOptions: SelectOption[] =
    dists[service.name]?.map((v) => {
      return {
        label: v.version,
        value: v.checksum,
      }
    }) || []

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
            label={<Text style={{ marginRight: 16 }}>{service.name}</Text>}
            value={service.distChecksum}
            options={selectOptions}
          />
          {/* <div style={{ flexShrink: 0 }}>
            <Accept />
          </div> */}
        </styled.div>
        <Row>
          {alwaysAccept ? null : (
            <UpdateButton
              machineConfigs={{
                [configName]: {
                  services: {
                    [service.name]: service,
                  },
                },
              }}
            />
          )}
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
      <RowEnd style={{ marginTop: 16 }}>{children}</RowEnd>
    </styled.div>
  )
}

export const Services: FC<{
  configName: string
  config: MachineConfig & { configName?: string }
  machines: Machine[]
  onChange: OnMachineConfigChange
  alwaysAccept?: boolean
}> = ({ config, configName, machines, onChange, alwaysAccept }) => {
  const services: ServiceNamed[] = []

  const update = useUpdate()

  for (const key in config.services) {
    services.push({ name: key, ...config.services[key] })
  }

  const [expanded, setExpanded] = useContextState<{ [key: string]: boolean }>(
    'expanded',
    {}
  )
  const expandKey = configName + 's'

  const { data: dists = {}, checksum: distChecksum } = useQuery<{
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

  const options = useMemo(() => {
    return Object.keys(dists).filter((f) => !(f in config.services))
  }, [distChecksum, config])

  const newServices = useRef<any>({})

  const [newService, add] = useSelect(options, null, (name) => {
    const service = {
      distChecksum: name ? dists[name][0].checksum : null,
      instances: {
        '0': {
          port: 80,
        },
      },
    }
    if (alwaysAccept) {
      if (!name) {
        delete config.services[name]
      } else {
        config.services[name] = service
      }
    } else {
      newServices.current = { configName, services: {} }
      if (name) {
        newServices.current.services[name] = service
      }
    }
    if (name) {
      expanded[hash(configName + name + configName + 0).toString(16)] = true
    } else {
      delete expanded[
        hash(configName + newService + configName + 0).toString(16)
      ]
    }
    setExpanded(expanded)
  })

  const newServicesX: ServiceNamed[] = []

  for (const key in newServices.current.services) {
    newServicesX.push({ name: key, ...newServices.current.services[key] })
  }

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
      topRight={<Status count={services.length} type="service" />}
    >
      <RowEnd
        style={{
          borderBottom: border(1),
          marginBottom: 24,
          paddingBottom: 24,
        }}
      >
        <Row>
          <Button icon={<StopIcon />} ghost>
            Stop all
          </Button>
          <Button icon={<RedoIcon />} ghost>
            Restart all
          </Button>
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
            machines={machines}
            config={config}
            configName={configName}
            service={s}
            key={s.name}
          />
        )
      })}

      {newServicesX.map((s) => {
        return (
          <Service
            key={'n' + s.name}
            alwaysAccept
            onChange={(values) => {
              deepMerge(newServices.current, values)
              console.info(values)
              update()
            }}
            machines={[]}
            config={newServices.current}
            configName={configName}
            service={s}
          >
            {/* <Text typo="body600">Confirm adding service</Text> */}
            <Accept onAccept={() => {}} onCancel={() => {}} />
          </Service>
        )
      })}
    </AccordionItem>
  )
}
