import { Color, Size } from '../../types'
import React, { FC } from 'react'
// For the playground

export type IconProps = {
  color?: Color
  size?: Size
}

export const Icon: FC<{}> = () => {
  return <div>Icon</div>
}
