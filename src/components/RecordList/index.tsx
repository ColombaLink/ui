import { useEffect, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { EditIcon, AddIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'
import { useDialog } from '~/components/Dialog'
import { addSingleRecordItem } from './AddSingleRecordItem'
import { color } from '~'

type RecordListProps = {
  label?: string
  description?: string
  schema?: any
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
}: // ...props
  RecordListProps) => {
  const { open } = useDialog()
  const [tempObj, setTempObj] = useState({})

  const itemType = schema.values.type

  useEffect(() => {
    setTempObj(value)
  }, [value])

  const addItemHandler = async () => {
    addSingleRecordItem(tempObj, setTempObj, itemType, onChange, open)
  }

  return (
    <InputWrapper
      indent
      style={{ marginBottom: 48 }}
      descriptionBottom={description}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <Text weight={500} size={14}>
          {label}
        </Text>
        <Badge style={{ marginLeft: 8 }}>{schema.values.type}</Badge>
      </div>
      <InputWrapper indent style={{ marginBottom: 12 }}>
        {tempObj &&
          Object.keys(tempObj).map((ObjKey, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                marginBottom: 4,
                borderRadius: 4,
                borderBottom: `1px solid ${color('border')}`,
              }}
            >
              <Text weight={600} style={{ width: 134 }}>
                {ObjKey}:{' '}
              </Text>
              <Text style={{ marginLeft: 6 }}>
                {itemType === 'digest'
                  ? tempObj[ObjKey].toString().substring(0, 6) + '...'
                  : tempObj[ObjKey]}
              </Text>
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
