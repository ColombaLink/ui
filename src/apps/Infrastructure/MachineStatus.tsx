import React, { FC } from 'react'
import {
  Badge,
  CheckIcon,
  CloseIcon,
  LoadingIcon,
  ReplaceIcon,
  WarningIcon,
} from '~'
// 1 = ok, 2 = creating, 3 = rebooting, 4 = removing,

export const machineStatus = (status: number): string => {
  if (status === 0) {
    return 'Not ok'
  }

  if (status === 1) {
    return 'OK'
  }

  if (status === 2) {
    return 'Creating'
  }

  if (status === 3) {
    return 'Rebooting'
  }

  if (status === 4) {
    return 'Removing'
  }
}

const colors = {
  0: 'red',
  1: 'green',
  2: 'accent',
  3: 'accent',
  4: 'red',
}

const icons = {
  0: WarningIcon,
  1: CheckIcon,
  2: LoadingIcon,
  3: ReplaceIcon,
  4: CloseIcon,
}

export const MachineStatus: FC<{ status: number }> = ({ status }) => {
  return (
    <Badge icon={icons[status]} color={colors[status]}>
      {machineStatus(status)}
    </Badge>
  )
}
