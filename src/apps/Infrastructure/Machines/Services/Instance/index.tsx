import React, { FC, useMemo } from 'react'
import {
  Card,
  ChevronDownIcon,
  Text,
  useContextState,
  ChevronRightIcon,
  Row,
} from '~'
import { ServiceInstance } from '@based/machine-config'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { hash } from '@saulx/hash'
import { deepMerge } from '@saulx/utils'
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

  const expandKey = useMemo(
    () => hash(service.name + index).toString(16),
    [service.name, index]
  )

  const [expanded, setExpanded] = useContextState('expanded')

  const onChangeWrapped = (values) => {
    onChange({
      services: {
        [service.name]: {
          instances: {
            [index]: deepMerge(instance, values),
          },
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
            if (!expanded[expandKey]) {
              expanded[expandKey] = true
            } else {
              delete expanded[expandKey]
            }
            setExpanded(expanded)
          }}
        >
          {expanded[expandKey] ? <ChevronDownIcon /> : <ChevronRightIcon />}
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
      {expanded[expandKey] ? (
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
