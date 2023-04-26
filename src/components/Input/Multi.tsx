import React, { useState } from 'react'
import { styled, color } from '~'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

export const Multi = ({ style, inputRef, ...props }) => {
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  const [inputFocus, setInputFocus] = useState(false)

  return (
    <styled.div
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      style={{
        border: inputFocus
          ? `2px solid rgba(44, 60, 234, 0.2)`
          : `2px solid transparent`,
        borderRadius: 10,
      }}
    >
      <textarea
        style={{
          ...style,
          display: 'block',
          resize: 'none',
          paddingTop: 8,
          minHeight: 84,
          paddingLeft: 12,
          // outline: inputFocus
          //   ? `3px solid rgba(44, 60, 234, 0.2)`
          //   : `3px solid transparent`,
          border: inputFocus
            ? `1.5px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
        }}
        ref={resize}
        onInput={({ target }) => resize(target)}
        {...props}
      />
    </styled.div>
  )
}
