import { MachineConfig } from '@based/machine-config'
import React, { FC } from 'react'
import { useDistUpdates } from './useDistUpdates'
import { Button, Badge } from '~'

export const UpdateButton: FC<{
  machineConfigs?: {
    [key: string]: MachineConfig | Pick<MachineConfig, 'services'>
  }
  checksum?: number
}> = ({ machineConfigs, checksum }) => {
  const updates = useDistUpdates(machineConfigs || {}, checksum)
  return updates.length ? (
    <Button
      style={{ marginRight: 8 }}
      onClick={() => {}}
      ghost
      color="accent"
      icon={
        <Badge color="accent" style={{ marginRight: 8 }}>
          {updates.length}
        </Badge>
      }
    >
      Upgrade{updates.length > 1 ? 's' : ''} available
    </Button>
  ) : null
}
