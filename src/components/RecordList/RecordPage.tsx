import React, { useState, useEffect } from 'react'
import { Button } from '~/components/Button'
import { SingleRecordListItem } from './SingleRecordListItem'
import { addSingleRecordItem } from './AddSingleRecordItem'
import { useDialog } from '~/components/Dialog'
import { useData } from '@based/react'
import { AddIcon } from '~/icons'

export const RecordPage = ({
  fields,
  id,
  onChange,
  recordValueType,
  style,
}) => {
  const [tempObj, setTempObj] = useState(null)

  if (fields && id) {
    const lastPartOfId = id.split('.').pop()
    if (fields[lastPartOfId]?.type === 'record') {
      recordValueType = fields[lastPartOfId].values.type
    }
  }

  // for record fields
  const { open } = useDialog()

  const targetId = id.split('.')[0]
  const field = id.split('.').pop()

  const query = {
    $id: targetId,
    [field]: true,
  }

  const { data } = useData(targetId ? query : null)

  const insideRecordField = data?.[field]

  useEffect(() => {
    setTempObj(insideRecordField)
  }, [insideRecordField])

  return (
    <div>
      {/* Als het een record is */}
      {insideRecordField && tempObj && (
        <div style={{ marginBottom: 24, ...style }}>
          {Object.keys(tempObj).map((ObjKey, idx) => {
            const objectValue = tempObj[ObjKey]
            return objectValue === null ? null : (
              <SingleRecordListItem
                key={idx}
                index={idx}
                objectKey={ObjKey}
                objectValue={objectValue}
                onChange={onChange}
                object={insideRecordField}
              />
            )
          })}

          <Button
            ghost
            icon={AddIcon}
            style={{ marginTop: 12 }}
            onClick={async () =>
              addSingleRecordItem(
                insideRecordField,
                setTempObj,
                recordValueType,
                onChange,
                open
              )
            }
          >
            Add {recordValueType || 'key value pair'}
          </Button>
        </div>
      )}
    </div>
  )
}
