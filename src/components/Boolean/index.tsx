import React, { useState, CSSProperties } from 'react'
import {
  RadioButtons,
  Label,
  Button,
  ErrorIcon,
  Text,
  color,
  spaceToPx,
} from '~'
import { Space } from '~/types'

type BooleanProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  // value?: boolean
  style?: CSSProperties
  space?: Space
  error?: (value: boolean) => void
  onChange?: (value: string | number | boolean) => void
}

export const Boolean = ({
  label,
  description,
  descriptionBottom,
  //  value,
  indent,
  space,
  style,
  error,
  onChange,
}: BooleanProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [value, setValue] = useState<boolean | string | number>(undefined)

  //   const onChange = (e) => {
  //     setValue(newValue)

  //     onChangeProp?.(newValue)
  //     const msg = error?.(newValue)

  //     if (msg) {
  //       // add error msg
  //       setErrorMessage(msg)
  //     } else {
  //       // remove error msg
  //       setErrorMessage('')
  //     }
  //   }

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
          console.log(typeof e)
          setValue(e)
          onChange?.(e)
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
