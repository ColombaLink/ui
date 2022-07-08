import { Color } from '../../types'
import React, { FC } from 'react'
// For the playground

export type IconProps = {
  color?: Color | string
  size?: 10 | 12 | 14 | 16 | 20 | 32
}

export const Icon: FC<{}> = () => {
  return <div>Icon</div>
}
