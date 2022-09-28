import React, { CSSProperties, FC, ReactNode } from 'react'
import { styled } from 'inlines'
import { color, spaceToPx, Text } from '~'
import { Space } from '~/types'

type InputWrapperProps = {
  children: ReactNode
  error?: boolean
  focus?: boolean
  indent?: boolean
  space?: Space
  descriptionBottom?: string
  style?: CSSProperties
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  error,
  focus,
  space,
  descriptionBottom,
  style,
  ...props
}) => {
  return (
    <styled.div
      style={{
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: error
          ? color('red')
          : focus
          ? color('accent')
          : color('border'),
        paddingLeft: indent ? 12 : null,
        marginBottom: spaceToPx(space),
        ...style,
      }}
      {...props}
    >
      {children}
      {descriptionBottom && (
        <Text color="text2" italic weight={400}>
          {descriptionBottom}
        </Text>
      )}
    </styled.div>
  )
}
