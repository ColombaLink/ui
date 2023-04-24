// TODO yves en youri fix this
import React, { useState, useEffect, useCallback } from 'react'
import {
  DateTimePicker,
  styled,
  usePropState,
  useFocus,
  useHover,
  color,
} from '~'
import { ColorInput } from './ColorInput'
import { JsonInput } from './JsonInput'
import { InputWrapper } from './InputWrapper'
import { DigestInput } from './DigestInput'
import { MarkdownInput } from './MarkdownInput'
import { PasswordInput } from './PasswordInput'
import { Single } from './Single'
import { Multi } from './Multi'
import { MaybeSuggest } from './MaybeSuggest'
import { InputProps, InputType } from './types'

// type InputProps<T extends InputType = InputType> =

type OnChange<T extends InputType> = (
  value: T extends 'number' ? number : T extends 'date' ? number : string
) => void

export const Input = <T extends InputType>({
  autoFocus,
  bg,
  pattern,
  defaultValue,
  description,
  descriptionBottom,
  disabled,
  error,
  forceSuggestion,
  ghost,
  icon,
  iconRight,
  indent,
  inputRef,
  label,
  large,
  maxChars,
  name,
  noInterrupt,
  onChange: onChangeProp,
  placeholder = 'Type something here',
  space,
  style,
  suggest,
  transform,
  type, // remove default
  value: valueProp,
  ...otherProps
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  const [errorMessage, setErrorMessage] = useState('')

  if (maxChars === -1) {
    maxChars = null
  }

  useEffect(() => {
    if (maxChars && value.length > maxChars) {
      setValue(value.slice(0, maxChars))
    }
  }, [value])

  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = transform ? transform(e.target.value) : e.target.value
      if (type === 'number') {
        setValue(+e.target.value)
        // @ts-ignore
        onChangeProp?.(+newValue)
      } else {
        setValue(newValue)
        // @ts-ignore
        onChangeProp?.(newValue)
      }
    },
    [onChangeProp]
  )

  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
  const props = {
    // consoleFunc,
    name,
    type,
    value,
    pattern,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    error,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? '' : large ? 48 : 36,
      paddingLeft,
      border: ghost
        ? `0px solid transparent`
        : focused
        ? `1.5px solid ${color('accent')}`
        : `1px solid ${color('border')}`,
      paddingRight,
      width: '100%',
      fontSize,
      fontWeight,
      backgroundColor: bg
        ? color(hover && !disabled ? 'border' : 'border')
        : 'inherit',
    },
    inputRef,
    ...focusListeners,
    ...hoverListeners,
    ...otherProps,
  }

  useEffect(() => {
    //  check for when blurred
    if (!pattern) {
      const msg = error?.(value)
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [focused])

  return (
    <InputWrapper
      style={style}
      indent={indent}
      space={space}
      label={label}
      description={description}
      descriptionBottom={descriptionBottom}
      errorMessage={errorMessage}
      disabled={disabled}
      type={type}
      value={value}
      setValue={setValue}
      onChange={(e) => {
        onChangeProp?.(e.target.value)
      }}
      maxChars={maxChars}
    >
      {type === 'color' ? (
        <ColorInput
          onChange={(e) => {
            onChangeProp?.(e.target.value)
          }}
          disabled={disabled}
          value={value}
          style={{ width: '100%' }}
        />
      ) : type === 'json' ? (
        <JsonInput {...props} setErrorMessage={setErrorMessage} />
      ) : type === 'markdown' ? (
        <MarkdownInput {...props} />
      ) : type === 'multiline' ? (
        <Multi {...props} />
      ) : type === 'digest' ? (
        <DigestInput {...props} disabled={!!valueProp} />
      ) : type === 'password' ? (
        <PasswordInput {...props} large={large} disabled={!!valueProp} />
      ) : type === 'date' ? (
        <DateTimePicker />
      ) : (
        <MaybeSuggest
          focused={focused}
          forceSuggestion={forceSuggestion}
          suggest={suggest}
          value={value}
          paddingLeft={paddingLeft + 1}
          paddingRight={paddingRight}
          fontSize={fontSize}
          fontWeight={fontWeight}
          onChange={onChange}
        >
          <Single
            {...props}
            // safari fix maybe it breaks smth
            onKeyDown={(e) => {
              // now you can remove the zero in input fields
              if (e.key === 'Backspace' && value === 0) {
                setValue('')
              }
              // for some reason pressing . in number input
              // changed the value to one
              if (e.key === '.' && type === 'number') {
                e.preventDefault()
              }
              props.onKeyDown?.(e)
            }}
            style={props.style}
            // @ts-ignore
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            icon={icon}
            iconRight={iconRight}
            setErrorMessage={setErrorMessage}
          />
        </MaybeSuggest>
      )}
    </InputWrapper>
  )
}
