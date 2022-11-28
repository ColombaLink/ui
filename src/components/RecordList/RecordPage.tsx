import React, { useState, useEffect, CSSProperties } from 'react'
import { Button } from '~/components/Button'
import { SingleRecordListItem } from './SingleRecordListItem'
import { addSingleRecordItem } from './AddSingleRecordItem'
import { useDialog } from '~/components/Dialog'
import { useData } from '@based/react'
import { AddIcon } from '~/icons'

type RecordPageProps = {
  id?: string
  fields?: any
  onChange?: (fields: any) => void
  recordValueType?: string
  style?: CSSProperties
}

export const RecordPage = ({
  fields,
  id,
  onChange,
  recordValueType,
  style,
}: RecordPageProps) => {
  const [tempObj, setTempObj] = useState({})

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

  useEffect(() => {
    setTempObj(data?.[field])
  }, [data])

  return (
    <div>
      {/* Als het een record is */}
      {tempObj && (
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
                object={tempObj}
                setTempObj={setTempObj}
                itemType={recordValueType}
              />
            )
          })}

          <Button
            ghost
            icon={AddIcon}
            style={{ marginTop: 12 }}
            onClick={async () =>
              addSingleRecordItem(
                tempObj,
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
