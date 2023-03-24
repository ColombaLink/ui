import { ArrowRightIcon, AttachmentIcon, LayersIcon, MoreIcon } from '~/icons'
import { border, color } from '~/utils'
import { Button } from '~/components/Button'
import { deepEqual } from '@saulx/utils'
import { FilterInput } from './FilterInput'
import { Pill } from './Pill'
import { ReferencesInput } from './ReferencesInput'
import { ResizableInput } from './ResizableInput'
import { SelectInput } from './SelectInput'
import { Text } from '~/components/Text'
import { useRoute } from 'kabouter'
import { ValueInput } from './ValueInput'
import React, { Fragment, useRef, useState } from 'react'
import { isFilter, Filter } from './types'
export * from './types'

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

const logicalOperatorsMap = {
  and: 'AND',
  or: 'OR',
  not: 'NOT',
}

const ScopePill = ({ setOverlay }) => {
  const route = useRoute()
  const query = route.query

  const target = typeof query.target === 'string' ? query.target : 'root'
  const field = typeof query.field === 'string' ? query.field : 'descendants'

  return (
    <Pill>
      <Text color="text2">IN</Text>
      <>
        <LayersIcon color="accent" style={{ marginRight: 8 }} />
        <ResizableInput
          value={target}
          onSubmit={(value) =>
            route.setQuery({
              target: value.trim(),
            })
          }
        />
      </>
      <>
        <AttachmentIcon color="accent" style={{ marginRight: 8 }} />
        <ReferencesInput
          target={target}
          onOverlay={setOverlay}
          value={field}
          onSubmit={(field) =>
            route.setQuery({
              field,
            })
          }
        />
      </>
    </Pill>
  )
}

const Filters = ({ types, inputRef, setOverlay }) => {
  const route = useRoute()
  const filters: Filter[] = Array.isArray(route.query.filters)
    ? route.query.filters.filter(isFilter)
    : []

  return (
    <>
      {filters.map(({ $field, $operator, $value }, index) => {
        return (
          <Fragment key={index}>
            {index ? (
              <div
                style={{
                  border: `1px solid ${color('border')}`,
                  borderRadius: 4,
                  padding: '4px 8px',
                }}
              >
                <SelectInput
                  value="and"
                  options={Object.keys(logicalOperatorsMap).map((value) => {
                    return { value, label: operatorMap[value] }
                  })}
                  onOverlay={setOverlay}
                  onSubmit={() => {
                    // const operator = '$' + value
                    // so now add this operator at the end of this index
                    filters[index - 1].$and = {}
                  }}
                />
              </div>
            ) : null}
            <Pill>
              {/* left side of the pill */}
              <Text color="text2">{$field}</Text>
              {/* center of the pill */}
              <SelectInput
                // TODO remove
                key={$operator}
                options={Object.keys(operatorMap).map((value) => {
                  return { value, label: operatorMap[value] }
                })}
                value={$operator}
                onOverlay={setOverlay}
                onSubmit={(value) => {
                  const newFilters = [...filters]
                  newFilters[index].$operator = value
                  route.setQuery({ filters: newFilters })
                }}
              />
              {/* right side of the pill */}
              <ValueInput
                types={types}
                field={$field}
                nextInputRef={inputRef}
                value={$value}
                onOverlay={setOverlay}
                onSubmit={(value) => {
                  const newFilters = [...filters]
                  newFilters[index].$value = value
                  route.setQuery({ filters: newFilters })
                }}
                onDelete={() => {
                  inputRef.current.focus()
                  route.setQuery({
                    filters: filters.filter((_, i) => {
                      return i !== index
                    }),
                  })
                }}
              />
            </Pill>
          </Fragment>
        )
      })}
    </>
  )
}

export const Query = ({ types, fields, fieldTypes }) => {
  const route = useRoute()
  const [options, setOptions] = useState('')
  const [focused, setFocused] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const clearRef = useRef<Function>()
  const inputRef = useRef()

  const filters: Filter[] = Array.isArray(route.query.filters)
    ? route.query.filters.filter(isFilter)
    : []

  const addFieldFilter = (field: string) => {
    const filter = {
      $field: field,
      $operator: operatorByType[fieldTypes[field]] || '=',
    }
    if (filters.find((f) => deepEqual(f, filter))) {
      route.setQuery({
        filter: [...filters, filter],
      })
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
          gap: '4px 8px',
        }}
      >
        <ScopePill setOverlay={setOverlay} />
        <ArrowRightIcon size={20} />
        <Filters types={types} inputRef={inputRef} setOverlay={setOverlay} />
        <FilterInput
          clearRef={clearRef}
          inputRef={inputRef}
          fields={fields}
          setOptions={setOptions}
          onDelete={() =>
            route.setQuery({
              filter: filters.slice(0, -1),
            })
          }
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
