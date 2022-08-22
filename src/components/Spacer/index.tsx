import React, { CSSProperties, FC } from 'react'
import { Space } from '~/types'
import { spaceToPx } from '~/utils'

type SpacerProps = {
  space?: Space
  style?: CSSProperties
}

export const Spacer: FC<SpacerProps> = ({ space = 12, style }) => {
  return <div style={{ height: spaceToPx(space), ...style }}></div>
}
