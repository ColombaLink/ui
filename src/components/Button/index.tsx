import React, {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react'
import { color as c, renderOrCreateElement, spaceToPx } from '~/utils'
import { styled } from 'inlines'
import { LoadingIcon } from '~/icons'
import { Text } from '../Text'
import { Space, Color } from '~/types'
import { isCapitalised } from '~/utils/isCapitalised'

export type ButtonProps = {
  children?: ReactNode
  disabled?: boolean

  color?: Color
  backgroundColor?: Color
  foregroundColor?: Color
  outlineColor?: Color
  hoverColor?: Color

  ghost?: boolean
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  light?: boolean
  loading?: boolean
  onClick?: MouseEventHandler
  outline?: boolean
  style?: CSSProperties
  space?: Space
  textAlign?: 'center' | 'right'
}

export const Button: FC<ButtonProps> = ({
  children,
  disabled,

  color: colorProp,
  backgroundColor,
  foregroundColor,
  outlineColor,
  hoverColor,

  ghost,
  iconLeft,
  iconRight,
  light,
  loading,
  onClick,
  outline,
  style,
  space,
  textAlign,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  // const colorBase = 'Primary'
  // let color, bg, borderColor, hoverBg

  // if (ghost) {
  //   color = `${colorBase}Main`
  //   hoverBg = `${colorBase}LightHover`
  // } else if (outline) {
  //   color = `${colorBase}Main`
  //   borderColor = light ? `${colorBase}LightOutline` : `${colorBase}MainOutline`
  //   bg = `${colorBase}Light`
  //   hoverBg = `${bg}Hover`
  // } else if (light) {
  //   bg = `${colorBase}Light`
  //   color = `${bg}Contrast`
  //   hoverBg = `${bg}Hover`
  // } else {
  //   bg = `${colorBase}Main`
  //   color = `${colorBase}MainContrast`
  //   hoverBg = `${bg}Hover`
  // }

  if (!backgroundColor) {
    if (colorProp && isCapitalised(colorProp) && light) {
      backgroundColor = `${colorProp}Accent` as Color
    } else if (colorProp && isCapitalised(colorProp)) {
      backgroundColor = `${colorProp}` as Color
    } else if (!colorProp && light) {
      backgroundColor = 'PrimaryLightAccent'
    } else {
      backgroundColor = 'PrimaryMain'
    }
  }

  if (!foregroundColor) {
    if (colorProp && isCapitalised(colorProp) && light) {
      foregroundColor = `${colorProp}Foreground` as Color
    } else if (colorProp && isCapitalised(colorProp)) {
      foregroundColor = 'Background0dp' as Color
    } else {
      foregroundColor = 'Background0dp'
    }
  }

  if (!outlineColor) {
    if (colorProp && isCapitalised(colorProp) && ghost) {
      outlineColor = 'OtherDivider'
    } else if (colorProp && isCapitalised(colorProp)) {
      outlineColor = `${colorProp}` as Color
    } else {
      outlineColor = 'OtherDivider'
    }
  }

  if (!hoverColor) {
    if (colorProp && isCapitalised(colorProp) && light) {
      hoverColor = `${colorProp}Hover` as Color
    } else if (colorProp && isCapitalised(colorProp)) {
      hoverColor = `${colorProp}Active` as Color
    } else {
      hoverColor = 'PrimaryMainHover' as Color
    }
  }

  if (ghost) {
    backgroundColor = 'Transparent'
    foregroundColor = 'TextSecondary' as Color
    hoverColor = 'Transparent'
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
        color: c(foregroundColor),
        backgroundColor: c(backgroundColor),
        border: outline ? `1px solid ${c(outlineColor)}` : 'none',
        borderRadius: 4,
        opacity: disabled ? 0.6 : 1,
        position: 'relative',
        '&:hover': {
          backgroundColor: c(hoverColor),
          color: ghost ? c('TextPrimary') : c(foregroundColor),
        },
        ...(space
          ? {
              marginBottom: spaceToPx(space),
            }
          : null),
        ...style,
      }}
    >
      <div
        style={{
          visibility: loading ? 'hidden' : null,
          display: 'flex',
          alignItems: 'center',
          justifyContent:
            textAlign === 'center'
              ? 'center'
              : textAlign === 'right'
              ? 'flex-end'
              : 'flex-start',
        }}
      >
        {iconLeft &&
          renderOrCreateElement(iconLeft, {
            style: children || iconRight ? { marginRight: 8 } : null,
            color: c(foregroundColor),
          })}
        <Text color="inherit">{children}</Text>
        {iconRight &&
          renderOrCreateElement(iconRight, {
            style: children || iconLeft ? { marginLeft: 8 } : null,
            color: c(foregroundColor),
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
