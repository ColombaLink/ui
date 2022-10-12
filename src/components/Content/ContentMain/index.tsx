import { Table } from '~/components/Table'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useData, useSchema } from '@based/react'
import { alwaysIgnore } from '~/components/Schema/templates'
import { border, color } from '~/utils'
import { useLocation, usePropState, useSchemaTypes, useSelect } from '~/hooks'
import { Badge } from '~/components/Badge'
import {
  AddIcon,
  ArrowRightIcon,
  AttachmentIcon,
  DeleteIcon,
  DotIcon,
  LayersIcon,
  MoreIcon,
} from '~/icons'
import { deepEqual, parseQuery } from '@saulx/utils'
import { Text } from '~/components/Text'
import { Input } from '~/components/Input'
import { Button } from '~/components/Button'
import { MultiSelect, Select } from '~/components/Select'
import { cornersOfRectangle } from '@dnd-kit/core/dist/utilities/algorithms/helpers'
import { styled } from 'inlines'
import { ScrollArea } from '~/components/ScrollArea'

const Pill = ({ children }) => {
  if (!Array.isArray(children)) {
    children = [children]
  }
  return (
    <div
      style={{
        height: 30,
        display: 'flex',
        borderRadius: 4,
        backgroundColor: color('lighttext'),
      }}
    >
      {children.map((child, index) => {
        return (
          <styled.label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              borderLeft: index ? border(1) : null,
              cursor: index ? 'pointer' : null,
              '&:hover': index
                ? {
                    backgroundColor: color('lighttext:hover'),
                    borderLeft: '1px solid transparent',
                  }
                : null,
            }}
          >
            {child}
          </styled.label>
        )
      })}
    </div>
  )
}

const FilterInput = ({
  inputRef,
  clearRef,
  fields,
  setOptions,
  onDelete,
  onSubmit,
  onFocused,
}) => {
  const options = useRef([])
  const [value, setValue] = useState('')

  useEffect(() => {
    clearRef.current = () => setValue('')
  }, [])

  useEffect(() => {
    setOptions(options.current.join(','))
  }, [value])

  return (
    <Input
      inputRef={inputRef}
      style={{ flexGrow: 1 }}
      onFocus={() => {
        onFocused(true)
      }}
      onBlur={() => {
        onFocused(false)
        setValue('')
      }}
      ghost
      placeholder="Type to search and filter"
      value={value}
      onChange={setValue}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (!e.currentTarget.value) {
            onDelete()
          }
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          if (!e.shiftKey) {
            onSubmit(options.current[0])
            e.preventDefault()
          }
        }
      }}
      suggest={(value) => {
        if (value) {
          const lowerCased = value.toLowerCase()

          options.current = fields.filter((field) =>
            field.toLowerCase().startsWith(lowerCased)
          )

          return options.current[0]
            ? `${value}${options.current[0].substring(value.length)}`
            : null
        }
        options.current = []
        return null
      }}
    />
  )
}

// const Filter = () => {

// }

const ResizableInput = ({ value: valueProp, onSubmit, inputRef, onDelete }) => {
  const ctx = useRef<CanvasRenderingContext2D>()
  const [value, setValue] = usePropState(valueProp)
  const [width, setWidth] = useState(40)

  if (!ctx.current) {
    const c = document.createElement('canvas')
    ctx.current = c.getContext('2d')
    ctx.current.font = '500 16px Font'
  }

  useEffect(() => {
    const { width } = ctx.current.measureText(value || '')
    setWidth(Math.ceil(width) + 1)
  }, [value])

  return (
    <Input
      placeholder=""
      ghost
      value={value}
      onChange={setValue}
      autoFocus
      style={{ width }}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (!value) {
            onDelete()
          }
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          if (!e.shiftKey) {
            if (value) {
              onSubmit(value)
            }
            e.currentTarget.blur()
            inputRef.current.focus()
            e.preventDefault()
          }
        }
      }}
    />
  )
}

const TypeInput = ({ types, onSubmit, inputRef, value }) => {
  const ref = useRef()
  const [currentValue, open] = useSelect(Object.keys(types), value, {
    variant: 'over',
    filterable: true,
    placement: 'left',
  })

  useEffect(() => {
    if (currentValue) {
      onSubmit(currentValue)
      inputRef.current.focus()
    }
  }, [currentValue])

  useEffect(() => {
    if (!value) {
      open({ currentTarget: ref.current })
    }
  }, [])

  return (
    <button
      ref={ref}
      onClick={(e) => {
        open(e)
      }}
    >
      <Text>{currentValue}</Text>
    </button>
  )
}

const ValueInput = (props) => {
  if (props.field === 'type') {
    return <TypeInput {...props} />
  }
  return <ResizableInput {...props} />
}

const operatorMap = {
  '=': 'Is',
  '!=': 'Is Not',
  includes: 'Includes',
}

