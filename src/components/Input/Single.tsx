import React, { FC, RefObject } from 'react'
import { Style } from '~'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  style?: Style
}

export const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ...props
}) => {
  // if (type === 'color') {
  //   return <ColorInput inputRef={inputRef} {...props} />
  // }

  return (
    <input
      {...props}
      type={type}
      ref={inputRef}
      pattern={pattern}
      style={{
        width: '100%',
        userSelect: 'text',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        ...style,
      }}
    />
  )
}
