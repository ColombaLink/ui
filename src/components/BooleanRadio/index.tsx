import React, { useState, CSSProperties, FC } from 'react'
import { RadioButtons, Label, ErrorIcon, Text, color, spaceToPx } from '~'
import { Space } from '~/types'

type BooleanRadioProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  value?: boolean
  style?: CSSProperties
  space?: Space
  error?: (value: boolean | string | number) => string
  onChange?: (value: boolean) => void
}

export const BooleanRadio: FC<BooleanRadioProps> = ({
  label,
  description,
  descriptionBottom,
  value,
  indent,
  space,
  style,
  error,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState('')

  const onChangeHandler = (value) => {
    const msg = error?.(value)
    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
      onChange?.(value)
    }
  }

  return (
    <div
      style={{
        marginBottom: spaceToPx(space),
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: errorMessage ? color('red') : color('border'),
        paddingLeft: indent ? 12 : null,
        ...style,
      }}
    >
      <Label label={label} description={description} />
      <RadioButtons
        direction="horizontal"
        data={[
          { value: true, label: 'True' },
          { value: false, label: 'False' },
        ]}
        value={value}
        onChange={onChangeHandler}
      />
      {descriptionBottom && (
        <Text color="text2" italic weight={400}>
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
    </div>
  )
}
