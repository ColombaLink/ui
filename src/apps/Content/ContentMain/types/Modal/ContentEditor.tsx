import { useClient } from '@based/react'
import React, { FC, useState } from 'react'
import { styled, Input, Badge, color, Toggle, FileUpload } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'

// meta type finally complete from schema

// todo make meta / type system complete

export const ContentEditor: FC<{
  data: { [key: string]: any }
  state: { [key: string]: any }
  fields: {
    key: string
    meta?: string
    name?: string
    type: string
    mimeType?
  }[]
  setState: (state: { [key: string]: any }) => void
}> = ({ data, fields, setState, state }) => {
  return (
    <styled.div style={{ maxWidth: 742, margin: '48px auto' }}>
      {fields?.map((item, i) => (
        <ContentRenderer
          state={state}
          setState={setState}
          data={data}
          item={item}
          itemValue={data[item.key]}
          key={i}
        />
      ))}
    </styled.div>
  )
}

const ContentRenderer: FC<{
  item: { [key: string]: any }
  itemValue: any
  data: any
  state: { [key: string]: any }
  setState: (state: { [key: string]: any }) => void
}> = ({ item, itemValue, setState, state, data }) => {
  // references, type, id, set, string, digest, number, url, text

  const client = useClient()
  // state

  const { type, meta, key } = item
  const name = item.name ?? key

  const onChange = (v: any) => {
    setState({ [key]: v })
  }

  // state no
  // TODO double check this
  itemValue = itemValue ?? state[key]

  const BOTTOMSPACE = 32

  if (type === 'boolean') {
    return (
      <Toggle
        label={name}
        value={itemValue}
        style={{ marginBottom: BOTTOMSPACE }}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
        style={{ marginBottom: BOTTOMSPACE }}
        indent
      />
    )
  }

  if (meta?.type === 'file') {
    console.info(
      'MY STATE',
      state[key],
      state[key]?.src && state[key]?.name && state[key]?.type
    )

    const [progress, setProgress] = useState(null)

    return (
      <div>
        {/* {progress * 100}% */}
        <FileUpload
          label={name}
          descriptionBottom="Drag and drop or click to upload"
          description={
            meta?.mime?.length > 0
              ? `Allowed types: ${meta?.mime.join(', ')}`
              : null
          }
          progress={progress}
          onChange={(files) => {
            // updateProgess
            // console.info('FIRE', files[0])

            client
              .stream('db:file-upload', { contents: files[0] }, (e) =>
                setProgress(e)
              )
              .then(async (v) => {
                const { mimeType, name } = await client
                  .query('db', {
                    $id: v.id,
                    mimeType: true,
                    name: true,
                  })
                  .get()
                onChange({ ...v, mimeType, name })
              })
          }}
          indent
          value={
            state[key]?.src
              ? [
                  {
                    src: state[key]?.src,
                    type: state[key]?.mimeType ?? data[key]?.mimeType,
                    name: state[key]?.name ?? data[key]?.name,
                  },
                ]
              : [
                  {
                    src: data[key]?.src,
                    type: data[key]?.mimeType,
                    name: data[key]?.name,
                  },
                ]
          }
          style={{ marginBottom: BOTTOMSPACE }}
          mime={meta?.mime}
        />
      </div>
    )
  }

  if (type === 'id') {
    return <Badge>{itemValue}</Badge>
  }

  if (type === 'json') {
    return (
      <Input
        label={name}
        type="json"
        value={itemValue}
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
        onChange={onChange}
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
          onChange={onChange}
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
