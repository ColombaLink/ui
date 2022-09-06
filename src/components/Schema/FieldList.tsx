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
  // const [showSystemFields, setShowSystemFields] = useState(false)

  const systemFieldNames = ['id', 'type', 'children', 'parents']

  let nameFields = listItemsFields.map((v) => v[0])
  const badgeTypesNames = listItemsFields.map((v) => v[1]?.type)

  let systemFieldNamesArr = listItemsFields
    .map((v) => v[0])
    .filter((item) => systemFieldNames.indexOf(item) !== -1)

  //  reset testFields
  testFields.splice(0, testFields.length)

  // for (let i = 0; i < nameFields.length; i++) {
  //   if (!systemFieldNamesArr.includes(nameFields[i])) {
  //     testFields?.push(
  //       <ListItem
  //         fieldName={nameFields[i]}
  //         badgeName={badgeTypesNames[i]}
  //         systemFields={systemFieldNames}
  //         onDelete
  //         schema={schema}
  //         client={client}
  //         name={name}
  //       />
  //     )
  //   }
  // }

  // if (showSystemFields) {
  //   for (let i = 0; i < nameFields.length; i++) {
  //     if (systemFieldNamesArr.includes(nameFields[i])) {
  //       testFields?.push(
  //         <ListItem
  //           fieldName={nameFields[i]}
  //           badgeName={badgeTypesNames[i]}
  //           systemFields={systemFieldNames}
  //           onDelete
  //           schema={schema}
  //           client={client}
  //           name={name}
  //         />
  //       )
  //     }
  //   }
  // }

  for (let i = 0; i < nameFields.length; i++) {
    testFields?.push(
      <ListItem
        fieldName={nameFields[i]}
        badgeName={badgeTypesNames[i]}
        // systemFields={systemFieldNames}
        onDelete
        schema={schema}
        client={client}
        name={name}
        isSystemField={systemFieldNamesArr.includes(nameFields[i])}
      />
    )
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <CustomList
        items={testFields}
        itemSpace={12}
        draggable
        maxItemWidth={maxItemWidth}
        //  showSystemFields={showSystemFields}
        // pass client, db and schema
        client={client}
        schema={schema}
        db={'default'}
        name={name}
        fieldData={listItemsFields}
      />
    </div>
  )
}
