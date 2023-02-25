/* eslint-disable react/no-unused-prop-types */
import React, {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useRef,
  FunctionComponent,
} from 'react'
import { border, color, renderOrCreateElement, spaceToPx, Color } from '~/utils'
import { styled, Style } from 'inlines'
import { LoadingIcon } from '~/icons'
import { Text } from '../Text'
import { Space, Key, Icon } from '~/types'
import { useKeyUp } from '~'

export type ButtonProps = {
  children?: ReactNode | ReactNode[]
  disabled?: boolean
  color?: Color
  ghost?: boolean
  light?: boolean
  large?: boolean
  fill?: boolean // TODO: add this on inputs etc as well
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  loading?: boolean
  onClick?: MouseEventHandler | boolean | (() => void)
  onPointerDown?: MouseEventHandler
  outline?: boolean
  style?: Style
  space?: Space
  textAlign?: 'center' | 'right' | 'left'
  actionKeys?: Key[]
}

export const getButtonStyle = (props, isButton = !!props.onClick) => {
  const { disabled, ghost, color: colorProp = 'accent', outline, light } = props

  const isLight = light || ghost || outline
  const style: Style = {
    transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
    backgroundColor: ghost || outline ? null : color(colorProp, null, isLight),
    color: color(colorProp, 'contrast', isLight),
    border: border(outline && 1, colorProp, 'border', light),
    opacity: disabled ? 0.6 : 1,
  }

  if (isButton) {
    style.cursor = 'pointer'
    style['@media (hover:hover)'] = {
      '&:hover': {
        backgroundColor: color(colorProp, 'hover', isLight),
        cursor: disabled ? 'not-allowed' : 'pointer',
      },
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
    large,
    loading,
    onClick,
    onPointerDown,
    space,
    style,
    //   weight,
    textAlign = 'left',
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const buttonElem = useRef<HTMLElement>(null)
  const extendedOnClick = useCallback(
    async (e: any) => {
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
        // @ts-ignore
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
          !children && large
            ? '16px'
            : !children
            ? '8px'
            : large
            ? '8px 16px'
            : '6px 12px',
        borderRadius: large ? 8 : 4,
        width: fill ? '100%' : null,
        maxHeight: large ? 40 : '',
        position: 'relative',
        marginBottom: space ? spaceToPx(space) : null,
        // height: large ? 48 : 40,
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
            textAlign === 'left' && fill
              ? 'flex-start'
              : textAlign === 'center' && fill
              ? 'center'
              : textAlign === 'right' && fill
              ? 'flex-end'
              : fill
              ? 'space-between'
              : 'center',
        }}
      >
        {icon &&
          renderOrCreateElement(
            icon,
            children || iconRight
              ? {
                  style: { marginRight: 8, minWidth: 16 },
                }
              : null
          )}
        <Text
          color="inherit"
          //  weight={weight !== undefined ? weight : large ? 600 : 500}
          typo={large ? 'subtext600' : 'body500'}
        >
          {children}
        </Text>
        {iconRight &&
          renderOrCreateElement(
            iconRight,
            children || icon
              ? {
                  style: { marginLeft: 8, minWidth: 16 },
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
