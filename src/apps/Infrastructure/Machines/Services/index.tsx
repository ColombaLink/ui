import { MachineConfig, Machine } from '@based/machine-config'
import React, { FC, useMemo, useRef } from 'react'
import { hash } from '@saulx/hash'
import {
  Text,
  Button,
  AddIcon,
  AccordionItem,
  useContextState,
  RedoIcon,
  StopIcon,
  Row,
  RowEnd,
  border,
  useSelect,
  Accept,
  useUpdate,
} from '~'
import { Status } from '../Status'
import { ServiceNamed, OnMachineConfigChange, Dist } from '../../types'
import { useQuery } from '@based/react'
import { deepMerge } from '@saulx/utils'
import { Service } from './Service'

export const Services: FC<{
  configName: string
  config: MachineConfig & { configName?: string }
  machines: Machine[]
  onChange: OnMachineConfigChange
  alwaysAccept?: boolean
}> = ({ config, configName, machines, onChange, alwaysAccept }) => {
  const services: ServiceNamed[] = []

  const update = useUpdate()

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
    return Object.keys(dists)
      .filter((f) => !(f in (config?.services || {})))
      .map((v) => {
        // Will make nice explanation for all the services (also in dists)
        return {
          label: (
            <div>
              <Text typo="body600">{v}</Text>
            </div>
          ),
          value: v,
        }
      })
  }, [distChecksum, services.length])

  const newServices = useRef<any>({ services: {} })

  const [, add] = useSelect(
    options,
    null,
    (name) => {
      if (!name) {
        return
      }
      const service = {
        distChecksum: dists[name][0].checksum,
        instances: {
          '0': {
            port: 80,
          },
        },
      }
      if (alwaysAccept) {
        config.services[name] = service
        onChange(config)
      } else {
        newServices.current.services[name] = service
      }
      update()
    },
    { noValue: true, filterable: true }
  )

  const newServicesItems: ServiceNamed[] = []

  for (const key in newServices.current.services) {
    newServicesItems.push({ name: key, ...newServices.current.services[key] })
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
            service={s}
            key={s.name}
          />
        )
      })}

      {newServicesItems.map((s) => {
        return (
          <Service
            key={'n' + s.name}
            alwaysAccept
            onChange={(values) => {
              deepMerge(newServices.current, values)
              update()
            }}
            machines={[]}
            config={newServices.current}
            service={s}
          >
            <Accept
              onAccept={async () => {
                await onChange(newServices.current)
                newServices.current = { services: {} }
              }}
              onCancel={() => {
                delete newServices.current.services[s.name]
                delete expanded[
                  hash(configName + s.name + configName + 0).toString(16)
                ]
                setExpanded(expanded)
                update()
              }}
            />
          </Service>
        )
      })}
    </AccordionItem>
  )
}
