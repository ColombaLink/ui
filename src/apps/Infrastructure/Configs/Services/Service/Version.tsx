import React, { FC, useState } from 'react'
import { Text, Select, styled, SelectOption, Accept, Row } from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { useQuery } from '@based/react'

export const Version: FC<{
  service: ServiceNamed
  alwaysAccept: boolean
  onChange: OnMachineConfigChange
}> = ({ service, alwaysAccept, onChange }) => {
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

  let foundCurrent = false
  const selectOptions: SelectOption[] =
    dists[service.name]?.map((v) => {
      if (service.distChecksum === v.checksum) {
        foundCurrent = true
      }

      return {
        label: v.version,
        value: v.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()

  if (!foundCurrent && service.distChecksum) {
    selectOptions.push({
      label: (
        <Row>
          <Text color="red" style={{ marginRight: 8 }} typo="body600">
            Detached
          </Text>
          {service.distChecksum.slice(-6)}
        </Row>
      ),
      value: service.distChecksum,
    })
  }

  return (
    <styled.div style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <Select
        label={<Text style={{ marginRight: 16 }}>{service.name}</Text>}
        value={service.distChecksum}
        options={selectOptions}
        onChange={(v) => {
          if (alwaysAccept) {
            onChange({
              services: {
                [service.name]: {
                  distChecksum: newVersion,
                },
              },
            })
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
            onChange({
              services: {
                [service.name]: {
                  distChecksum: newVersion,
                },
              },
            })
            updateVersion('')
          }}
        />
      ) : null}
    </styled.div>
  )
}
