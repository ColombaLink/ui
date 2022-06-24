import React, {
  forwardRef,
  ElementRef,
  ReactNode,
  useEffect,
  useState,
  useRef,
  useCallback,
  CSSProperties,
} from 'react'
import { Text } from '~/components/Text'
import { Color, PropsEventHandler } from '~/types'
import { styled } from 'inlines'
import { removeOverlay } from '../Overlay'
import { color } from '~/utils'

console.log(styled)

const StyledContextItem = styled('div', {
  display: 'flex',
  height: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  cursor: 'pointer',
  '&:active': {
    backgroundColor: '$ActionLightSelected',
  },
  '&:focus': {
    backgroundColor: '$ActionLightHover',
  },
})

const LeftWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const IconMarginWrapper = styled('div', {
  marginRight: 16,
  height: 16,
  width: 16,
})

export type ContextItemProps = {
  style?: CSSProperties
  color?: Color
  onClick?: PropsEventHandler
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  inset?: boolean
  noFocus?: boolean
  tabIndex?: number
  children?: ReactNode | string
}

export const ContextDivider = styled('div', {
  marginTop: 4,
  borderTop: '1px solid $OtherDivider',
  marginBottom: 4,
})

export const ContextItem = forwardRef<
  ElementRef<typeof StyledContextItem>,
  ContextItemProps
>((props, forwardedRef) => {
  let {
    onClick,
    style,
    color: colorProp = 'TextPrimary',
    children,
    leftIcon = null,
    inset,
    tabIndex = 0,
    noFocus,
    rightIcon = null,
  } = props

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

  let child = children

  // // TODO: fix the color stuff everywhere
  // let child = isText(children) ? (
  //   <Text css={{ userSelect: 'none' }} color="inherit">
  //     {children}
  //   </Text>
  // ) : (
  //   children
  // )

  // if (leftIcon || inset) {
  //   child = (
  //     <LeftWrapper>
  //       <IconMarginWrapper>{leftIcon || null}</IconMarginWrapper>
  //       {child}
  //     </LeftWrapper>
  //   )
  // }

  if (!style.color) {
    style.color = color(colorProp)
  }

  if (noFocus) {
    return (
      <StyledContextItem ref={forwardedRef} onClick={onClick} style={style}>
        {child}
        {rightIcon}
      </StyledContextItem>
    )
  }

  const [isHover, setHover] = useState(false)

  const ref = useRef(forwardRef)

  useEffect(() => {
    if (isHover) {
      // @ts-ignore - easier to not have to type multi-refs
      ref.current.focus()
    } else {
      // @ts-ignore - easier to not have to type multi-refs
      ref.current.blur()
    }
  }, [isHover, ref])

  return (
    <StyledContextItem
      data-aviato-context-item
      tabIndex={tabIndex}
      // @ts-ignore - easier to not have to type multi-refs
      ref={ref}
      onMouseEnter={useCallback(() => setHover(true), [])}
      onMouseLeave={useCallback(() => setHover(false), [])}
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
      {rightIcon}
    </StyledContextItem>
  )
})

ContextItem.displayName = 'ContextItem'
