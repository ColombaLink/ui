import React, { useState } from 'react'
import { Input } from '~/components/Input'
import { Select } from '~/components/Select'
import { Button } from '~/components/Button'

export const FirstFilterPill = ({
  query,
  setQuery,
  setNumberOfFilterPills,
}) => {
  const [firstField, setFirstField] = useState('')
  const [operator, setOperator] = useState('=')
  const [customValue, setCustomValue] = useState('')

  return (
    <div style={{ display: 'flex', border: '1px solid purple' }}>
      <Input value={firstField} onChange={(e) => setFirstField(e)} />
      <Select
        value={operator}
        options={['=', '!=', 'includes', 'has']}
        style={{ width: 100 }}
        onChange={(e) => setOperator(e)}
      />
      <Input value={customValue} onChange={(e) => setCustomValue(e)} />
      <Button
        onClick={() => {
          if (query.filters.length < 1) {
            query.filters.push({
              $field: firstField,
              $operator: operator,
              $value: customValue,
              //   $and: {},
              //   $or: {},
            })
          } else {
            query.filters[0].$field = firstField
            query.filters[0].$operator = operator
            query.filters[0].$value = customValue
          }

          setQuery({ ...query })
          setNumberOfFilterPills(1)
        }}
      >
        test
      </Button>
    </div>
  )
}
