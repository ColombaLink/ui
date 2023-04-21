import React, { FC, RefObject, FunctionComponent, ReactNode } from 'react'
import { Style, styled, color, Icon, renderOrCreateElement } from '~'

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  style?: Style
  ghost?: boolean
  focused?: boolean
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
}

export const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ghost,
  focused,
  icon,
  iconRight,
  ...props
}) => {
  // if (type === 'color') {
  //   return <ColorInput inputRef={inputRef} {...props} />
  // }

  return (
    <styled.div
      style={{
        position: 'relative',
        color: color('text'),
        border: ghost
          ? `2px solid transparent`
          : focused
          ? `2px solid rgba(44, 60, 234, 0.2)`
          : `2px solid transparent`,
        borderRadius: 10,
      }}
    >
      {icon
        ? renderOrCreateElement(icon, {
            style: {
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              pointerEvents: 'none',
            },
          })
        : null}

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
      {iconRight
        ? renderOrCreateElement(iconRight, {
            style: {
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              pointerEvents: 'none',
            },
          })
        : null}
    </styled.div>
  )
}
