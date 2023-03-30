import { MachineConfig, Service, Machine } from '@based/machine-config'
import React, { FC, ReactNode, useMemo, useRef } from 'react'
import { hash } from '@saulx/hash'
import {
  Text,
  Button,
  AddIcon,
  AccordionItem,
  useDialog,
  ContextItem,
  useContextState,
  Select,
  RedoIcon,
  MoreIcon,
  useContextMenu,
  StopIcon,
  CloseIcon,
  Dialog,
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
import { Instance } from './Instance'
import { UpdateButton } from './UpdateButton'
import { useQuery } from '@based/react'
import { deepMerge, deepCopy } from '@saulx/utils'

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
                  Remove machine template
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
          <Button
            icon={<MoreIcon />}
            ghost
            onClick={useContextMenu(Actions, {
              config,
              service,
              alwaysAccept,
              onChange,
            })}
          />

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
    return Object.keys(dists)
      .filter((f) => !(f in config.services))
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
  }, [distChecksum, services.length]) // distChecksum, config need to pass more

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
            configName={configName}
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
            configName={configName}
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
