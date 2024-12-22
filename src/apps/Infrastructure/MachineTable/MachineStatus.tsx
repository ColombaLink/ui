import { FC, ReactNode } from 'react'
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
  StopIcon,
} from '~'
import { prettyNumber } from '@based/pretty-number'
import { TableCustomComponent } from '~/components/Table/types'

// 1 = ok, 2 = creating, 3 = rebooting, 4 = removing,

export const MachineStats: FC<{
  cpu: number
  memory: number
}> = ({ cpu, memory }) => {
  const color: Color = 'accent'
  return (
    <>
      <Badge
        color={color}
        style={{
          justifyContent: 'center',
          width: 70,
          // marginLeft: 32,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderLeft: border(1),
        }}
      >
        Cpu {cpu.toFixed()}%{/* Cpu {Math.min(99, ~~(cpu * 100)).toFixed()}% */}
      </Badge>
      <Badge
        color={color}
        style={{
          justifyContent: 'center',
          borderLeft: border(1),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          marginRight: 8,
        }}
      >
        {prettyNumber(memory, 'number-bytes')}
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

  if (status === 6) {
    return 'Stopped'
  }

  if (status === 7) {
    return 'In danger'
  }
}

const colors = {
  0: 'red',
  1: 'green',
  2: 'accent',
  3: 'accent',
  4: 'red',
  5: 'accent',
  6: 'accent',
  7: 'yellow',
} as const

const icons = {
  0: WarningIcon,
  1: CheckIcon,
  2: LoadingIcon,
  3: ReplaceIcon,
  4: CloseIcon,
  5: LoadingIcon,
  6: StopIcon,
  7: WarningIcon,
} as const

export const StatusBadge: FC<{
  children?: ReactNode
  status: number
  onClick?: (e: MouseEvent) => void
}> = ({ status, onClick, children }) => {
  return (
    <Badge onClick={onClick} icon={icons[status]} color={colors[status]}>
      {children ?? machineStatus(status)}
    </Badge>
  )
}

export const Status: TableCustomComponent<any> = ({
  data,
  context,
  rowIndex,
}) => {
  const status = data.status
  return <StatusBadge status={status} />
}

export const MachineStatus: TableCustomComponent<any> = ({ data }) => {
  return (
    <Row
      style={{
        width: 200,
      }}
    >
      {data.stats ? (
        <MachineStats memory={data.stats.memory} cpu={data.stats.cpu} />
      ) : null}
    </Row>
  )
}
