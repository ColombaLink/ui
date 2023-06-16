import React, { FC, RefObject, useEffect, useState } from 'react'
import { Style, styled, color } from '~'

type UrlProps = {
  type?: string
  inputRef?: RefObject<any>
  value?: any
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  onFocus?: () => void
  onBlur?: () => void
  style?: Style
  ghost?: boolean
  focused?: boolean
  // icon?: FunctionComponent<Icon> | ReactNode
  // iconRight?: FunctionComponent<Icon> | ReactNode
  setErrorMessage?: (e) => void
  error?: (str: string, patternMatches?: boolean) => string // show error
  previewImg?: boolean
}

export const UrlInput: FC<UrlProps> = ({
  type,
  inputRef,
  value,
  pattern,
  style,
  ghost,
  focused,
  // icon,
  // iconRight,
  setErrorMessage,
  error,
  onChange,
  previewImg,
  ...props
}) => {
  const [httpRegex] = useState(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
  )
  useEffect(() => {
    const v = typeof value === 'number' ? String(value) : value
    const reOk = v === '' || httpRegex.test(v)
    const msg = error
      ? error(value, reOk)
      : reOk
      ? ''
      : 'Please enter a valid URL'
    if (msg) {
      setErrorMessage(msg)
    } else {
      setErrorMessage('')
    }
  }, [value])

  return (
    <styled.div
      style={{
        position: 'relative',
        color: color('text'),
        width: '100%',
        display: 'flex',
      }}
    >
      {previewImg && (
        <styled.div
          style={{
            flexShrink: '0',
            border: ghost
              ? `0px solid transparent`
              : focused
              ? `1.5px solid ${color('accent')}`
              : `1px solid ${color('border')}`,
            borderRadius: 10,
            margin: 'auto 0',
            height: '36px',
            width: '36px',
            backgroundImage: `url("${value}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            marginRight: '16px',
          }}
        />
      )}
      <input
        onChange={onChange}
        value={value}
        {...props}
        type={type}
        ref={inputRef}
        pattern={pattern}
        style={{
          border: ghost
            ? `2px solid transparent`
            : focused
            ? `2px solid rgba(44, 60, 234, 0.2)`
            : `2px solid transparent`,
          borderRadius: 10,
          margin: 'auto 0',
          width: '100%',
          userSelect: 'text',
          MozUserSelect: 'text',
          WebkitUserSelect: 'text',
          ...style,
        }}
      />
    </styled.div>
  )
}
