import React, { useEffect, useState } from 'react'
import { Checkbox } from '../Checkbox'
import { CustomList } from '../CustomList'
import { ListItem } from './ListItem'

export const FieldList = ({ listItemsFields, maxItemWidth }) => {
  const [testFields, setTestFields] = useState([])
  const [showSystemFields, setShowSystemFields] = useState(false)

  const SystemFieldNames = ['id', 'type', 'children', 'parents']

  let nameFields = Object.keys(listItemsFields[0].fields)
  const badgeTypes = Object.values(listItemsFields[0].fields).map(
    (value) => value['type']
  )

  if (!showSystemFields) {
    console.log('lyojmaoemfa')
    nameFields = Object.keys(listItemsFields[0].fields).filter(
      (item) => SystemFieldNames.indexOf(item) === -1
    )
  }

  testFields.splice(0, testFields.length)

  for (let i = 0; i < nameFields.length; i++) {
    testFields?.push(
      <ListItem name={nameFields[i]} badgeName={badgeTypes[i]} />
    )
  }

  console.log('Test fields', testFields)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ width: maxItemWidth || '100%', margin: '0 auto' }}>
        <Checkbox
          space="16px"
          description="Show system fields"
          onChange={(v) => {
            console.log(v)
            setShowSystemFields(v)
          }}
        />
      </div>

      <CustomList
        items={testFields}
        itemSpace={12}
        draggable
        maxItemWidth={maxItemWidth}
      />
    </div>
  )
}
