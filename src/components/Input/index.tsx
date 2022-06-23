import React, { createElement, FC, CSSProperties, useRef } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
export const Input: FC = ({
  style,
  onChange: onChangeProp,
  label,
  value: valueProp,
  defaultValue,
  type,
  placeholder = 'Type something here',
  iconLeft,
  multiline,
}) => {
  const [value = '', setValue] = usePropState(valueProp)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  const ref = useRef()

  const onChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    onChangeProp?.(newValue)
  }

  const inputProps = {
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
      background: 'inherit',
      minHeight: 36,
      paddingLeft: iconLeft ? 36 : 12,
      paddingRight: 12,
      width: '100%',
    },
    ...focusListeners,
    ...hoverListeners,
  }

  if (multiline) {
    Object.assign(inputProps, {
      ref,
      onInput: ({ target }) => {
        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 8 + 'px'
      },
    })

    Object.assign(inputProps.style, {
      paddingTop: 8,
      resize: 'none',
      overflow: 'hidden',
    })
  }

  return (
    <div style={style}>
      {label && <Text style={{ marginBottom: 4 }}>{label}</Text>}
      <div style={{ position: 'relative', color: color('TextPrimary') }}>
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
        {createElement(multiline ? 'textarea' : 'input', inputProps)}
      </div>
    </div>
  )
}
