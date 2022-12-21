import React, { CSSProperties, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, EditIcon, Badge } from '~'
import { Space } from '~/types'

type ObjectListProps = {
  label?: string
  space?: Space
  description?: string
  descriptionBottom?: string
  style?: CSSProperties
  indent?: boolean
  schema?: any
  onClick?: () => void
}

export const ObjectList = ({
  label,
  description,
  descriptionBottom,
  space,
  indent,
  style,
  schema,
  onClick,
}: /// ...props
ObjectListProps) => {
  const [insideObjectFields] = useState(schema.properties)

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

        <InputWrapper indent={indent} space={8}>
          {/* some small indication of what is in the object let say one level deep per object 
          may need to set limit after certain amount ?? TODO */}
          {Object.keys(insideObjectFields).map((objectKey, idx) => (
            <div key={idx} style={{ display: 'flex', marginBottom: 4 }}>
              {objectKey}
              <Badge style={{ marginLeft: 8 }} boxed ghost outline>
                {insideObjectFields[objectKey].type}
              </Badge>
            </div>
          ))}
        </InputWrapper>

        <Button icon={EditIcon} ghost onClick={onClick}>
          Edit object
        </Button>
      </InputWrapper>
    </>
  )
}
