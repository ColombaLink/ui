import React, { useState, useEffect } from 'react'
import { ArrowRightIcon, Select, Text, Button } from '~'
import { AndOrPill } from './AndOrPill'
import { RootPill } from './RootPill'

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

        {/* filter object next -> 3 parameters (field, operator, value) */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Text>Type</Text>
          <Text>=</Text>
          <Text>yvestype</Text>
        </div>
        <Button
          onClick={() => {
            query.filters.push({
              $field: 'type',
              $operator: '=',
              $value: 'yvestype',
              //   $and: {},
              //   $or: {},
            })
            setQuery({ ...query })
          }}
        >
          test
        </Button>

        {/* { test this} */}

        <AndOrPill query={query} setQuery={setQuery} />

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
