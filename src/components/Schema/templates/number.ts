import { TwentyThreeIcon, DashIcon } from '~/icons'
import { Field } from '../types'

export const numbers: { [key: string]: Field } = {
  bytes: {
    label: 'Bytes',
    color: 'babyblue',
    description: 'Bytes stored as an integer',
    icon: TwentyThreeIcon,
    schema: {
      type: 'int',
      meta: {
        format: 'bytes',
      },
    },
  },
  progress: {
    label: 'Progress',
    color: 'border',
    description: 'Progress',
    icon: DashIcon,
    schema: {
      type: 'int',
      meta: {
        format: 'progress',
      },
    },
  },
}
