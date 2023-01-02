import React, { CSSProperties, FC } from 'react'
import { Label, Button, AddIcon } from '~'
import { Space } from '~/types'
import { ReferenceSingleField } from './ReferenceSingleField'
import { InputWrapper } from '../Input/InputWrapper'

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
// TODO yves
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
  const errorMessage = ''

  return (
    <InputWrapper
      indent={indent}
      descriptionBottom={descriptionBottom}
      errorMessage={errorMessage}
      space={space}
    >
      <div
        style={{
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
          <ReferenceSingleField refName="Referencie" refType="Reference" />
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
      </div>
    </InputWrapper>
  )
}
