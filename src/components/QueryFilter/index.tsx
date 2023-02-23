import React, { useState, useRef } from 'react'
import { Text, color } from '~'
import { styled } from 'inlines'
import { FilterPill } from './FilterPill'
import { SuggestionTag } from './SuggestionTag'

// TODO finish InputToFilters function
// TODO carretposition indicator
// TODO on arrow up down open filter menu right pill
// TODO sync carret positions on block click
// TODO url connect
// TODO Root Pill
// TODO Suggestions
// TODO on focus and on blur

export const QueryFilter = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filters, setFilters] = useState<
    { $field: string; $operator: string; $value: string }[]
  >([])

  const [caretPosition, setCaretPosition] = useState<number>(0)
  const [openSelectBox, setOpenSelectBox] = useState<{
    num: number
    open: boolean
  }>({ num: 0, open: false })

  const [suggestions, setSuggestions] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>()

  const InputToFilters = (input: string) => {
    const splitted = input.split(' ')

    // console.log(splitted)
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

    // console.log('filters -->', filters)
  }

  const KeyPressLogic = (e) => {
    if (
      e.key === 'ArrowRight' &&
      e.currentTarget?.selectionEnd === inputValue.length
    ) {
      console.log('RIGHT -->')
      setCaretPosition(inputValue.length - 1)
      e.currentTarget.selectionEnd = inputValue.length - 1
    } else if (
      e.key === 'ArrowLeft' &&
      e.currentTarget?.selectionEnd === inputValue.length
    ) {
      console.log('LEFT <--')
      setCaretPosition(caretPosition - 1)
      //     setCaretPosition(e.currentTarget.selectionStart)
    } else if (e.key === 'ArrowLeft') {
      console.log('LEFT AGIAN <--')
      setCaretPosition(caretPosition - 1)
    } else {
      setCaretPosition(e.currentTarget?.selectionStart)
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      setOpenSelectBox({ num: caretIsInBlockIndex, open: true })

      // TODO zet cursor weer ergens in input
      //  setCaretPosition((prevPos) => prevPos)
    }
  }

  // //////////////////////////////////////////// CARRET POSITION LOGIC
  let caretIsInBlockIndex = 0
  let caretInBlockSubPos = 0
  let counter = 0
  inputValue.split(' ')?.map((text, idx) => {
    //   console.log('blok -->', idx, 'is long', text.length + 1, 'counter', counter)
    if (
      caretPosition >= counter &&
      caretPosition <= counter + text.length + 1
    ) {
      caretIsInBlockIndex = idx
      caretInBlockSubPos = caretPosition - counter
    }
    counter += text.length + 1
    return counter
  })

  return (
    <div>
      <Text color="accent">
        subpos: {caretInBlockSubPos} - in block nr : {caretIsInBlockIndex}
      </Text>
      <Text>input length = {inputValue.length}</Text>
      <Text>Carret pos? select start: {caretPosition}</Text>

      <input
        ref={inputRef}
        placeholder="type something here"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          InputToFilters(e.target.value)
        }}
        onKeyDown={(e) => {
          KeyPressLogic(e)
        }}
        onClick={(e) => setCaretPosition(e.currentTarget.selectionStart)}
        style={{ border: '1px solid', padding: 6, marginBottom: 12 }}
      />

      <styled.div
        onClick={() => {
          inputRef.current.focus()
          inputRef.current.selectionStart = inputValue.length
          setCaretPosition(inputValue.length - 1)
        }}
        style={{
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <FilterPill
          value={inputValue}
          setInputValue={setInputValue}
          InputToFilters={InputToFilters}
          caretIsInBlockIndex={caretIsInBlockIndex}
          caretInBlockSubPos={caretInBlockSubPos}
          openSelectBox={openSelectBox}
          setOpenSelectBox={setOpenSelectBox}
          caretPosition={caretPosition}
          setCaretPosition={setCaretPosition}
          inputReference={inputRef}
        />
      </styled.div>

      <div style={{ display: 'flex' }}>
        <SuggestionTag suggestion="lbub" selected onClick={() => {}} />
        <SuggestionTag suggestion="snupr" onClick={() => {}} />
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
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  )
}
