import React from 'react'
import { styled, Input, Badge, color, Toggle, FileUpload } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'

// TODO: get the right fields based on the schema types
// TODO: check if something is changed
// TODO: on publish --> function db:set
// TODO: add onchange to these componentns

export const ContentEditor = ({ data, fields }) => {
  console.log('🟥', data)
  console.log('🟧', fields)

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer item={item} itemValue={data[item.field]} key={i} />
      ))}
    </styled.div>
  )
}

const ContentRenderer = ({ item, itemValue }) => {
  // console.log('item??', item)
  // console.log('item name', itemName)
  // console.log('item value', itemValue)

  // all the types
  // references, type, id, set, string, digest, number, url, text

  const type = item.type
  const meta = item.meta
  const name = item.name

  const BOTTOMSPACE = 32

  if (type === 'boolean') {
    return (
      <Toggle
        label={name}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  // if (meta.name === 'children') {
  //   return (
  //     <InputWrapper label={name} style={{ marginBottom: BOTTOMSPACE }} indent>
  //       {itemValue?.map((item, i) => (
  //         <styled.div
  //           style={{
  //             border: `1px solid ${color('border')}`,
  //             borderRadius: 4,
  //             marginBottom: 4,
  //             height: 40,
  //             width: '100%',
  //             display: 'flex',
  //             padding: 12,
  //             alignItems: 'center',
  //           }}
  //           key={i}
  //         >
  //           <Text style={{ marginRight: 12 }}>{item.type}</Text>
  //           <Badge>{item.id}</Badge>
  //         </styled.div>
  //       ))}
  //     </InputWrapper>
  //   )
  // }

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

  if (meta?.format?.includes('file')) {
    return (
      <FileUpload
        label={name}
        descriptionBottom="Drag and drop or click to upload"
        onChange={(files) => console.log(files)}
        indent
        value={[
          {
            src: itemValue,
          },
        ]}
        style={{ marginBottom: BOTTOMSPACE }}
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

  if (type === 'json') {
    return (
      <Input
        label={name}
        type="json"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (meta?.format === 'markdown') {
    return (
      <Input
        label={name}
        type="markdown"
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
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

  if (type === 'string' || type === 'text') {
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

  if (type === 'type') {
    return (
      <InputWrapper
        label={name}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
        value=""
      >
        <Badge>{itemValue}</Badge>
      </InputWrapper>
    )
  }

  if (type === 'timestamp') {
    return (
      <Input
        label={name}
        type="date"
        time
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        descriptionBottom={new Date(itemValue).toString()}
        indent
      />
    )
  }

  if (type === 'url' || type === 'thumb') {
    return (
      <styled.div style={{ display: 'flex', alignItems: 'center' }}>
        <styled.div
          style={{
            backgroundColor: color('background2'),
            backgroundImage: `url(${itemValue})`,
            backgroundSize: 'cover',
            height: 32,
            width: 32,
            marginRight: 16,
          }}
        />
        <Input
          label={name}
          type="text"
          value={itemValue}
          style={{ marginBottom: BOTTOMSPACE, flexGrow: 1 }}
        />
      </styled.div>
    )
  }

  return (
    <styled.div style={{ marginBottom: 12 }}>{name + ' : ' + type}</styled.div>
  )
}
