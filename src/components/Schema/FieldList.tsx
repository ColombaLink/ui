import React, { useEffect } from 'react'
import { Checkbox } from '../Checkbox'
import { CustomList } from '../CustomList'
import { ListItem } from './ListItem'

export const FieldList = ({ listItemsFields }) => {
  let items = listItemsFields

  console.log('Items', items)
  console.log('Items hal', items[0])

  const test = ['2i', 'aefa']

  const nameFields = Object.keys(items[0].fields)
  const badgeTypes = Object.keys(items[0].fields.type)

  console.log('nameFields', nameFields)
  console.log('badgeTypes', badgeTypes)

  const testFields = []

  for (let i = 0; i < nameFields.length; i++) {
    testFields.push(<ListItem name={nameFields[i]} />)
  }

  //   useEffect(() => {
  //     items[0].map((field, index) => newFields.push(<div key={index}>blah</div>))

  //     console.log(newFields)
  //   }, [items[0].fields])

  //   console.log('newFields', newFields)

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 600, width: 600, margin: '0 auto' }}>
        <Checkbox space="16px" description="Show system fields" />
        <CustomList items={testFields} itemSpace={12} draggable />
      </div>
    </div>
  )
}
