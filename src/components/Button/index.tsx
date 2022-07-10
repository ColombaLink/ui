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
import { border, color, renderOrCreateElement, spaceToPx } from '~/utils'
import { styled } from 'inlines'
import { LoadingIcon } from '~/icons'
import { Text } from '../Text'
import { Space, AccentColor, Key } from '~/types'
import { useKeyUp } from '~'

export type ButtonProps = {
  children?: ReactNode
  disabled?: boolean
  color?: AccentColor
  ghost?: boolean
  light?: boolean
  large?: boolean
  fill?: boolean // TODO: add this on inputs etc as well
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  loading?: boolean
  onClick?: MouseEventHandler
  outline?: boolean
  style?: CSSProperties
  space?: Space
  textAlign?: 'center' | 'right' | 'left'
  actionKeys?: Key[]
}

export const getBtnColors = (props) => {
  const { ghost, color: colorProp = 'accent', outline, light } = props
  const isLight = light || ghost || outline
  return {
    background: ghost || outline ? null : color(colorProp, null, isLight),
    contrast: color(colorProp, 'contrast', isLight),
    hover: color(colorProp, 'hover', isLight),
    active: color(colorProp, 'active', isLight),
    border: border(outline && 1, colorProp, 'border', light),
  }
}

export const Button: FC<ButtonProps> = (props) => {
  let {
    children,
    disabled,
    iconLeft,
    iconRight,
    loading,
    onClick = () => {},
    actionKeys,
    style,
    space,
    large,
    fill,
    textAlign = 'left',
  } = props
  const [isLoading, setIsLoading] = useState(false)
  const buttonElem = useRef<HTMLElement>(null)
  const colors = getBtnColors(props)
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
        await onClick(e)
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
    disabled = true
  }

  return (
    <styled.button
      ref={buttonElem}
      disabled={disabled}
      onClick={onClick}
      style={{
        transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
        padding:
          !children && large
            ? '16px'
            : !children
            ? '8px'
            : large
            ? '4px 16px'
            : '4px 8px',
        backgroundColor: colors.background,
        color: colors.contrast,
        border: colors.border,
        borderRadius: 4,
        width: fill ? '100%' : null,
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        '&:hover': {
          backgroundColor: colors.hover,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        '&:active': {
          backgroundColor: colors.active,
        },
        marginBottom: space ? spaceToPx(space) : null,
        height: large ? 48 : null,
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
        {iconLeft &&
          renderOrCreateElement(iconLeft, {
            style: children || iconRight ? { marginRight: 8 } : null,
          })}
        <Text color="inherit">{children}</Text>
        {iconRight &&
          renderOrCreateElement(iconRight, {
            style: children || iconLeft ? { marginLeft: 8 } : null,
          })}
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
