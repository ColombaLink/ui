import React, { FC, useState } from 'react'
import { Text, Select, styled, SelectOption, Accept } from '~'
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

  const selectOptions: SelectOption[] =
    dists[service.name]?.map((v) => {
      return {
        label: v.version,
        value: v.checksum,
      }
    }) || []
  const [newVersion, updateVersion] = useState<string>()

  return (
    <styled.div style={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <Select
        label={<Text style={{ marginRight: 16 }}>{service.name}</Text>}
        value={service.distChecksum}
        options={selectOptions}
        onChange={(v) => {
          if (alwaysAccept) {
            // go go go
            // onChange
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
  )
}
