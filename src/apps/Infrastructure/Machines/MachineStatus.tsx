import React, { FC } from 'react'
import {
  Badge,
  CheckIcon,
  Row,
  CloseIcon,
  Color,
  LoadingIcon,
  ReplaceIcon,
  WarningIcon,
  border,
} from '~'
import { useQuery } from '@based/react'

// 1 = ok, 2 = creating, 3 = rebooting, 4 = removing,

const MachineStats: FC<{
  cpu: number
  memory: number
  machineTypeValue: string
}> = ({ machineTypeValue = 't3.medium', cpu, memory }) => {
  const { data: machineTypes = [] } = useQuery(
    'machine-types',
    {},
    {
      persistent: true,
    }
  )
  const machineType = machineTypes.find((m) => m.value === machineTypeValue)
  let memoryParsed = memory * (machineType?.memory ?? 0)
  let memoryUnit = 'MiB'

  if (memoryParsed > 1024) {
    memoryParsed = memoryParsed / 1024
    memoryUnit = 'GiB'
  }

  const color: Color = 'accent'

  return (
    <>
      <Badge
        color={color}
        style={{
          justifyContent: 'center',
          width: 70,
          marginLeft: 32,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeft: border(1),
        }}
      >
        Cpu {Math.min(99, ~~(cpu * 100))}%
      </Badge>
      <Badge
        color={color}
        style={{
          width: 68,
          justifyContent: 'center',
          borderLeft: border(1),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginRight: 8,
        }}
      >
        {~~memoryParsed} {memoryUnit}
      </Badge>
    </>
  )
}

export const machineStatus = (status: number): string => {
  // 1 = ok, 2 = creating, 3 = rebooting, 4 = removing,
  if (status === 0) {
    return 'Not OK'
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

  if (status === 5) {
    return 'Resizing'
  }
}

const colors = {
  0: 'red',
  1: 'green',
  2: 'accent',
  3: 'accent',
  4: 'red',
  5: 'accent',
}

const icons = {
  0: WarningIcon,
  1: CheckIcon,
  2: LoadingIcon,
  3: ReplaceIcon,
  4: CloseIcon,
  5: LoadingIcon,
}

export const MachineStatus: FC<{
  status: number
  cpu: number
  memory: number
  machineTypeValue: string
}> = ({ status, ...props }) => {
  return (
    <Row>
      <Badge icon={icons[status]} color={colors[status]}>
        {machineStatus(status)}
      </Badge>
      {status === 1 ? <MachineStats {...props} /> : null}
    </Row>
  )
}
