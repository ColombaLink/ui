import React, { createElement, FC } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
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

export const Input: FC = ({
  style,
  onChange: onChangeProp,
  label,
  value: valueProp,
  defaultValue,
  type,
  placeholder = 'Type something here',
  iconLeft,
  iconRight,
  multiline,
  bg = false,
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
    style: {
      outline: focus
        ? `2px solid ${color('OtherInputBorderActive')}`
        : hover
        ? `1px solid ${color('OtherInputBorderHover')}`
        : `1px solid ${color('OtherInputBorderDefault')}`,
      borderRadius: 4,
      minHeight: 36,
      paddingLeft: iconLeft ? 36 : 12,
      paddingRight: iconRight ? 36 : 12,
      width: '100%',
      backgroundColor: bg
        ? color(hover ? 'ActionLightHover' : 'ActionLight')
        : 'inherit',
      margin: 0,
    },
    ...focusListeners,
    ...hoverListeners,
  }

  return (
    <div style={style}>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <div
        style={{
          position: 'relative',
          color: color('TextPrimary'),
        }}
      >
        {iconLeft &&
          createElement(iconLeft, {
            size: 16,
            style: {
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              pointerEvents: 'none',
            },
          })}
        {multiline ? <Multi {...props} /> : <Single {...props} />}
        {iconRight &&
          createElement(iconRight, {
            size: 16,
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
