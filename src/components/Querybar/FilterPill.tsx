import React, { useState } from 'react'
import { Input } from '~/components/Input'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'

export const FilterPill = ({
  query,
  setQuery,
  index,
  setNumberOfFilterPills,
  numberOfFilterPills,
  setArrayOfOperators,
  arrayOfOperators,
}) => {
  const [andOrValue, setAndOrValue] = useState('$and')
  const [field, setField] = useState('')
  const [operator, setOperator] = useState('=')
  const [customValue, setCustomValue] = useState('')

  //   console.log('incoming array of operators', arrayOfOperators)

  return (
    <div style={{ display: 'flex', border: '1px solid blue' }}>
      index: {index}
      <Select
        value={andOrValue}
        options={['$and', '$or']}
        onChange={(value) => {
          console.log('value', value)
          setAndOrValue(value)

          // also change in the right place in the array TODO
          // als het bestaat
          if (value === '$or') {
            query.filters[0].$or = query.filters[0].$and
            delete query.filters[0].$and
          } else if (value === '$and') {
            query.filters[0].$and = query.filters[0].$or
            delete query.filters[0].$or
          }

          // if (value === '$and') {
          //   let tempObj = query.filters[0].$or
          //   query.filters[0].$and = tempObj
          //   delete query.filters[0].$or
          // }

          setQuery({ ...query })
        }}
        style={{ width: 96 }}
      />
      <Input value={field} onChange={(e) => setField(e)} />
      <Select
        value={operator}
        options={['=', '!=', 'includes', 'has']}
        style={{ width: 100 }}
        onChange={(e) => setOperator(e)}
      />
      <Input value={customValue} onChange={(e) => setCustomValue(e)} />
      <Button
        onClick={() => {
          // add new filter to the query

          if (index === 1) {
            query.filters[0][arrayOfOperators[0]][andOrValue] = {
              $field: field,
              $operator: operator,
              $value: customValue,
            }

            console.log('arrayOfOperators', arrayOfOperators)
            setArrayOfOperators([...arrayOfOperators, andOrValue])
          } else if (index >= 2) {
            // index is 2 get all of this before the index
            query.filters[0][arrayOfOperators[0]][arrayOfOperators[1]][
              andOrValue
            ] = {
              $field: field,
              $operator: operator,
              $value: customValue,
            }

            //   console.log('testje ⌛️', testje.join('.'))

            setArrayOfOperators([...arrayOfOperators, andOrValue])
          } else {
            console.log('first index = 0')
            query.filters[0][andOrValue] = {
              $field: field,
              $operator: operator,
              $value: customValue,
            }
            setArrayOfOperators([andOrValue])
          }

          //   console.log('ARRAY OF OPERATORS', arrayOfOperators)
          setQuery({ ...query })
          setNumberOfFilterPills(numberOfFilterPills + 1)
        }}
      >
        test
      </Button>
      <Button
        onClick={() => {
          // loopThroughObj(query.filters[0])

          stringifyObjects(query.filters[0])
        }}
      >
        LOG CONSOLE
      </Button>
      <Button
        onClick={() => {
          // loopThroughObj(query.filters[0])

          stringifyObjects(query.filters[0])
        }}
      >
        TEST REPLACE
      </Button>
    </div>
  )
}

const loopThroughObj = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      console.log('key', key, '---->', obj[key])
      if (key === '$or' || key === '$and') {
        console.log('flark 🩸', obj[key])
      }
      if (typeof obj[key] === 'object') {
        loopThroughObj(obj[key])
      }
    }
  }
}

const stringifyObjects = (obj) => {
  let stringifiedObj = JSON.stringify(obj)

  if (stringifiedObj.includes('$or') || stringifiedObj.includes('$and')) {
    console.log('hallo 🌞')

    stringifiedObj = stringifiedObj.replace(/"\$and"/g, '"$or"')
  }

  console.log(stringifiedObj.toUpperCase(), 'stringie 🌞')

  console.log(JSON.parse(stringifiedObj), 'parsed 🪩')
}
