import React, {
  createElement,
  CSSProperties,
  FC,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react'
import { color as c } from '~/utils'
import { styled } from 'inlines'
import { LoadingIcon } from '~/icons'
import { Text } from '../Text'

export const Button: FC<{
  action: boolean
  children: ReactNode
  disabled: boolean
  error: boolean
  ghost: boolean
  iconLeft: FunctionComponent<any>
  iconRight: FunctionComponent<any>
  light: boolean
  loading: boolean
  onClick: MouseEventHandler
  outline: boolean
  style: CSSProperties
}> = ({
  action = false,
  children,
  disabled = false,
  error = false,
  ghost = false,
  iconLeft,
  iconRight,
  light = false,
  loading = false,
  onClick,
  outline = false,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const colorBase = error ? 'Error' : action ? 'Action' : 'Primary'
  let color, bg, borderColor, hoverBg

  if (ghost) {
    color = `${colorBase}Main`
    hoverBg = `${colorBase}LightHover`
  } else if (outline) {
    color = `${colorBase}Main`
    borderColor = light ? `${colorBase}LightOutline` : `${colorBase}MainOutline`
    bg = `${colorBase}Light`
    hoverBg = `${bg}Hover`
  } else if (light) {
    bg = `${colorBase}Light`
    color = `${bg}Contrast`
    hoverBg = `${bg}Hover`
  } else {
    bg = `${colorBase}Main`
    color = `${colorBase}MainContrast`
    hoverBg = `${bg}Hover`
  }

  if (onClick) {
    const onClickOrginal = onClick
    onClick = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      const t = e.currentTarget as HTMLInputElement
      let isSet = false
      const timer = setTimeout(() => {
        if (!isSet) {
          setIsLoading(true)
        }
      }, 100)
      try {
        await onClickOrginal(e)
      } catch (e) {
        console.error(`Unhandled error from async click "${e.message}"`)
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
    }
  }

  if (isLoading) {
    loading = true
  }

  if (loading) {
    disabled = true
  }

  return (
    <styled.button
      disabled={disabled}
      onClick={onClick}
      style={{
        transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
        padding: '4px 8px',
        color: c(color),
        backgroundColor: c(bg),
        border: `1px solid ${borderColor ? c(borderColor) : 'transparent'}`,
        borderRadius: 4,
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        '&:hover': {
          backgroundColor: c(hoverBg),
        },
        ...style,
      }}
    >
      <div
        style={{
          visibility: loading ? 'hidden' : null,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {iconLeft &&
          createElement(iconLeft, {
            size: 16,
            style: children || iconRight ? { marginRight: 8 } : null,
          })}
        <Text color="inherit">{children}</Text>
        {iconRight &&
          createElement(iconRight, {
            size: 16,
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
