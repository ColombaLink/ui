import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import {
  color,
  spaceToPx,
  Text,
  ErrorIcon,
  styled,
  Color,
  Space,
  Label,
  Button,
} from '~'
import { InputType } from './types'

type InputWrapperProps = {
  children: ReactNode
  errorMessage?: string
  focus?: boolean
  indent?: boolean
  space?: Space
  label?: ReactNode
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  disabled?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  color?: Color
  onClick?: () => void
  onBlur?: () => void
  type: InputType
  value?: any
  setValue?: (e) => void
  maxChars?: number
  onChange?: (e) => void
}

export const InputWrapper: FC<InputWrapperProps> = ({
  children,
  indent,
  errorMessage,
  space,
  label,
  description,
  descriptionBottom,
  style,
  disabled,
  color: colorProp = 'accent',
  type,
  value,
  setValue,
  onChange: onChangeProp,
  maxChars,
  ...props
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <styled.div
      onFocus={() => {
        setFocus(true)
      }}
      onBlur={() => {
        setFocus(false)
      }}
      style={{ cursor: disabled ? 'not-allowed' : null, ...style }}
    >
      <styled.div
        style={{
          borderLeft: indent ? `2px solid ${color('border')}` : null,
          borderColor: errorMessage
            ? color('red')
            : focus
            ? color(colorProp)
            : color('border'),
          paddingLeft: indent ? 12 : null,
          marginBottom: spaceToPx(space),
          pointerEvents: disabled ? 'none' : null,
        }}
        {...props}
      >
        <styled.div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Label
            label={label}
            description={description}
            style={{ marginBottom: 6, marginLeft: 4 }}
          />
          {value !== '' && indent && (
            <Button
              ghost
              onClick={() => {
                // @ts-ignore
                onChangeProp?.('')
                setValue('')
              }}
              disabled={disabled}
              style={{
                height: 'fit-content',
                marginTop: description ? 0 : -6,
                marginBottom: description ? 0 : 6,
              }}
            >
              Clear
            </Button>
          )}
        </styled.div>

        {children}

        {maxChars && (
          <styled.div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 4,
              marginTop: 8,
            }}
          >
            <Text color="text2" weight={400}>
              {value.length} characters
            </Text>
            <Text color="text2" weight={400}>
              Max {maxChars} characters
            </Text>
          </styled.div>
        )}

        {descriptionBottom && (
          <Text color="text2" italic weight={400} style={{ marginTop: 6 }}>
            {descriptionBottom}
          </Text>
        )}
        {errorMessage && (
          <styled.div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <ErrorIcon color="red" size={16} />
            <Text color="red">{errorMessage}</Text>
          </styled.div>
        )}
      </styled.div>
    </styled.div>
  )
}
