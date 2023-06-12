import React from 'react'
import { styled } from 'inlines'
import { useSchema } from '~/apps/Schema'
import { Input } from '~/components/Input'

// TODO: get the right fields based on the schema types
// TODO: check if something is changed
// TODO: on publish --> function db:set

export const ContentEditor = ({ rowData }) => {
  console.log('rowData from ContentEditor comp modal', rowData)

  const { loading, schema } = useSchema('default')

  const schemaFieldsDataBasedOnType = schema.types[rowData.type]?.fields

  console.log('schema??', schemaFieldsDataBasedOnType)

  const arrayOfFields = Object.entries(schemaFieldsDataBasedOnType).map(
    (e) => ({ [e[0]]: e[1] })
  )

  // need type/ id

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {arrayOfFields?.map((item, i) => (
        <ContentRenderer
          item={item}
          key={i}
          itemName={Object.keys(item)}
          itemValue={rowData[Object.keys(item).toString()]}
        />
      ))}
    </styled.div>
  )
}

const ContentRenderer = ({ item, itemName, itemValue }) => {
  console.log('item??', item)
  console.log('item name', itemName)

  // all the types
  // references, timestamp, type, id, set, string, digest, number, url, text

  const type = item[itemName.toString()].type
  const name =
    itemName.toString().charAt(0).toUpperCase() + itemName.toString().slice(1)

  const BOTTOMSPACE = 24

  if (type === 'digest') {
    return (
      <Input
        label={name}
        type="digest"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'email') {
    return (
      <Input
        label={name}
        type="email"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'id') {
    return (
      <Input
        label={name}
        type="text"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        disabled
      />
    )
  }

  if (type === 'number') {
    return (
      <Input
        label={name}
        type="number"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'string') {
    return (
      <Input
        label={name}
        type="text"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (type === 'timestamp') {
    return (
      <Input
        label={name}
        type="number"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        descriptionBottom={new Date(itemValue).toString()}
        indent
      />
    )
  }

  return <styled.div>{name + ' : ' + type}</styled.div>
}