export const ContentMain = ({ style }) => {
  const { loading, types } = useSchemaTypes()
  const [, setLocation] = useLocation()
  const [options, setOptions] = useState('')
  const [focused, setFocused] = useState(false)
  const clearRef = useRef()
  const inputRef = useRef()

  if (loading) return null

  const q = parseQuery(window.location.search.substring(1))
  const filters = q.filter ? JSON.parse(decodeURIComponent(q.filter)) : []
  const target = q.id ? String(q.id) : 'root'
  const field = q.field || 'descendants'

  const set = new Set(['type', 'id', 'name', 'children'])
  const indexed = []
  const other = new Set()
  const includedTypes = Object.keys(types)
  const fieldTypes = {}

  includedTypes.forEach((type) => {
    const { fields } = types[type]
    for (const field in fields) {
      if (!alwaysIgnore.has(field)) {
        const index = fields[field].meta?.index
        fieldTypes[field] = fields[field].type
        if (index === undefined) {
          other.add(field)
        } else if (!(index in indexed)) {
          indexed[index] = new Set([field])
        } else {
          indexed[index].add(field)
        }
      }
    }
  })

  const addField = (field) => set.add(field)
  indexed.forEach((fields) => fields.forEach(addField))
  other.forEach(addField)

  const fields = Array.from(set)

  // if (!fields.length) {
  //   return null

  const addFieldFilter = (field) => {
    console.log(fieldTypes, field, fieldTypes[field])
    const filter = {
      $field: field,
      $operator:
        fieldTypes[field] === 'string' ||
        fieldTypes[field] === 'email' ||
        fieldTypes[field] === 'url'
          ? 'includes'
          : '=',
    }
    if (!filters.find((f) => deepEqual(f, filter))) {
      setLocation(
        `?filter=${encodeURIComponent(JSON.stringify([...filters, filter]))}`
      )
    }
    clearRef.current?.()
  }

  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div
        style={{
          padding: 24,
        }}
      >
        <div
          style={{
            border: border(1),
            borderRadius: 8,
            padding: 4,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <Pill>
            <Text color="text2">IN</Text>
            <>
              <LayersIcon color="accent" style={{ marginRight: 8 }} />
              <Text capitalize>{target}</Text>
            </>
            <>
              <AttachmentIcon color="accent" style={{ marginRight: 8 }} />
              <Text capitalize>{field}</Text>
            </>
          </Pill>
          <ArrowRightIcon size={20} />
          {filters.map(({ $field, $operator, $value }, index) => {
            return (
              <Fragment key={index}>
                {index ? <Text color="accent">AND</Text> : null}
                <Pill>
                  <Text color="text2" capitalize>
                    {$field}
                  </Text>
                  <Text color="text2">{operatorMap[$operator]}</Text>
                  <ValueInput
                    types={types}
                    field={$field}
                    inputRef={inputRef}
                    value={$value}
                    onSubmit={(value) => {
                      filters[index].$value = value
                      setLocation(
                        `?filter=${encodeURIComponent(JSON.stringify(filters))}`
                      )
                    }}
                    onDelete={() => {
                      inputRef.current.focus()
                      setLocation(
                        `?filter=${encodeURIComponent(
                          JSON.stringify(
                            filters.filter((_, i) => {
                              return i !== index
                            })
                          )
                        )}`
                      )
                    }}
                  />
                </Pill>
              </Fragment>
            )
          })}
          {focused && filters.length ? <Text color="accent">AND</Text> : null}
          <FilterInput
            onFocused={setFocused}
            clearRef={clearRef}
            inputRef={inputRef}
            fields={fields}
            setOptions={setOptions}
            onDelete={() => {
              filters.pop()
              setLocation(
                `?filter=${encodeURIComponent(JSON.stringify(filters))}`
              )
            }}
            onSubmit={(value) => {
              addFieldFilter(value || fields[0])
            }}
          />
        </div>
        <div style={{ display: 'flex', marginTop: 8 }}>
          {((options && options.split(',')) || fields).map((field, index) => {
            if (index > 6) {
              return null
            }
            if (index === 6) {
              return (
                <Button
                  icon={MoreIcon}
                  color="text2"
                  style={{
                    padding: '2px 8px',
                    border: border(1),
                    marginRight: 8,
                    textTransform: 'capitalize',
                  }}
                  outline
                  key={field}
                  // onClick={() => {
                  //   addFieldFilter(field)
                  // }}
                />
              )
            }
            return (
              <Button
                color="text2"
                style={{
                  padding: '2px 8px',
                  border: border(1),
                  marginRight: 8,
                  textTransform: 'capitalize',
                }}
                outline
                key={field}
                onClick={() => {
                  addFieldFilter(field)
                }}
              >
                {index ? field : `${field} (Tab)`}
              </Button>
            )
          })}
        </div>
      </div>
      <Table
        key={fields.length}
        fields={fields}
        target={target}
        language="en"
        // onClick={(field, value, { type, id }) => {
        //   if (value !== undefined) {
        //     const fieldType = types[type].fields[field].type
        //     if (fieldType === 'references') {
        //       setLocation(`?id=${id}&field=${field}&filter=${0}`)
        //     } else {
        //       const filter = {
        //         $field: field,
        //         $operator: '=',
        //         $value: value,
        //       }
        //       if (!filters.find((f) => deepEqual(f, filter))) {
        //         setLocation(
        //           `?filter=${encodeURIComponent(
        //             JSON.stringify([...filters, filter])
        //           )}`
        //         )
        //       }
        //     }
        //   }
        // }}
        query={($offset, $limit, $field, $order) => {
          const query = {
            $list: {
              $offset,
              $limit,
              $sort: {
                $field,
                $order,
              },
              $find: {
                $traverse: field,
                $filter: filters.filter(({ $field, $operator, $value }) => {
                  if (!$field || !$operator) {
                    return false
                  }
                  if (!$value) {
                    if ($operator !== 'exists' && $operator !== 'notExists') {
                      return false
                    }
                  }
                  return true
                }),
              },
            },
          }
          fields.forEach((field) => {
            query[field] = true
          })

          return query
        }}
      />
    </div>
  )
}
