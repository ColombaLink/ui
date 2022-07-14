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

  console.log(list)

  // add keys or ids
  // setList(list.map((item, index) => (item.props.id = index)))

  console.log(list)

  return <div>{children}</div>
}
