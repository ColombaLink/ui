import React, { useState, useEffect, useRef } from 'react'
import { Text, Select, color } from '~'
import { styled } from 'inlines'
import { FilterPill } from './FilterPill'

// TODO if you change selected operator change the input value

export const QueryFilter = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filters, setFilters] = useState<
    { $field: string; $operator: string; $value: string }[]
  >([])

  const inputRef = useRef<HTMLInputElement>()

  const InputToFilters = (input: string) => {
    const splitted = input.split(' ')

    console.log(splitted)
    for (let i = 0; i < splitted.length; i++) {
      if (i === 2) {
        filters[0] = {
          $field: splitted[0],
          $operator: splitted[1],
          $value: splitted[2],
        }
      }

      if (i === 6) {
        filters[0][splitted[3]] = {
          $field: splitted[4],
          $operator: splitted[5],
          $value: splitted[6],
        }
      }

      if (i === 10) {
        filters[0][splitted[3]][splitted[7]] = {
          $field: splitted[8],
          $operator: splitted[9],
          $value: splitted[10],
        }
      }
    }

    console.log('filters -->', filters)
  }

  return (
    <div>
      <input
        ref={inputRef}
        placeholder="type something here"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          InputToFilters(e.target.value)
        }}
        style={{ border: '1px solid', padding: 6, marginBottom: 12 }}
      />

      <styled.div
        onClick={() => {
          inputRef.current.focus()
        }}
        style={{
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FilterPill value={inputValue} />
      </styled.div>

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
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  )
}
