import React, { CSSProperties, FC, ReactNode } from 'react'

type DraggableListWrapperProps = {
  children?: FC | ReactNode
  style?: CSSProperties
}

export const DraggableListWrapper: FC<DraggableListWrapperProps> = ({
  children,
  style,
}) => {
  return <div>{children}</div>
}
