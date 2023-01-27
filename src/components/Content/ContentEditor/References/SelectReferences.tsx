import React, { useState, useEffect, useRef } from 'react'

import {
  border,
  Badge,
  Text,
  Checkbox,
  useSchemaTypes,
  color,
  Input,
  CloseIcon,
  LoadingIcon,
  InfiniteList,
} from '~'
import { useDescriptor } from '../../hooks/useDescriptor'
import { Dialog } from '~/components/Dialog'
import { useWindowResize } from '~/hooks/useWindowResize'
import { getImageSrcFromId } from '~/utils/getImageSrcFromId'
import { styled } from 'inlines'
import { getNameFromId } from '~/utils/getNameFromId'
import { toDateString } from '~/utils/date'

const SelectReferencesItemDescriptor = ({ id }) => {
  const { descriptor, loading } = useDescriptor(id)
  return loading ? null : <Text>{descriptor}</Text>
}

const SelectReferencesItem = ({ style, data, index }) => {
  const item = data.items[index]

  // console.log(data.checkedIds, '🍯')
  // console.log(data.dialogRef.current.childNodes[1], '🍯')

  const refToScrollDiv = data.dialogRef.current.childNodes[1].childNodes[0]

  if (!item) {
    return (
      <div
        style={{
          borderBottom: border(1),
          ...style,
        }}
      />
    )
  }
  const checked = data.selected.has(item.id)
  const afbThumb = getImageSrcFromId(item.id)

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        alignItems: 'center',
        padding: '0 24px',
        ...style,
      }}
    >
      <Checkbox
        checked={data.singleRef ? index === data.checkedIds[0] : checked}
        onChange={() => {
          // if het single reference is
          if (data.singleRef) {
            if (checked) {
              data.selected.delete(item.id)
              data.dialogRef.current.childNodes[1].childNodes[0].scroll(0, 1)
            } else {
              data.selected.add(item.id)
              data.checkedIds.push(index)
              data.checkedIds.shift()

              // Scroll to force a rerender 1!!
              refToScrollDiv.scrollBy(0, 5)
            }
          } else {
            if (checked) {
              data.selected.delete(item.id)
            } else {
              data.selected.add(item.id)
            }
          }
        }}
      />

      <Badge
        style={{
          marginRight: 16,
          fontFamily: 'monospace',
        }}
      >
        {item.id}
      </Badge>

      <SelectReferencesItemDescriptor id={item.id} />

      {afbThumb ? (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            width: 44,
            height: 44,
          }}
        />
      ) : null}
      <Text style={{ marginLeft: 16 }}>{getNameFromId(item.id)}</Text>
      <div style={{ flexGrow: 1 }} />
      <Badge style={{ marginLeft: 16 }}>{item.type}</Badge>
      <Text style={{ marginLeft: 16 }}>{toDateString(item.createdAt)}</Text>
    </div>
  )
}

export const SelectReferences = ({
  onChange,
  setRefArray,
  singleRef = false,
  close,
}) => {
  const [filter, setFilter] = useState('')
  const { types, loading } = useSchemaTypes()
  const [typing, setTyping] = useState(false)
  const selected = useRef<Set<string>>()

  const { width, height } = useWindowResize()
  const dialogRef = useRef<HTMLDivElement>(null)

  const checkedIds = []

  if (typing) {
    if (selected.current) {
      selected.current = null
    }
  } else if (!selected.current) {
    selected.current = new Set()
  }

  useEffect(() => {
    if (filter) {
      setTyping(true)
      const timer = setTimeout(() => {
        setTyping(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setTyping(false)
    }
  }, [filter])

  if (loading) return null

  const queryFields = Object.keys(types).reduce((set, type) => {
    for (const key in types[type].fields) {
      const field = types[type].fields[key]
      if (field.type === 'string' || field.type === 'id') {
        set.add(key)
      }
    }
    return set
  }, new Set())

  return (
    <Dialog
      ref={dialogRef}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        marginLeft: '16px',
        marginRight: '16px',
        flexDirection: 'column',
      }}
      pure
      label={
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{singleRef ? 'Select a reference' : 'Select References'}</div>
            <styled.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 32,
                width: 32,
                marginLeft: 'auto',
                borderRadius: 16,
                backgroundColor: color('lighttext'),
                '&:hover': {
                  backgroundColor: color('lighttext:hover'),
                },
              }}
              onClick={() => close()}
            >
              <CloseIcon size={14} />
            </styled.div>
          </div>

          <Input
            ghost
            style={{
              marginTop: 12,
              backgroundColor: color('background2'),
              boxShadow: '0px',
              outline: 'none',
              height: 40,
              alignItems: 'center',
              borderRadius: 8,
              paddingTop: '4px',
              paddingLeft: '16px',
            }}
            value={filter}
            onChange={(val) => {
              setFilter(val.trim())
            }}
          />
        </>
      }
    >
      {typing ? (
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingIcon />
        </div>
      ) : (
        <div
          style={{
            flexGrow: 1,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <InfiniteList
            target="root"
            height={height - 210}
            itemSize={55}
            itemData={(items) => ({
              items,
              selected: selected.current,
              singleRef: singleRef,
              checkedIds: checkedIds,
              dialogRef: dialogRef,
            })}
            query={($offset, $limit) => {
              const query = {
                id: true,
                createdAt: true,
                type: true,
                $list: {
                  $offset,
                  $limit,
                  $find: {
                    $traverse: 'descendants',
                    //  $filter: {},
                  } as any,
                },
              }

              if (filter) {
                let f
                queryFields.forEach(($field) => {
                  const obj = {
                    $field,
                    $operator: 'includes',
                    $value: filter,
                  }
                  if (f) {
                    f = f.$or = obj
                  } else {
                    f = query.$list.$find.$filter = obj
                  }
                })
              }

              return query
            }}
          >
            {SelectReferencesItem}
          </InfiniteList>
        </div>
      )}
      <div
        style={{
          padding: 24,
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: border(1),
        }}
      >
        <Dialog.Confirm
          space="16px"
          onConfirm={() => {
            setRefArray([...selected.current])
            if (singleRef) {
              onChange(Array.from(selected.current)[0])
            } else {
              onChange(Array.from(selected.current))
            }
          }}
        >
          Confirm
        </Dialog.Confirm>
      </div>
    </Dialog>
  )
}
