import React, { CSSProperties } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, EditIcon } from '~'
import { Space } from '~/types'

type ObjectListProps = {
  label?: string
  space?: Space
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  indent?: boolean
  onClick?: () => void
}

export const ObjectList = ({
  label,
  description,
  descriptionBottom,
  space,
  indent,
  style,
  onClick,
}: ObjectListProps) => {
  return (
    <>
      <InputWrapper
        indent={indent}
        style={style}
        descriptionBottom={descriptionBottom}
        space={space}
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 12 }}
        />

        <Button icon={EditIcon} ghost onClick={onClick}>
          Edit object
        </Button>
      </InputWrapper>
    </>
  )
}
