import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers'
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
  props?: any
}

export const BooleanRadio: FC<BooleanRadioProps> = ({
  label,
  description,
  descriptionBottom,
  value,
  indent,
  space,
  style,
  props,
  error,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [BoolValue, setBoolValue] = useState<boolean | string | number>(value)

  console.log(onChange, 'onChange')
  console.log('PROPS FROM RADIO BOOL', props)
  console.log(value, 'value')

  const onChangeHandler = (e) => {
    setBoolValue(value)

    const msg = error?.(e)

    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
      onChange({ value: e })
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
        onChange={(e) => {
          //   console.log(typeof e)
          //   console.log('E', e)
          setBoolValue(e)
          // onChangeProp?.(e)
          onChangeHandler(e)
          //  onChange(e)
        }}
      />

      {descriptionBottom && (
        <Text color="text2" italic weight={400}>
          {descriptionBottom}
        </Text>
      )}
      {/* <ErrorMessage /> */}
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
