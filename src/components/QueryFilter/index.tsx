import React, { useState, useEffect, useRef } from 'react'
import { Text, Select } from '~'
import { styled } from 'inlines'

export const QueryFilter = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filters, setFilters] = useState<
    { $field: string; $operator: string; $value: string }[]
  >([])
  const inputRef = useRef<HTMLInputElement>()

  const arithmeticProgression = (n, lim) =>
    Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

  // console.log('arithmeticProgression', arithmeticProgression(4, 90))

  // om de drie zet een filter,
  // met of zonder and or not operator
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
        style={{ border: '1px solid blue', padding: 6, width: 800 }}
      />
      <Text>{inputValue}</Text>

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
