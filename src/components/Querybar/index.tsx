import React, { useState, useEffect, useRef } from 'react'
import {
  ArrowRightIcon,
  color,
  Text,
  StackIcon,
  LinkIcon,
  Button,
  Select,
} from '~'
import { styled } from 'inlines'
import { FakeCarret } from './FakeCarret'
import { SuggestionTags } from './SuggestionTags'
import { logicalOperatorsMap, operatorMap } from './Operators'
import { LeftPill } from './LeftPill'
import { MiddlePill } from './MiddlePill'
import { RightPill } from './RightPill'
import { LogicalOperatorPill } from './LogicalOperatorPill'

// TODO: Caret postion in begin of block
// TODO: tab to autocomplete
// TODO: when will submit happen
// TODO: paste in query
// TODO: clear completeley
// TODO: typescript
// TODO: Tab to cycle through suggestions

const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

console.log('arithmeticProgression', arithmeticProgression(4, 15))
console.log(
  'arithmeticProgression',
  arithmeticProgression(4, 140).map((v) => v + 2)
)

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  const [inputValue, setInputValue] = useState('In root descendants')
  const [splittedInputValue, setSplittedInputValue] = useState([])
  // count and or ors in the query
  const [arrayOfLogics, setArrayOfLogics] = useState([])
  const [carretPosition, setCarretPosition] = useState(0)
  const [filtersAreNested, setFiltersAreNested] = useState(false)

  // focused on input field
  const [isFocused, setIsFocused] = useState(false)
  const InputFieldRef = useRef()

  // //////////////////////////////////////////// FOCUS AND BLUR LOGIC
  useEffect(() => {
    if (filtersAreNested && isFocused) {
      FlattenFilters(query.filters)
      query.filters = snurpArr.reverse()
      setQuery({ ...query })

      setFiltersAreNested(false)
    } else if (!isFocused) {
      // zet nested filters to false
      setFiltersAreNested(true)
    }
  }, [isFocused])

  // //////////////////////////////////////////// REPEATING FILTERS LOGIC
  useEffect(() => {
    setSplittedInputValue(inputValue.split(' '))

    query.target = splittedInputValue[1]
    query.field = splittedInputValue[2]

    SetQueryFilterProperties(inputValue.split(' '))
    setAndOrValues(inputValue.split(' '))
  }, [inputValue])

  // //////////////////////////////////////////// SET AND OR NOT VALUES

  const setAndOrValues = (splittedInputValue) => {
    const length = splittedInputValue.length

    const arrWithValues = arithmeticProgression(4, 140).map((v) => v + 3)
    const arrWithLesserValues = arithmeticProgression(4, 140).map((v) => v + 2)

    if (arrWithValues.includes(length)) {
      for (let i = 0; i <= arrWithValues.indexOf(length); i++) {
        arrayOfLogics[i] =
          inputValue.split(' ')[i * 4 + 6]?.charAt(0) === '$'
            ? inputValue.split(' ')[i * 4 + 6]
            : `$${inputValue.split(' ')[i * 4 + 6]}`
        setArrayOfLogics([...arrayOfLogics])
      }
    } else if (arrWithLesserValues.includes(length)) {
      for (let i = 0; i <= arrWithLesserValues.indexOf(length); i++) {
        if (length <= i * 4 + 6) {
          setArrayOfLogics([...arrayOfLogics.slice(0, i)])
        }
      }
    }
  }

  // set query filter properties based on length of splittedInputValue
  const SetQueryFilterProperties = (splittedInputValue) => {
    const length = splittedInputValue.length
    const arrWithValues = arithmeticProgression(4, 140).map((v) => v + 2)
    const arrWithLesserValues = arithmeticProgression(4, 140).map((v) => v + 3)
    arrWithLesserValues.unshift(3)

    if (
      arrWithValues.includes(length) &&
      splittedInputValue[length - 1] !== ''
    ) {
      // if put loop here in a while
      for (let i = 0; i <= arrWithValues.indexOf(length); i++) {
        // use the i value
        if (length >= i * 4 + 6) {
          //   console.log('the operator is: 🏺', splittedInputValue[i * 4 + 4])
          query.filters[i] = {
            $field: splittedInputValue[i * 4 + 3],
            $operator: splittedInputValue[i * 4 + 4],
            $value: splittedInputValue[i * 4 + 5],
          }
        }
      }
    } else if (arrWithLesserValues.includes(length)) {
      for (let i = 0; i <= arrWithLesserValues.indexOf(length); i++) {
        if (length <= i * 4 + 3) {
          console.log('FIRE  🐸--> 🐯', length)
          query.filters = query.filters.slice(0, i)
        }
      }
    }

    setQuery({ ...query })
  }

  // //////////////////////////////////////////// CARRET POSITION LOGIC
  let carretIsInBlockIndex = 0
  let carretInBlockSubPos = 0
  let counter = 0
  splittedInputValue?.map((text, idx) => {
    //   console.log('blok -->', idx, 'is long', text.length + 1, 'counter', counter)
    if (
      carretPosition > counter &&
      carretPosition < counter + text.length + 1
    ) {
      carretIsInBlockIndex = idx
      carretInBlockSubPos = carretPosition - counter
    }
    counter += text.length + 1
  })

  const PutCursorInRightPlaceOnClick = (e, idx) => {
    console.log('E ', e, 'IDX ', idx)

    // tell de lengte op van de blocken ervoor en dat plus e.target.id is de carret position
    const countedBlocksLength = splittedInputValue.reduce(
      (acc, curr, index) => {
        if (index < idx) {
          return acc + curr.length + 1
        } else {
          return acc
        }
      },
      0
    )

    carretIsInBlockIndex = idx
    const newSelectedCarretPosition = countedBlocksLength + +e.target.id
    setCarretPosition(newSelectedCarretPosition)
    InputFieldRef?.current?.focus()
    InputFieldRef.current.selectionStart = newSelectedCarretPosition
    InputFieldRef.current.selectionEnd = newSelectedCarretPosition
  }

  // //////////////////////////////////////////// COMBINE AND FLATTER FILTERS QUERY LOGIC
  let snurpArr = []
  const NestFilters = (query, arr) => {
    // empty the snurpArr
    snurpArr = []
    const snurp = {}
    let target = snurp
    query?.filters?.forEach((obj, index) => {
      Object.assign(target, obj)
      const l = arr[index]
      if (l) {
        target = target[l] = {}
      }
    })
    query.filters = { ...snurp }
    setQuery({ ...query })
  }

  const FlattenFilters = (obj) => {
    const tempObj = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // only works if key is exactly $and or $or
        if (key !== '$and' && key !== '$or' && key !== '$not') {
          tempObj[key] = obj[key]
        }
        if (typeof obj[key] === 'object') {
          FlattenFilters(obj[key])
        }
      }
    }
    snurpArr.push(tempObj)
  }

  return (
    <div>
      <Text>CarretPOs: {carretPosition}</Text>
      <Text color="accent">{splittedInputValue.length}</Text>
      <Text>
        Carret SUB Pos in block:{carretPosition} - {counter} ={' '}
        {counter - carretPosition}
      </Text>
      <Text>CarretPosition in index block {carretIsInBlockIndex} </Text>
      <Text>inputvalue length : {inputValue.length}</Text>
      <Text>
        $and $or array :{' '}
        {arrayOfLogics.map((item) => (
          <span style={{ border: '1px solid blue', margin: 4 }}>{item},</span>
        ))}
      </Text>
      <input
        style={{
          border: '1px solid purple',
          marginBottom: 12,
          padding: 8,
          width: '100%',
        }}
        type="text"
        ref={InputFieldRef}
        value={inputValue}
        onChange={(e) => {
          // set twice to sync with useeffect
          setSplittedInputValue(e.target.value.split(' '))
          setInputValue(e.target.value)
          setCarretPosition(e.target.selectionStart)
        }}
        onClick={(e) => {
          setCarretPosition(e.target.selectionStart)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
          setCarretPosition(undefined)
          console.log('on Blur 🌶--->', query)
          NestFilters(query, arrayOfLogics)
          setFiltersAreNested(true)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' && carretPosition > 0) {
            setCarretPosition(carretPosition - 1)
          } else if (
            e.key === 'ArrowRight' &&
            carretPosition < inputValue.length
          ) {
            setCarretPosition(carretPosition + 1)
          }
        }}
      />

      <styled.div
        style={{
          border: isFocused
            ? `1px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 3,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          position: 'relative',
        }}
        onClick={() => {
          InputFieldRef?.current?.focus()
          setCarretPosition(inputValue.length)
        }}
      >
        {splittedInputValue.map((text, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            arithmeticProgression(4, 140)
              .map((v) => v - 1)
              .includes(idx) ? (
              <LeftPill
                idx={idx}
                inputValue={inputValue}
                arithmeticProgression={arithmeticProgression}
                carretInBlockSubPos={carretInBlockSubPos}
                carretIsInBlockIndex={carretIsInBlockIndex}
                carretPosition={carretPosition}
                text={text}
                onClick={(e) => {
                  carretIsInBlockIndex = idx
                  PutCursorInRightPlaceOnClick(e, idx)
                }}
              />
            ) : idx === 1 || arithmeticProgression(4, 140).includes(idx) ? (
              <MiddlePill
                idx={idx}
                FlattenFilters={FlattenFilters}
                carretInBlockSubPos={carretInBlockSubPos}
                carretIsInBlockIndex={carretIsInBlockIndex}
                filtersAreNested={filtersAreNested}
                query={query}
                setFiltersAreNested={setFiltersAreNested}
                setInputValue={setInputValue}
                setQuery={setQuery}
                snurpArr={snurpArr}
                text={text}
                splittedInputValue={splittedInputValue}
              />
            ) : idx === 2 ||
              arithmeticProgression(4, 140)
                .map((v) => v + 1)
                .includes(idx) ? (
              <RightPill
                idx={idx}
                text={text}
                arithmeticProgression={arithmeticProgression}
                carretInBlockSubPos={carretInBlockSubPos}
                carretIsInBlockIndex={carretIsInBlockIndex}
                onClick={(e) => {
                  carretIsInBlockIndex = idx
                  PutCursorInRightPlaceOnClick(e, idx)
                }}
              />
            ) : arithmeticProgression(4, 140)
                .map((v) => v + 2)
                .includes(idx) ? (
              <LogicalOperatorPill
                idx={idx}
                text={text}
                arithmeticProgression={arithmeticProgression}
                FlattenFilters={FlattenFilters}
                arrayOfLogics={arrayOfLogics}
                filtersAreNested={filtersAreNested}
                query={query}
                setFiltersAreNested={setFiltersAreNested}
                setInputValue={setInputValue}
                setQuery={setQuery}
                snurpArr={snurpArr}
                splittedInputValue={splittedInputValue}
              />
            ) : null}
          </React.Fragment>
        ))}
      </styled.div>

      {/* on tab to cycle through selections, add a suggestion to the input shizzle */}

      <div style={{ display: 'flex' }}>
        {inputValue.split(' ').length === 5 &&
          Object.keys(operatorMap).map((item) => (
            <SuggestionTags suggestion={item} />
          ))}
      </div>
      {/* <div style={{ display: 'flex', gap: 12 }}>
        <Button
          onClick={() => {
            NestFilters(query, arrayOfLogics)
            setFiltersAreNested(true)
          }}
        >
          COMBINE
        </Button>
        <Button
          outline
          onClick={() => {
            FlattenFilters(query.filters)
            query.filters = snurpArr.reverse()
            setQuery({ ...query })
          }}
        >
          FLATTEN
        </Button>
      </div> */}
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
    </div>
  )
}
