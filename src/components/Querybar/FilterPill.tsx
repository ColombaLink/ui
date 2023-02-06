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

  const changeAndOr = (obj, index, operator) => {
    let stringifiedObj = JSON.stringify(obj)

    let arrOfPositions = []
    let pos = stringifiedObj.indexOf('$and')

    while (pos !== -1) {
      arrOfPositions.push(pos)
      pos = stringifiedObj.indexOf('$and', pos + 1)
    }

    console.log(arrOfPositions)

    // zet weer terug als parsed object query.filters

    // setQuery({ ...query })
  }

  const changeOperator = (index, operator) => {}

  const nestFilters = (query, arr) => {
    const snurp = {}
    let target = snurp
    query.filters.forEach((obj, index) => {
      Object.assign(target, obj)
      const l = arr[index]
      if (l) {
        target = target[l] = {}
      }
    })

    query.filters = { ...snurp }
    console.log('query 🐸', query)
    setQuery({ ...query })
  }

  const snurpArr = []

  const flattenFilters = (obj) => {
    let tempObj = {}

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log('key', key, '---->', obj[key])

        if (key !== '$and' && key !== '$or') {
          tempObj[key] = obj[key]
          console.log('tempObj 🐸', tempObj)
        }

        // if (key === '$or' || key === '$and') {
        //   console.log('flark 🩸', obj[key])
        // }

        if (typeof obj[key] === 'object') {
          flattenFilters(obj[key])
          console.log('snurp 🐸', snurpArr)
          //   snurpArr.push(obj[key])
        }
      }
    }
    snurpArr.push(tempObj)
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

          query.filters[index].$operator = e
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
      <Button onClick={() => nestFilters(query, arrayOfOperators)}>
        COMBINE
      </Button>
      <Button onClick={() => flattenFilters(query.filters)}>FLATTEN</Button>
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
