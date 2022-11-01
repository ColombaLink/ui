import React, { CSSProperties, FC, ReactNode, useState } from 'react'

type DraggableListWrapperProps = {
  children?: ReactNode
  style?: CSSProperties
}

export const DraggableListWrapper: FC<DraggableListWrapperProps> = ({
  children,
  style,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)

  const [list, setList] = useState(arrayChildren)

  console.log(arrayChildren)

  return <div>{children}</div>
}
