import React, { useState, useEffect, useRef } from 'react'
import { Text, Select, color } from '~'
import { styled } from 'inlines'
import { FilterPill } from './FilterPill'

// TODO after using a select you can backspace it..
// TODO finish InputToFilters function

export const QueryFilter = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filters, setFilters] = useState<
    { $field: string; $operator: string; $value: string }[]
  >([])

  const [caretPosition, setCaretPosition] = useState<number>(null)

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

  const KeyPressLogic = (e) => {
    console.log('key pressed -->', e.key)
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (caretIsInBlockIndex === 1) {
        console.log('open this')
      }
    }

    if (e.key === 'ArrowLeft' && caretPosition > 0) {
      setCaretPosition(caretPosition - 1)
    }
    if (e.key === 'ArrowRight' && caretPosition < inputValue.length) {
      setCaretPosition(caretPosition + 1)
    }

    // if (e.key === 'Backspace') {
    //   if (carretIsInBlockIndex === 3) {
    //     const temp = inputValue.split(' ')
    //     temp[carretIsInBlockIndex] = ' '
    //     setInputValue(temp.join(' '))
    //   }
    //   console.log('backspacie')
    // }
  }

  // //////////////////////////////////////////// CARRET POSITION LOGIC
  let caretIsInBlockIndex = 0
  let carretInBlockSubPos = 0
  let counter = 0
  inputValue.split(' ')?.map((text, idx) => {
    //   console.log('blok -->', idx, 'is long', text.length + 1, 'counter', counter)
    if (
      caretPosition >= counter &&
      caretPosition <= counter + text.length + 1
    ) {
      caretIsInBlockIndex = idx
      carretInBlockSubPos = caretPosition - counter
    }
    counter += text.length + 1
    return counter
  })

  return (
    <div>
      <Text color="accent">
        {carretInBlockSubPos} - in block nr : {caretIsInBlockIndex}
      </Text>
      <Text>input length = {inputValue.length}</Text>
      <Text>Carret pos? select start: {caretPosition}</Text>
      <Text>Carret pos in index block: {}</Text>
      <input
        ref={inputRef}
        placeholder="type something here"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          InputToFilters(e.target.value)
        }}
        onKeyDown={(e) => {
          setCaretPosition(e.currentTarget?.selectionStart)
          KeyPressLogic(e)
        }}
        onClick={(e) => setCaretPosition(e.currentTarget.selectionStart)}
        style={{ border: '1px solid', padding: 6, marginBottom: 12 }}
      />

      <styled.div
        onClick={() => {
          inputRef.current.focus()
          inputRef.current.selectionStart = inputValue.length
          setCaretPosition(inputValue.length)
        }}
        style={{
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FilterPill
          value={inputValue}
          setInputValue={setInputValue}
          InputToFilters={InputToFilters}
          caretIsInBlockIndex={caretIsInBlockIndex}
        />
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
