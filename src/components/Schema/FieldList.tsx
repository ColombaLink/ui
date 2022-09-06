import React, { useEffect, useState } from 'react'
import { Checkbox } from '../Checkbox'
import { CustomList } from '../CustomList'
import { ListItem } from './ListItem'

export const FieldList = ({
  listItemsFields,
  maxItemWidth,
  schema,
  client,
  name,
}) => {
  const [testFields, setTestFields] = useState([])
  const [showSystemFields, setShowSystemFields] = useState(false)

  console.log('listItemsFields', listItemsFields)

  const systemFieldNames = ['id', 'type', 'children', 'parents']
  // const allwaysIgnoreFields = ['descendants', 'ancestors', 'aliases']

  let nameFields = listItemsFields.map((v) => v[0])
  const badgeTypesNames = listItemsFields.map((v) => v[1]?.type)

  console.log('nameFields', nameFields)
  console.log('badgeTypesNames', badgeTypesNames)

  let systemFieldNamesArr = listItemsFields
    .map((v) => v[0])
    .filter((item) => systemFieldNames.indexOf(item) !== -1)

  //  reset testFields
  testFields.splice(0, testFields.length)

  for (let i = 0; i < nameFields.length; i++) {
    if (!systemFieldNamesArr.includes(nameFields[i])) {
      testFields?.push(
        <ListItem
          fieldName={nameFields[i]}
          badgeName={badgeTypesNames[i]}
          systemFields={systemFieldNames}
          onDelete
          schema={schema}
          client={client}
          name={name}
        />
      )
    }
  }

  if (showSystemFields) {
    for (let i = 0; i < nameFields.length; i++) {
      if (systemFieldNamesArr.includes(nameFields[i])) {
        testFields?.push(
          <ListItem
            fieldName={nameFields[i]}
            badgeName={badgeTypesNames[i]}
            systemFields={systemFieldNames}
            onDelete
            schema={schema}
            client={client}
            name={name}
          />
        )
      }
    }
  }

  console.log('THE TEST FIELDS', testFields)

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
        // pass client, db and schema
        client={client}
        schema={schema}
        db={'default'}
        name={name}

        // Als de schema data changed update de testfields en de list dus...
      />
    </div>
  )
}
