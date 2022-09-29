import React, { CSSProperties, FC, ReactNode } from 'react'
import { styled } from 'inlines'
import { color, spaceToPx, Text, ErrorIcon } from '~'
import { Space } from '~/types'

type InputWrapperProps = {
  children: ReactNode
  errorMessage?: string
  focus?: boolean
  indent?: boolean
  space?: Space
  descriptionBottom?: string
  style?: CSSProperties
  disabled?: boolean
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  errorMessage,
  focus,
  space,
  descriptionBottom,
  style,
  disabled,
  ...props
}) => {
  return (
    <div style={{ cursor: disabled ? 'not-allowed' : null }}>
      <styled.div
        style={{
          borderLeft: indent ? `2px solid ${color('border')}` : null,
          borderColor: errorMessage
            ? color('red')
            : focus
            ? color('accent')
            : color('border'),
          paddingLeft: indent ? 12 : null,
          marginBottom: spaceToPx(space),
          pointerEvents: disabled ? 'none' : null,
          ...style,
        }}
        {...props}
      >
        {children}
        {descriptionBottom && (
          <Text color="text2" italic weight={400} style={{ marginTop: 6 }}>
            {descriptionBottom}
          </Text>
        )}
        {errorMessage && (
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <ErrorIcon color="red" size={16} />
            <Text color="red">{errorMessage}</Text>
          </div>
        )}
      </styled.div>
    </div>
  )
}
