import React, { useEffect, useState } from 'react'
import { Checkbox } from '../Checkbox'
import { CustomList } from '../CustomList'
import { ListItem } from './ListItem'

export const FieldList = ({ listItemsFields, maxItemWidth }) => {
  const [testFields, setTestFields] = useState([])
  const [showSystemFields, setShowSystemFields] = useState(false)

  const systemFieldNames = ['id', 'type', 'children', 'parents']
  const allwaysIgnoreFields = ['descendants', 'ancestors', 'aliases']

  console.log(listItemsFields)

  let nameFields = Object.keys(listItemsFields[0].fields)

  const badgeTypesNames = Object.values(listItemsFields[0].fields).map(
    (value) => value['type']
  )

  let systemFieldNamesArr = Object.keys(listItemsFields[0].fields).filter(
    (item) => systemFieldNames.indexOf(item) !== -1
  )

  //  reset testFields
  testFields.splice(0, testFields.length)

  for (let i = 0; i < nameFields.length; i++) {
    if (
      !systemFieldNamesArr.includes(nameFields[i]) &&
      !allwaysIgnoreFields.includes(nameFields[i])
    ) {
      testFields?.push(
        <ListItem
          name={nameFields[i]}
          badgeName={badgeTypesNames[i]}
          systemFields={systemFieldNames}
        />
      )
    }
  }

  if (showSystemFields) {
    for (let i = 0; i < nameFields.length; i++) {
      if (systemFieldNamesArr.includes(nameFields[i])) {
        testFields?.push(
          <ListItem
            name={nameFields[i]}
            badgeName={badgeTypesNames[i]}
            systemFields={systemFieldNames}
          />
        )
      }
    }
  }

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
            setShowSystemFields(v)
          }}
        />
      </div>

      <CustomList
        items={testFields}
        itemSpace={12}
        draggable
        maxItemWidth={maxItemWidth}
        onDelete={() => {}}
      />
    </div>
  )
}
