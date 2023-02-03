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

  console.log('incoming array of operators', arrayOfOperators)
  console.log(
    "this, arrayOfOperators.join('.')",
    arrayOfOperators.forEach((item) => [item])
  )

  return (
    <div style={{ display: 'flex', border: '1px solid blue' }}>
      index: {index}
      <Select
        value={andOrValue}
        options={['$and', '$or']}
        onChange={(value) => {
          console.log('value', value)
          setAndOrValue(value)

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
          console.log('query', query)
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
          if (index === 1) {
            console.log('arrayOfOperators', arrayOfOperators)
            setArrayOfOperators([...arrayOfOperators, andOrValue])

            query.filters[0][arrayOfOperators[0]][andOrValue] = {
              $field: field,
              $operator: operator,
              $value: customValue,
            }
          } else if (index === 2) {
            setArrayOfOperators([...arrayOfOperators, andOrValue])

            query.filters[0][arrayOfOperators[0]][arrayOfOperators[1]][
              andOrValue
            ] = {
              $field: field,
              $operator: operator,
              $value: customValue,
            }
          } else {
            console.log('first')
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
    </div>
  )
}
