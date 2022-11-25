import React, { CSSProperties, useEffect, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Space } from '~/types'
import { EditIcon, AddIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'
import { useDialog } from '~/components/Dialog'
import { AddSingleRecordItem } from './AddSingleRecordItem'

type RecordListProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  schema?: any
  style?: CSSProperties
  space?: Space
  value?: {}
  onClick?: () => void
  onChange?: (value: any) => void
}

export const RecordList = ({
  label,
  description,
  schema,
  value,
  onClick,
  onChange,
  ...props
}: RecordListProps) => {
  const { open } = useDialog()
  const [tempObj, setTempObj] = useState({})

  console.log()

  const itemType = schema.values.type

  useEffect(() => {
    setTempObj(value)
  }, [value])

  const addItemHandler = async () => {
    AddSingleRecordItem(tempObj, setTempObj, itemType, onChange, open)
  }

  return (
    <InputWrapper indent space descriptionBottom={description}>
      <Text space={12} weight={600}>
        <div style={{ display: 'flex' }}>
          {label} <Badge style={{ marginLeft: 8 }}>{schema.values.type}</Badge>
        </div>
      </Text>
      <InputWrapper indent space={8}>
        {tempObj &&
          Object.keys(tempObj).map((ObjKey, idx) => (
            <div key={idx} style={{ display: 'flex', marginBottom: 4 }}>
              <Text weight={500}>{ObjKey}</Text> : {tempObj[ObjKey]}
            </div>
          ))}
      </InputWrapper>

      <div style={{ display: 'flex', gap: 16 }}>
        <Button ghost icon={AddIcon} onClick={addItemHandler}>
          Add {schema.values.type}
        </Button>

        {value && (
          <Button ghost icon={EditIcon} onClick={onClick}>
            Edit Record
          </Button>
        )}
      </div>
    </InputWrapper>
  )
}
