import React, { CSSProperties, FC } from 'react'
import { Label, Text, Button, AddIcon, ErrorIcon, color, spaceToPx } from '~'
import { styled } from 'inlines'
import { Space } from '~/types'
import { ReferenceSingleField } from './ReferenceSingleField'

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
  disabled?: boolean
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
  disabled,
}) => {
  return (
    <div
      style={{
        marginBottom: spaceToPx(space),
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: color('border'),
        paddingLeft: indent ? 12 : null,
        cursor: disabled ? 'not-allowed' : null,

        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Label
          label={label}
          labelColor={disabled ? 'text2' : 'text'}
          space="8px"
          description={description}
        />
        <Button
          ghost
          style={{ height: 'fit-content' }}
          onClick={() => console.log('clear it')}
          disabled={disabled}
        >
          Clear
        </Button>
      </div>

      {/* Fields list  DRAG and Drop Shizzle */}

      <div style={{ marginBottom: 12 }}>
        <ReferenceSingleField
          refName="Referencie"
          refType="Reference"
          refStatus="Published"
        />
        <ReferenceSingleField
          refName="Pink T-Shirt"
          refType="Products"
          refStatus="Published"
        />
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <Button ghost icon={AddIcon} disabled={disabled}>
          Add existing 'Reference'
        </Button>
        <Button ghost icon={AddIcon} disabled={disabled}>
          Create & add new 'Reference'
        </Button>
      </div>
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}

      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <ErrorIcon color="red" size={16} />
        <Text color="red">'errorMessage' kan hier</Text>
      </div>
    </div>
  )
}
