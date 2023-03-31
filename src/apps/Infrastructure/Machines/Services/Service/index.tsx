import { MachineConfig, Machine } from '@based/machine-config'
import React, { FC, ReactNode, useState } from 'react'
import {
  Text,
  Button,
  AddIcon,
  Select,
  MoreIcon,
  useContextMenu,
  RowSpaced,
  Row,
  RowEnd,
  styled,
  border,
  SelectOption,
  Accept,
} from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { Instance } from '../Instance'
import { UpdateButton } from '../../UpdateButton'
import { useQuery } from '@based/react'
import { Actions } from './Actions'
import { useAddInstances } from './useAddInstances'

export const Service: FC<{
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
  // TODO put actions
  console.info(machines, 'put actions')
  const instances: ReactNode[] = []
  for (const x in service.instances) {
    instances.push(
      <Instance
        alwaysAccept={alwaysAccept}
        onChange={onChange}
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

  const [newInstances, acceptNewInstanceButton, addInstance] = useAddInstances(
    service,
    alwaysAccept,
    onChange
  )

  const selectOptions: SelectOption[] =
    dists[service.name]?.map((v) => {
      return {
        label: v.version,
        value: v.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()
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
            onChange={(v) => {
              if (alwaysAccept) {
                // go go go
                // onChange()
              } else {
                updateVersion(v as string)
              }
            }}
          />
          {newVersion && !alwaysAccept ? (
            <Accept
              style={{ flexShrink: 0 }}
              onCancel={() => {
                updateVersion('')
              }}
              onAccept={() => {
                // go go go
              }}
            />
          ) : null}
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
          <Button color="text" icon={<AddIcon />} onClick={addInstance} ghost />
        </Row>
      </RowSpaced>
      <styled.div
        style={{
          marginTop: 24,
        }}
      >
        {instances}
        {newInstances}
      </styled.div>
      <RowEnd style={{ marginTop: 24 }}>
        {acceptNewInstanceButton}
        {children}
      </RowEnd>
    </styled.div>
  )
}
