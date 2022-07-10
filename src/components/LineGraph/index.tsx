import React, { CSSProperties, ReactNode, FC } from 'react'

type LineGraphProps = {
  data?: number[]
  style?: CSSProperties
  label?: ReactNode
  large?: boolean
}

export const LineGraph: FC<LineGraphProps> = ({
  data,
  style,
  label,
  large,
}) => {
  return (
    <div
      style={{
        fontSize: large ? 200 : 17,
      }}
    >
      nice graph...
    </div>
  )
}
