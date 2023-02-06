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
  setArrayOfLogics,
  arrayOfLogics,
}) => {
  const [andOrValue, setAndOrValue] = useState<string | number>('$and')
  const [field, setField] = useState('')
  const [operator, setOperator] = useState('=')
  const [customValue, setCustomValue] = useState('')

  const changeAndOr = (value, index) => {
    // flatten
    flattenFilters(query.filters)
    query.filters = snurpArr.reverse()
    setQuery({ ...query })

    // change arrayOfLogics // index correctie
    arrayOfLogics[index - 1] = value
    setArrayOfLogics([...arrayOfLogics])

    // now combine again
    nestFilters(query, arrayOfLogics)
  }

  const changeOperator = () => {}

  /* /////////  To combine and to unCombine the query object ///////// */
  let snurpArr = []

  const nestFilters = (query, arr) => {
    // empty the snurpArr
    snurpArr = []

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

  const flattenFilters = (obj) => {
    const tempObj = {}

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log('key', key, '---->', obj[key])

        if (key !== '$and' && key !== '$or') {
          tempObj[key] = obj[key]
          console.log('tempObj 🐸', tempObj)
        }

        if (typeof obj[key] === 'object') {
          flattenFilters(obj[key])
          console.log('snurp 🐸', snurpArr)
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
          setAndOrValue(value)
          changeAndOr(value, index)
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

          setArrayOfLogics([...arrayOfLogics, andOrValue])
          setQuery({ ...query })
          setNumberOfFilterPills(numberOfFilterPills + 1)
        }}
      >
        Add
      </Button>
      <Button onClick={() => nestFilters(query, arrayOfLogics)}>COMBINE</Button>
      <Button
        onClick={() => {
          flattenFilters(query.filters)
          query.filters = snurpArr.reverse()
          setQuery({ ...query })
        }}
      >
        FLATTEN
      </Button>
    </div>
  )
}

// const loopThroughObj = (obj) => {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       console.log('key', key, '---->', obj[key])
//       if (key === '$or' || key === '$and') {
//         console.log('flark ', obj[key])
//       }
//       if (typeof obj[key] === 'object') {
//         loopThroughObj(obj[key])
//       }
//     }
//   }
// }

// const filters = [
//   {
//     $field: '',
//     $operator: '=',
//   },
//   {
//     $field: '',
//     $operator: '=',
//   },
//   {
//     $field: '',
//     $operator: '=',
//   },
//   {
//     $field: '',
//     $operator: '=',
//   },
// ]

// const logics = ['$or', '$and', '$or']

// // nest filters
// const query = {}
// let target = query
// filters.forEach((obj, index) => {
//   Object.assign(target, obj)
//   const l = logics[index]
//   if (l) {
//     target = target[l] = {}
//   }
// })
