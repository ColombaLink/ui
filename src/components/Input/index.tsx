import React, { FC, ReactNode } from 'react'
import { Text } from '../Text'
import { color, renderOrCreateElement } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

const Multi = ({ style, ...props }) => {
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
  return <input {...props} />
}

type InputProps = {
  style?: React.CSSProperties
  onChange?: (value: string | number) => void
  label?: string
  description?: string
  optional?: boolean
  value?: string | number
  iconLeft?: FC | ReactNode
  iconRight?: FC | ReactNode
  defaultValue?: string | number
  type?: string
  placeholder?: string
  multiline?: boolean
  bg?: boolean
  autoFocus?: boolean
}

export const Input: FC<InputProps> = ({
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
}) => {
  const [value = '', setValue] = usePropState(valueProp)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()

  const onChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onChangeProp?.(newValue)
  }

  const props = {
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
      minHeight: 36,
      paddingLeft: iconLeft ? 36 : 12,
      paddingRight: iconRight ? 36 : 12,
      width: '100%',
      backgroundColor: bg
        ? color(hover ? 'ActionLightHover' : 'ActionLight')
        : 'inherit',
    },
    ...focusListeners,
    ...hoverListeners,
  }

  return (
    <div style={style}>
      {label && (
        <Text style={{ marginBottom: 4 }}>
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
