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
  field?: string
  meta?: any
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
  meta,
  field,
  error,
  onChange,
}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [boolValue, setBoolValue] = useState<boolean | string | number>(value)

  console.log(onChange, 'onChange')
  console.log('PROPS FROM RADIO BOOL', props)
  console.log(value, 'value')
  console.log('%c Field', 'color:#ff00ff', field)
  console.log('%c Meta', 'color:#ff5091', meta)

  const fieldName = meta.name

  const onChangeHandler = (e) => {
    setBoolValue(value)

    const msg = error?.(e)

    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
      // onChange(e)

      // i dunno  what to do here !!!!!!
      onChange({ fieldName: { value: e } })
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

          setBoolValue(e)
          // onChangeProp?.(e)
          onChangeHandler(e)
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
