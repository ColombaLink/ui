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

  const changeAndOr = (obj, index, operator) => {
    let stringifiedObj = JSON.stringify(obj)

    // count number of $and and $or at indexes
    console.log(stringifiedObj, 'stringifiedObj 🌞 from and or')
  }

  const changeOperator = (index, operator) => {}

  const nestFilters = (object, arr) => {
    const query = {}
    let target = query
    object.forEach((obj, index) => {
      Object.assign(target, obj)
      const l = arr[index]
      if (l) {
        target = target[l] = {}
      }
    })
    console.log('query 🐸', query)
    setQuery({ ...query })
  }

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
          console.log(index, 'index 🌞')

          changeAndOr(query.filters, index, value)
          arrayOfOperators[index] = value
          setArrayOfOperators([...arrayOfOperators])
        }}
        style={{ width: 96 }}
      />
      <Input value={field} onChange={(e) => setField(e)} />
      <Select
        value={operator}
        options={['=', '!=', 'includes', 'has']}
        style={{ width: 100 }}
        onChange={(e) => {
          console.log('index', index)

          query.filters[index + 1].$operator = e
          setQuery({ ...query })
          setOperator(e)
        }}
      />
      <Input value={customValue} onChange={(e) => setCustomValue(e)} />
      <Button
        onClick={() => {
          // add new filter to the query

          query.filters.push({
            $field: field,
            $operator: operator,
            $value: customValue,
          })

          setArrayOfOperators([...arrayOfOperators, andOrValue])
          setQuery({ ...query })
          setNumberOfFilterPills(numberOfFilterPills + 1)
        }}
      >
        Add
      </Button>
      <Button
        onClick={() => {
          // loopThroughObj(query.filters[0])
          nestFilters(query.filters, arrayOfOperators)
        }}
      >
        COMBINE
      </Button>
    </div>
  )
}

// const loopThroughObj = (obj) => {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       console.log('key', key, '---->', obj[key])
//       if (key === '$or' || key === '$and') {
//         console.log('flark 🩸', obj[key])
//       }
//       if (typeof obj[key] === 'object') {
//         loopThroughObj(obj[key])
//       }
//     }
//   }
// }

const filters = [
  {
    $field: '',
    $operator: '=',
  },
  {
    $field: '',
    $operator: '=',
  },
  {
    $field: '',
    $operator: '=',
  },
  {
    $field: '',
    $operator: '=',
  },
]

const logics = ['$or', '$and', '$or']

// nest filters
const query = {}
let target = query
filters.forEach((obj, index) => {
  Object.assign(target, obj)
  const l = logics[index]
  if (l) {
    target = target[l] = {}
  }
})
