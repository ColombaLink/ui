import React, { FC } from 'react'
import { styled, Input, Badge, color, Toggle, FileUpload } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'

// meta type finally complete from schema

// todo make meta / type system complete

export const ContentEditor: FC<{
  data: { [key: string]: any }
  fields: { key: string; meta?: string; name?: string; type: string }[]
}> = ({ data, fields }) => {
  // get by fields
  // . . . .

  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer item={item} itemValue={data[item.key]} key={i} />
      ))}
    </styled.div>
  )
}

const ContentRenderer = ({ item, itemValue }) => {
  // all the types
  // references, type, id, set, string, digest, number, url, text

  const type = item.type
  const meta = item.meta
  const name = item.name ?? item.key

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
