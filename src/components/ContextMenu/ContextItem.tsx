import React, {
  ReactNode,
  CSSProperties,
  FunctionComponent,
  createElement,
  FC,
} from 'react'
import { Text } from '~/components/Text'
import { Color, Icon, PropsEventHandler } from '~/types'
import { Style, styled } from 'inlines'
import { removeOverlay } from '../Overlay'
import { color, renderOrCreateElement } from '~/utils'

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  '&:active': {
    backgroundColor: color('lightbackground2:contrast'),
  },
  '&:focus': {
    backgroundColor: color('lightbackground2:contrast'),
  },
})

export type ContextItemProps = {
  style?: Style
  color?: Color
  onClick?: PropsEventHandler
  icon?: FunctionComponent<Icon>
  iconRight?: FunctionComponent<Icon>
  inset?: boolean
  noFocus?: boolean
  tabIndex?: number
  children?: ReactNode
}

export const ContextDivider = styled('div', {
  marginTop: 4,
  borderTop: `1px solid ${color('border')}`,
  marginBottom: 4,
})

export const ContextItem: FC<ContextItemProps> = ({
  onClick,
  style,
  color,
  children,
  icon,
  inset,
  tabIndex = 0,
  noFocus,
  iconRight,
}) => {
  if (onClick) {
    const onClickOriginal = onClick
    // will become a  hook (a useCallback)
    // @ts-ignore - this is a hack to make the onClick work, async is very important
    onClick = async (e) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        if (!(await onClickOriginal(e))) {
          removeOverlay()
        }
      } catch (err) {
        console.error(err)
        // send animation
      }
    }
  }

  let child
  if (icon) {
    child = (
      <Text color={color} style={{ display: 'flex', alignItems: 'center' }}>
        {renderOrCreateElement(icon, {
          size: 16,
          style: { marginRight: 8 },
        })}
        {children}
      </Text>
    )
  } else {
    child = (
      <Text color={color} style={inset ? { paddingLeft: 24 } : null}>
        {children}
      </Text>
    )
  }

  if (noFocus) {
    return (
      <StyledContextItem onClick={onClick} style={style}>
        {child}
        {renderOrCreateElement(icon, {
          size: 16,
          style: { marginLeft: 8 },
        })}
      </StyledContextItem>
    )
  }

  return (
    <StyledContextItem
      data-aviato-context-item
      tabIndex={tabIndex}
      onMouseEnter={({ currentTarget }) => currentTarget.focus()}
      onMouseLeave={({ currentTarget }) => currentTarget.blur()}
      onClick={onClick}
      style={style}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter') {
                if (onClick) {
                  onClick(e)
                }
              }
            }
          : null
      }
    >
      {child}
      {renderOrCreateElement(icon, {
        size: 16,
        style: { marginLeft: 8 },
      })}
    </StyledContextItem>
  )
}
