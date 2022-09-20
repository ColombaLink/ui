import React, { CSSProperties, FC } from 'react'
import {
  Label,
  Text,
  Button,
  AddIcon,
  ErrorIcon,
  Badge,
  color,
  spaceToPx,
} from '~'
import { styled } from 'inlines'
import { Space } from '~/types'

type ReferenceInputProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  error?: () => string
  value?: any
  onChange?: (value: any) => void
  style?: CSSProperties
  space?: Space
}

export const ReferenceInput: FC<ReferenceInputProps> = ({
  label,
  description,
  descriptionBottom,
  indent,
  error,
  value,
  onChange,
  style,
  space,
}) => {
  return (
    <div
      style={{
        marginBottom: spaceToPx(space),
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: color('border'),
        paddingLeft: indent ? 12 : null,
        ...style,
      }}
    >
      <Label label={label} space="8px" />
      <div style={{ display: 'flex', gap: 16 }}>
        <Button ghost icon={AddIcon}>
          Add existing 'Reference'
        </Button>
        <Button ghost icon={AddIcon}>
          Create & add new 'Reference'
        </Button>
      </div>
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}
    </div>
  )
}
