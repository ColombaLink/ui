import { ArrowRightIcon, AttachmentIcon, LayersIcon, MoreIcon } from '~/icons'
import { border } from '~/utils'
import { Button } from '~/components/Button'
import { deepEqual } from '@saulx/utils'
import { FilterInput } from './FilterInput'
import { Pill } from './Pill'
import { ReferencesInput } from './ReferencesInput'
import { ResizableInput } from './ResizableInput'
import { SelectInput } from './SelectInput'
import { Text } from '~/components/Text'
import { useLocation } from '~/hooks'
import { ValueInput } from './ValueInput'
import React, { Fragment, useRef, useState } from 'react'

const operatorMap = {
  '=': 'is',
  '!=': 'is not',
  includes: 'includes',
  has: 'has',
}

const operatorByType = {
  string: 'includes',
  email: 'includes',
  url: 'includes',
  references: 'has',
  set: 'has',
}

const ScopePill = ({ query, setOverlay, setLocation }) => {
  return (
    <Pill>
      <Text color="text2">IN</Text>
      <>
        <LayersIcon color="accent" style={{ marginRight: 8 }} />
        <ResizableInput
          value={query.target}
          onSubmit={(value) => {
            setLocation(`?target=${value.trim()}`)
          }}
        />
      </>
      <>
        <AttachmentIcon color="accent" style={{ marginRight: 8 }} />
        <ReferencesInput
          target={query.target}
          onOverlay={setOverlay}
          value={query.field}
          onSubmit={(val) => {
            setLocation(`?field=${val}`)
          }}
        />
      </>
    </Pill>
  )
}

const Filters = ({ query, types, inputRef, setOverlay, setLocation }) => {
  return query.filters.map(({ $field, $operator, $value }, index) => {
    return (
      <Fragment key={index}>
        {index ? <Text color="accent">AND</Text> : null}
        <Pill>
          <Text color="text2">{$field}</Text>
          <SelectInput
            // TODO remove
            key={$operator}
            options={Object.keys(operatorMap).map((value) => {
              return { value, label: operatorMap[value] }
            })}
            value={$operator}
            onOverlay={setOverlay}
            onSubmit={(value) => {
              query.filters[index].$operator = value
              setLocation(
                `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
              )
            }}
          />
          <ValueInput
            types={types}
            field={$field}
            nextInputRef={inputRef}
            value={$value}
            onOverlay={setOverlay}
            onSubmit={(value) => {
              query.filters[index].$value = value
              setLocation(
                `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
              )
            }}
            onDelete={() => {
              inputRef.current.focus()
              setLocation(
                `?filter=${encodeURIComponent(
                  JSON.stringify(
                    query.filters.filter((_, i) => {
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
  })
}

export const Query = ({ types, fields, fieldTypes, query }) => {
  const [, setLocation] = useLocation()
  const [options, setOptions] = useState('')
  const [focused, setFocused] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const clearRef = useRef<Function>()
  const inputRef = useRef()

  const addFieldFilter = (field) => {
    const filter = {
      $field: field,
      $operator: operatorByType[fieldTypes[field]] || '=',
    }
    if (!query.filters.find((f) => deepEqual(f, filter))) {
      setLocation(
        `?filter=${encodeURIComponent(
          JSON.stringify([...query.filters, filter])
        )}`
      )
    }
    clearRef.current?.()
  }

  return (
    <>
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: focused || overlay ? border(2, 'accent') : border(1),
          borderRadius: 8,
          padding: focused || overlay ? 3 : 4,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '4px 12px',
        }}
      >
        <ScopePill
          query={query}
          setOverlay={setOverlay}
          setLocation={setLocation}
        />
        <ArrowRightIcon size={20} />
        <Filters
          query={query}
          types={types}
          inputRef={inputRef}
          setOverlay={setOverlay}
          setLocation={setLocation}
        />
        <FilterInput
          clearRef={clearRef}
          inputRef={inputRef}
          fields={fields}
          setOptions={setOptions}
          onDelete={() => {
            query.filters.pop()
            setLocation(
              `?filter=${encodeURIComponent(JSON.stringify(query.filters))}`
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
                  // textTransform: 'capitalize',
                }}
                outline
                key={field}
                onClick={() => {
                  addFieldFilter(field)
                }}
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
                // textTransform: 'capitalize',
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
    </>
  )
}
