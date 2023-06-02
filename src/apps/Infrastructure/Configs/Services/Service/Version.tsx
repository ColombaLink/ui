import React, { FC, useState } from 'react'
import { Text, Select, styled, SelectOption, Accept, Row } from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { useQuery } from '@based/react'
import { prettyDate } from '@based/pretty-date'

const Info: FC<{
  dist: {
    version: string
    checksum: string
    releaseNotes?: string
    releaseDate?: number
  }
}> = ({ dist }) => {
  return (
    <Row>
      <Text typography="body600">{dist.version}</Text>
      <Text
        typography="body400"
        style={{
          marginLeft: 8,
        }}
      >
        {dist.releaseNotes ? dist.releaseNotes.slice(0, 30) : ''}
      </Text>
    </Row>
  )
}

export const Version: FC<{
  service: ServiceNamed
  alwaysAccept: boolean
  onChange: OnMachineConfigChange
}> = ({ service, alwaysAccept, onChange }) => {
  const { data: dists = {} } = useQuery<{
    [key: string]: any[]
  }>(
    'dists',
    {},
    {
      persistent: true,
    }
  )

  let foundCurrent = false
  const selectOptions: SelectOption[] =
    dists[service.name]?.map((dist) => {
      if (service.distChecksum === dist.checksum) {
        foundCurrent = true
      }
      return {
        label: <Info dist={dist} />,
        value: dist.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()

  if (!foundCurrent && service.distChecksum) {
    selectOptions.push({
      label: (
        <Row>
          <Text color="red" style={{ marginRight: 8 }} typography="body600">
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
