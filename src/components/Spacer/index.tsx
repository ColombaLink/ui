import { CSSProperties, FC } from 'react'

type SpacerProps = {
  style?: CSSProperties
}

export const Spacer: FC<SpacerProps> = ({ style }) => {
  return <div style={{ height: 12, ...style }} />
}
