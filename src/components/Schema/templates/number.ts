import { TwentyThreeIcon, DashIcon, CalculatorIcon, IntegerIcon } from '~/icons'
import { Field } from '../types'

export const numbers: { [key: string]: Field } = {
  number: {
    label: 'Number',
    color: 'lightsailorblue',
    description: 'Numbers you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'number' },
  },
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
  float: {
    label: 'Float',
    color: 'lightsailorblue',
    description: 'Any number',
    icon: CalculatorIcon,
    schema: { type: 'float' },
  },
  int: {
    label: 'Integer',
    color: 'lightsailorblue',
    description: 'A whole number',
    icon: IntegerIcon,
    schema: { type: 'int' },
  },
}
