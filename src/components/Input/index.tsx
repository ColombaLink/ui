import React, { FC, KeyboardEventHandler, ReactNode } from 'react'
import { Text } from '../Text'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space } from '~/types'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

const Multi = ({ style, inputRef, ...props }) => {
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  return (
    <textarea
      style={{
        ...style,
        display: 'block',
        resize: 'none',
        paddingTop: 8,
      }}
      ref={resize}
      onInput={({ target }) => resize(target)}
      {...props}
    />
  )
}

const Single = (props) => {
  const { inputRef: ref, ...otherProps } = props
  return <input {...(ref ? { ref } : null)} {...otherProps} />
}

type InputPropsBaseLine = {
  style?: React.CSSProperties
  label?: string
  description?: string
  optional?: boolean
  value?: string | number
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  defaultValue?: string | number
  placeholder?: string
  multiline?: boolean
  bg?: boolean
  autoFocus?: boolean
  name?: string
  space?: Space
  inputRef?: React.RefObject<HTMLDivElement>
  large?: boolean
}

// to coorece the on change (skips having to make conversions or ts ignores)
type InputProps =
  | (InputPropsBaseLine & {
      type: 'text' | 'password' | 'email' | 'phone' | 'color'
      onChange?: (value: string) => void
    })
  | (InputPropsBaseLine & {
      name: 'password' | 'email' | 'name'
      onChange?: (value: string) => void
    })
  | (InputPropsBaseLine & {
      type: 'number' | 'date'
      onChange?: (value: number) => void
    })
  | (InputPropsBaseLine & {
      type?: string
      onChange?: (value: string | number) => void
    })

export const Input: FC<
  InputProps & Omit<React.HTMLProps<HTMLInputElement>, keyof InputProps>
> = ({
  style,
  onChange: onChangeProp,
  label,
  description,
  optional,
  value: valueProp,
  defaultValue,
  type,
  placeholder = 'Type something here',
  iconLeft,
  iconRight,
  multiline,
  bg,
  autoFocus,
  name,
  space,
  inputRef,
  large,
  ...otherProps
}) => {
  const [value = '', setValue] = usePropState(valueProp)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()

  const onChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    // ignore so we have to write less code.. TODO: write more stuff for this
    // @ts-ignore
    onChangeProp?.(newValue)
  }

  const props = {
    name,
    type,
    value,
    defaultValue,
    placeholder,
    onChange,
    autoFocus,
    style: {
      margin: 0,
      outline: focus
        ? `2px solid ${color('OtherInputBorderActive')}`
        : hover
        ? `1px solid ${color('OtherInputBorderHover')}`
        : `1px solid ${color('OtherInputBorderDefault')}`,
      outlineOffset: focus ? -2 : -1,
      borderRadius: 4,
      minHeight: large ? 48 : 36,
      paddingLeft: iconLeft ? 36 : 12,
      paddingRight: iconRight ? 36 : 12,
      width: '100%',
      backgroundColor: bg
        ? color(hover ? 'GreylightHover' : 'Greylight')
        : 'inherit',
    },
    ...focusListeners,
    ...hoverListeners,
    inputRef,
    ...otherProps,
  }

  return (
    <div
      style={{
        ...(space
          ? {
              marginBottom: spaceToPx(space),
            }
          : null),
        ...style,
      }}
    >
      {label && (
        <Text style={{ marginBottom: 8 }}>
          {label}
          {optional && (
            <span
              style={{
                fontWeight: 400,
                color: `${color('TextSecondary')}`,
              }}
            >
              {' '}
              (optional)
            </span>
          )}
        </Text>
      )}
      {description && (
        <Text
          weight={400}
          style={{ marginBottom: 12, marginTop: -2 }}
          color="TextSecondary"
        >
          {description}
        </Text>
      )}
      <div
        style={{
          position: 'relative',
          color: color('TextPrimary'),
        }}
      >
        {renderOrCreateElement(iconLeft, {
          style: {
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translate3d(0,-50%,0)',
            pointerEvents: 'none',
          },
        })}
        {multiline ? <Multi {...props} /> : <Single {...props} />}
        {renderOrCreateElement(iconRight, {
          style: {
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translate3d(0,-50%,0)',
            pointerEvents: 'none',
          },
        })}
      </div>
    </div>
  )
}
