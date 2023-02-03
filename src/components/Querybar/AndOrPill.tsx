import React from 'react'
import { Select } from '~'

export const AndOrPill = ({ query, setQuery }) => {
  const [andOrValue, setAndOrValue] = React.useState('$and')

  return (
    <Select
      value={andOrValue}
      options={['$and', '$or']}
      onChange={(value) => {
        console.log('value', value)
        setAndOrValue(value)

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
    />
  )
}
