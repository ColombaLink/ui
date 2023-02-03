import React, { useState, useEffect } from 'react'
import { Text, Button } from '~'
import { RootPill } from './RootPill'
import { FirstFilterPill } from './FirstFilterPill'
import { FilterPill } from './FilterPill'

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  return (
    <>
      <div
        style={{
          border: '1px solid red',
          padding: 6,
        }}
      >
        <RootPill query={query} setQuery={setQuery} />
        <FirstFilterPill query={query} setQuery={setQuery} />
        <FilterPill query={query} setQuery={setQuery} />

        <div style={{ display: 'flex', gap: 8 }}>
          <Text>Name</Text>
          <Text>includes</Text>
          <Text>jan</Text>
        </div>
        <Button
          onClick={() => {
            query.filters[0].$and = {
              $field: 'name',
              $operator: 'includes',
              $value: 'jan',
            }
            setQuery({ ...query })
            console.log('query', query)
          }}
        >
          test
        </Button>
      </div>

      <pre
        style={{
          bottom: 0,
          right: 0,
          position: 'fixed',
          background: 'black',
          color: 'lightgreen',
          zIndex: 9999,
        }}
      >
        {JSON.stringify(query, null, 2)}
      </pre>
    </>
  )
}
