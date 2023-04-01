import React, { FC, useState } from 'react'
import { Card, ChevronDownIcon, Text, ChevronRightIcon, Row } from '~'
import { ServiceInstance } from '@based/machine-config'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { deepMerge, deepCopy } from '@saulx/utils'
import { RemoveButton } from './RemoveButton'
import {
  DiscoverSettings,
  HubSettings,
  DbSettings,
  DefaultSettings,
} from './Settings'

export const Instance: FC<{
  instance: ServiceInstance
  index: string
  service: ServiceNamed
  alwaysAccept?: boolean
  onChange: OnMachineConfigChange
}> = ({ index, instance, service, onChange, alwaysAccept }) => {
  let type: string

  if (service.name === '@based/env-hub-discovery') {
    type = 'discover'
  } else if (
    service.name === '@based/env-hub' ||
    service.name === '@based/env-admin-hub'
  ) {
    type = 'hub'
  } else if (
    service.name === '@based/env-db' ||
    service.name === '@based/env-metrics-db' ||
    service.name === '@based/env-config-db'
  ) {
    type = 'db'
  }

  const [expanded, setExpanded] = useState(false)

  const onChangeWrapped: OnMachineConfigChange = (values) => {
    const instances = deepCopy(service.instances)
    instances[index] = deepMerge(service.instances[index], values)
    onChange({
      services: {
        [service.name]: {
          instances,
        },
      },
    })
  }

  return (
    <Card
      style={{
        minWidth: '100%',
        marginBottom: 16,
      }}
      label={
        <Row
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            setExpanded(!expanded)
          }}
        >
          {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          <Text style={{ marginLeft: 8 }} typo="body600">
            {service.name} #{index}
          </Text>
        </Row>
      }
      topRight={
        <RemoveButton
          index={index}
          service={service}
          onChange={onChange}
          alwaysAccept={alwaysAccept}
        />
      }
    >
      {expanded ? (
        type === 'discover' ? (
          <DiscoverSettings
            alwaysAccept={alwaysAccept}
            onChange={onChangeWrapped}
            instance={instance}
          />
        ) : type === 'hub' ? (
          <HubSettings
            alwaysAccept={alwaysAccept}
            onChange={onChangeWrapped}
            instance={instance}
          />
        ) : type === 'db' ? (
          <DbSettings
            alwaysAccept={alwaysAccept}
            onChange={onChangeWrapped}
            instance={instance}
            serviceName={service.name}
          />
        ) : (
          <DefaultSettings
            alwaysAccept={alwaysAccept}
            onChange={onChangeWrapped}
            instance={instance}
          />
        )
      ) : null}
    </Card>
  )
}
