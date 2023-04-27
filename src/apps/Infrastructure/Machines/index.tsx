import React, { FC, useMemo } from 'react'
import {
  Page,
  Button,
  Container,
  Text,
  Input,
  Accordion,
  Spacer,
  useDialog,
  Row,
  AddIcon,
  useContextState,
  DuplicateIcon,
  CurlyBracesIcon,
  Badge,
  SearchIcon,
  ContextDivider,
  RowSpaced,
  CloseIcon,
  ContextItem,
  Dialog,
  MoreIcon,
  useContextMenu,
  EyeIcon,
} from '~'
import { useQuery, useClient } from '@based/react'
import { deepCopy } from '@saulx/utils'
import { Env, MachineConfig } from '@based/machine-config'
import { AddMachineModal } from './AddMachineTemplateModal'
import { Services } from './Services'
import { Settings } from './Settings'
import { UpdateButton } from '../UpdateButton'
import { EditJsonModal } from '../EditJson'
import { Status } from './Status'
import { Connections } from '../Connections'

export const Actions: FC<{
  config: MachineConfig
  configName: string
  // machines: Machine[]
}> = ({ config, configName }) => {
  const machines = []
  // use status

  const { open } = useDialog()
  const client = useClient()
  const [env] = useContextState<Env>('env')
  const servicesNr = Object.keys(config.services).length * machines.length
  return (
    <>
      <ContextItem
        onClick={() => {
          open(<AddMachineModal config={config} configName={configName} />)
        }}
        icon={<DuplicateIcon />}
      >
        Duplicate
      </ContextItem>
      <ContextItem
        onClick={() => {
          open(
            <EditJsonModal
              save
              label={`Edit ${configName}`}
              object={{ configName, config }}
              onChange={async (newConfig) => {
                const c = deepCopy(newConfig)
                for (const s in config.services) {
                  if (!c?.config.services?.[s]) {
                    if (!c.config.services) {
                      c.config.services = {}
                    }
                    c.config.services[s] = { $delete: true }
                  }
                }
                return client.call('update-machine-config', {
                  ...env,
                  ...c,
                  ignorePorts: true,
                })
              }}
            />
          )
        }}
        icon={<CurlyBracesIcon size="12px" />}
      >
        Edit JSON
      </ContextItem>
      <ContextDivider />
      <ContextItem
        onClick={() => {
          open(
            <Dialog>
              <Dialog.Label style={{ marginTop: 24 }}>
                Remove machine template
              </Dialog.Label>
              <Dialog.Body>
                <Text>
                  Are you sure you want ro remove <b>{configName}</b>?
                </Text>
                <Row style={{ marginTop: 12 }}>
                  <Badge color="text" style={{ marginRight: 8 }}>
                    {machines.length} active machine
                    {machines.length === 1 ? '' : 's'}
                  </Badge>
                  <Badge color="text">
                    {servicesNr} active service{servicesNr === 1 ? '' : 's'}
                  </Badge>
                </Row>
              </Dialog.Body>
              <Dialog.Buttons border>
                <Dialog.Cancel />
                <Dialog.Confirm
                  onConfirm={() => {
                    return client.call('update-machine-config', {
                      ...env,
                      configName,
                      config: { $delete: true },
                    })
                  }}
                />
              </Dialog.Buttons>
            </Dialog>
          )
        }}
        icon={<CloseIcon />}
      >
        Remove
      </ContextItem>
    </>
  )
}

const MachineConfig: FC<{
  configName: string
  config: MachineConfig
  machineStatus: any
  env: Env
}> = ({ configName, config, machineStatus, env }) => {
  const client = useClient()
  const [, setInfra] = useContextState<string>('infraSection')

  return (
    <Container space="32px">
      <RowSpaced>
        <Row>
          <Text
            style={{
              transition: 'color 0.25s',
              color: 'inherit',
              marginRight: 24,
            }}
            typo="title2"
          >
            {configName}
          </Text>
          <Status
            goodColor="green"
            running={machineStatus.amount - machineStatus.failing}
            unreachable={machineStatus.failing}
            deploying={machineStatus.deploying}
            type="machine"
          />
        </Row>

        <Row>
          <UpdateButton small machineConfigs={{ [configName]: config }} />

          <Button
            icon={<MoreIcon />}
            ghost
            onClick={useContextMenu(Actions, { config, configName })}
          />
          <Button
            color="lightaccent"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setInfra(configName)
            }}
            icon={EyeIcon}
          >
            Inspect
          </Button>
        </Row>
      </RowSpaced>
      <Text space typo="caption400">
        {config.description ||
          (configName === 'allServices'
            ? 'All services on a single machine, cannot be scaled to more then 1 instance'
            : '')}
      </Text>
      <Accordion>
        <Settings
          configName={configName}
          config={config}
          onChange={(config) => {
            const payload = {
              ...env,
              configName,
              config,
            }
            return client.call('update-machine-config', payload)
          }}
        />
        <Services
          onChange={(config) => {
            const payload = {
              ...env,
              configName,
              config,
            }
            return client.call('update-machine-config', payload)
          }}
          configName={configName}
          config={config}
        />
      </Accordion>
    </Container>
  )
}

export const Machines: FC<{ env: Env; envAdminHub: any }> = ({
  env,
  envAdminHub,
}) => {
  const { data: envData, checksum } = useQuery('env', env)

  const [filter, setFilter] = useContextState('filter', '')
  const { open } = useDialog()
  const config: { [key: string]: MachineConfig } = useMemo(() => {
    const c: { [key: string]: MachineConfig } =
      envData?.config?.machineConfigs || {}
    if (filter) {
      const filtered = deepCopy(c)
      for (const k in filtered) {
        const s = filtered[k].services
        for (const x in s) {
          if (!x.includes(filter)) {
            delete s[x]
          }
        }
        if (Object.keys(s).length === 0) {
          delete filtered[k]
        }
      }
      return filtered
    }
    return c
  }, [checksum, filter])

  const machineConfigs = []

  for (const key in config) {
    machineConfigs.push(
      <MachineConfig
        env={env}
        key={key}
        configName={key}
        config={config[key]}
        machineStatus={envData.machineStatus?.[key] ?? {}}
      />
    )
  }

  return (
    <Page>
      <RowSpaced>
        <Connections envAdminHub={envAdminHub} />
        <Row>
          <UpdateButton
            machineConfigs={envData?.config?.machineConfigs}
            checksum={checksum}
          />
          <Button
            ghost
            onClick={() => open(<AddMachineModal />)}
            icon={<AddIcon />}
          >
            Add machine template
          </Button>
          <Input
            value={filter}
            onChange={setFilter}
            type="text"
            style={{ width: 250, marginLeft: 16 }}
            icon={<SearchIcon />}
            placeholder="Filter by service name"
          />
        </Row>
      </RowSpaced>
      <Spacer space="32px" />
      {machineConfigs}
    </Page>
  )
}
