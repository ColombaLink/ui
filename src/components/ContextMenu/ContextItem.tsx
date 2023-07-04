import React, {
  ReactNode,
  FunctionComponent,
  FC,
  useState,
  useEffect,
} from 'react'
import { removeOverlay } from '../Overlay'
import {
  styled,
  Style,
  Text,
  color,
  renderOrCreateElement,
  Color,
  Icon,
  PropsEventHandler,
  LoadingIcon,
  WarningIcon,
} from '~'

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
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
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
  color: colorProps,
  children,
  icon,
  inset,
  tabIndex = 0,
  noFocus,
  iconRight,
}) => {
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)

  if (onClick) {
    const onClickOriginal = onClick
    // @ts-ignore - this is a hack to make the onClick work, async is very important
    onClick = async (e) => {
      setErrored(false)
      e.preventDefault()
      e.stopPropagation()
      setLoading(true)
      try {
        if (!(await onClickOriginal(e))) {
          removeOverlay()
        }
      } catch (err) {
        console.error(err)
        setErrored(true)
      }
      setLoading(false)
    }
  }

  let child: ReactNode

  if (icon) {
    child = (
      <Text
        color={colorProps}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {renderOrCreateElement(
          errored && icon ? (
            <WarningIcon color="red" />
          ) : loading && icon ? (
            <LoadingIcon />
          ) : (
            icon
          ),
          {
            size: 16,
            style: { marginRight: 8 },
          }
        )}
        {children}
      </Text>
    )
  } else {
    child = (
      <Text color={colorProps} style={inset ? { paddingLeft: 24 } : null}>
        {loading && !icon ? 'processing...' : children}
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
      {renderOrCreateElement(iconRight, {
        size: 16,
        style: { marginLeft: 8 },
      })}
    </StyledContextItem>
  )
}
