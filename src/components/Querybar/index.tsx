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

  // count and or ors in the query
  const [numberOfFilterPills, setNumberOfFilterPills] = useState(0)
  // to track nested operators
  const [arrayOfOperators, setArrayOfOperators] = useState([])

  useEffect(() => {
    console.log('query changed -->', arrayOfOperators)
  }, [query])

  return (
    <>
      <div
        style={{
          border: '1px solid red',
          padding: 6,
        }}
      >
        <RootPill query={query} setQuery={setQuery} />
        <FirstFilterPill
          query={query}
          setQuery={setQuery}
          setNumberOfFilterPills={setNumberOfFilterPills}
        />

        {[...Array(numberOfFilterPills)]?.map((item, index) => (
          <FilterPill
            query={query}
            setQuery={setQuery}
            index={index}
            key={index}
            numberOfFilterPills={numberOfFilterPills}
            setNumberOfFilterPills={setNumberOfFilterPills}
            setArrayOfOperators={setArrayOfOperators}
            arrayOfOperators={arrayOfOperators}
          />
        ))}
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
