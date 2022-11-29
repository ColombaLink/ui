/* eslint-disable react/no-unused-prop-types */
import React, {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react'
import { border, color, renderOrCreateElement, spaceToPx, Color } from '~/utils'
import { styled, Style } from 'inlines'
import { LoadingIcon } from '~/icons'
import { Text } from '../Text'
import { Space, Key } from '~/types'
import { useKeyUp } from '~'

export type ButtonProps = {
  children?: ReactNode
  disabled?: boolean
  color?: Color
  ghost?: boolean
  light?: boolean
  small?: boolean
  fill?: boolean // TODO: add this on inputs etc as well
  icon?: FC | ReactNode
  iconRight?: FC | ReactNode
  loading?: boolean
  onClick?: MouseEventHandler
  onPointerDown?: MouseEventHandler
  outline?: boolean
  style?: CSSProperties
  space?: Space
  textAlign?: 'center' | 'right' | 'left'
  actionKeys?: Key[]
}

export const getButtonStyle = (props, isButton = !!props.onClick) => {
  const { disabled, ghost, color: colorProp = 'accent', outline, light } = props

  const isLight = light || ghost || outline
  const style = {
    transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
    backgroundColor: ghost || outline ? null : color(colorProp, null, isLight),
    color: color(colorProp, 'contrast', isLight),
    border: border(outline && 1, colorProp, 'border', light),
    opacity: disabled ? 0.6 : 1,
  } as Style

  if (isButton) {
    style.cursor = 'pointer'
    style['&:hover'] = {
      backgroundColor: color(colorProp, 'hover', isLight),
      cursor: disabled ? 'not-allowed' : 'pointer',
    }
    style['&:active'] = {
      backgroundColor: color(colorProp, 'active', isLight),
    }
  }

  return style
}

export const Button: FC<ButtonProps> = (props) => {
  let {
    actionKeys,
    children,
    fill,
    icon,
    iconRight,
    small,
    loading,
    onClick,
    onPointerDown,
    space,
    style,
    textAlign = 'left',
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const buttonElem = useRef<HTMLElement>(null)
  const extendedOnClick = useCallback(
    async (e) => {
      e.stopPropagation()
      e.preventDefault()
      const t = buttonElem.current
      let isSet = false
      const timer = setTimeout(() => {
        if (!isSet) {
          setIsLoading(true)
        }
      }, 100)
      try {
        await onClick?.(e)
      } catch (e) {
        console.error(`Error from async click "${e.message}"`)
        t.style.transform = 'translateX(-10px)'
        setTimeout(() => {
          t.style.transform = 'translateX(10px)'
          setTimeout(() => {
            t.style.transform = 'translateX(0px)'
          }, 100)
        }, 100)
      }
      isSet = true
      setIsLoading(false)
      clearTimeout(timer)
    },
    [onClick]
  )

  if (actionKeys) {
    const timeRef = useRef<any>()
    useEffect(() => {
      return () => {
        clearTimeout(timeRef.current)
      }
    }, [])
    const onKeyUp = useCallback(
      (event: any) => {
        extendedOnClick(event)
      },
      [extendedOnClick, timeRef]
    )
    useKeyUp(onKeyUp, buttonElem, actionKeys)
  }

  if (isLoading) {
    loading = true
  }

  if (loading) {
    props.disabled = true
  }

  return (
    <styled.button
      ref={buttonElem}
      disabled={props.disabled}
      onClick={onClick && extendedOnClick}
      onPointerDown={onPointerDown}
      style={{
        padding:
          !children && small
            ? '16px'
            : !children
            ? '8px'
            : small
            ? '4px 12px'
            : '8px 16px',
        borderRadius: small ? 4 : 8,
        width: fill ? '100%' : null,
        position: 'relative',
        marginBottom: space ? spaceToPx(space) : null,
        // height: small ? 48 : null,
        ...getButtonStyle(props, true),
        ...style,
      }}
    >
      <div
        style={{
          visibility: loading ? 'hidden' : null,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            textAlign === 'left'
              ? 'flex-start'
              : textAlign === 'center'
              ? 'center'
              : textAlign === 'right'
              ? 'flex-end'
              : 'flex-start',
        }}
      >
        {icon &&
          renderOrCreateElement(
            icon,
            children || iconRight
              ? {
                  style: { marginRight: 8 },
                }
              : null
          )}
        <Text color="inherit" weight={small ? 500 : 600}>
          {children}
        </Text>
        {iconRight &&
          renderOrCreateElement(
            iconRight,
            children || icon
              ? {
                  style: { marginLeft: 8 },
                }
              : null
          )}
      </div>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate3d(-50%,-50%,0)',
          }}
        >
          <LoadingIcon />
        </div>
      )}
    </styled.button>
  )
}
