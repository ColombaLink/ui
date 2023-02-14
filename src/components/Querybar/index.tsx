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

// TODO: fake overlay cursor -> CaretPosition
// add event listeners for left and right arrows
// TODO: tab to autocomplete
// TODO: when will submit happen
// TODO: paste in query
// TODO: in useEffect keep adding more after length?? can be better
// TODO: test undefined in comibined query??

const arithmeticProgression = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

// console.log('arithmeticProgression', arithmeticProgression(4, 15))
// console.log(
//   'arithmeticProgression',
//   arithmeticProgression(4, 140).map((v) => v + 2)
// )

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  const [inputValue, setInputValue] = useState('')
  const [splittedInputValue, setSplittedInputValue] = useState([])
  // count and or ors in the query
  const [arrayOfLogics, setArrayOfLogics] = useState([])
  const [carretPosition, setCarretPosition] = useState(0)
  const [filtersAreNested, setFiltersAreNested] = useState(false)

  // focused on input field
  const [isFocused, setIsFocused] = useState(false)
  const InputFieldRef = useRef()

  // //////////////////////////////////////////// TO SYNC INPUT VALUE WITH SPLITTED INPUT VALUE
  useEffect(() => {
    setSplittedInputValue(inputValue.split(' '))
    console.log('splittedInputValue', splittedInputValue)
  }, [inputValue])

  // //////////////////////////////////////////// FOCUS AND BLUR LOGIC
  useEffect(() => {
    if (filtersAreNested && isFocused && splittedInputValue.length > 3) {
      FlattenFilters(query.filters)
      query.filters = snurpArr.reverse()
      setQuery({ ...query })

      setFiltersAreNested(false)
    } else if (!isFocused) {
      // zet nested filters to false
      setFiltersAreNested(true)
    }
  }, [isFocused])

  // TODO: dit hieronder kan misschien in een functie
  useEffect(() => {
    query.target = splittedInputValue[1]
    query.field = splittedInputValue[2]

    if (query.filters[0] && splittedInputValue.length < 4) {
      query.filters?.pop()
    }

    if (splittedInputValue.length > 4) {
      query.filters[0] = {
        $field: splittedInputValue[3],
        $operator: splittedInputValue[4],
        $value: splittedInputValue[5],
      }
    }

    // dont forget the dollar sign for the query
    arrayOfLogics[0] =
      splittedInputValue[6]?.charAt(0) === '$'
        ? splittedInputValue[6]
        : `$${splittedInputValue[6]}`

    if (query.filters[1] && splittedInputValue.length < 7) {
      query.filters?.pop()
    }

    if (splittedInputValue.length > 7) {
      query.filters[1] = {
        $field: splittedInputValue[7],
        $operator: splittedInputValue[8],
        $value: splittedInputValue[9],
      }
    }
  }, [splittedInputValue])

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
        if (key !== '$and' && key !== '$or') {
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
    <>
      <Text>CarretPOs: {carretPosition}</Text>
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
          NestFilters(query, arrayOfLogics)
          setFiltersAreNested(true)
        }}
      />
      <styled.div
        style={{
          border: isFocused
            ? `1px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          position: 'relative',
        }}
      >
        {splittedInputValue.map((text, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 ||
            arithmeticProgression(4, 140)
              .map((v) => v - 1)
              .includes(idx) ? (
              <Text
                wrap
                color="text2"
                style={{
                  height: 30,
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  backgroundColor: color('lighttext'),
                  borderRight: `1px solid ${color('border')}`,
                  position: 'relative',
                  cursor: 'text',
                }}
                onClick={(e) => {
                  // @ts-ignore
                  carretIsInBlockIndex = idx
                  PutCursorInRightPlaceOnClick(e, idx)
                }}
              >
                {carretPosition === 0 || inputValue.length === 0 ? (
                  <FakeCarret />
                ) : null}
                {idx === 0
                  ? text?.split('')?.map((letter, index) =>
                      index === carretInBlockSubPos - 1 ? (
                        <div style={{ display: 'flex' }}>
                          <span id={index} key={index}>
                            {letter.toUpperCase()}
                          </span>
                          {carretIsInBlockIndex === 0 && <FakeCarret />}
                        </div>
                      ) : (
                        <span id={index} key={index}>
                          {letter.toUpperCase()}
                        </span>
                      )
                    )
                  : null}

                {arithmeticProgression(4, 140)
                  .map((v) => v - 1)
                  .includes(idx)
                  ? text?.split('')?.map((letter, index) =>
                      index === carretInBlockSubPos - 1 ? (
                        <div style={{ display: 'flex' }}>
                          <span id={index} key={index}>
                            {letter}
                          </span>

                          {(carretIsInBlockIndex === 3 && idx === 3) ||
                          (carretIsInBlockIndex === 7 && idx === 7) ? (
                            <FakeCarret />
                          ) : null}
                        </div>
                      ) : (
                        <span id={index} key={index}>
                          {letter}
                        </span>
                      )
                    )
                  : null}
              </Text>
            ) : idx === 1 || arithmeticProgression(4, 140).includes(idx) ? (
              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 30,
                  padding: 10,
                  minWidth: idx === 1 ? 74 : 'auto',
                  backgroundColor: color('lighttext'),
                  borderRight: `1px solid ${color('border')}`,
                  position: 'relative',
                }}
              >
                {idx === 1 && <StackIcon size={16} color="accent" />}
                {idx === 1 && (
                  <div style={{ display: 'flex' }}>
                    <span>{text?.substr(0, carretInBlockSubPos)}</span>
                    {carretIsInBlockIndex === 1 && <FakeCarret />}
                    <span>{text?.substr(carretInBlockSubPos)}</span>
                  </div>
                )}
                {idx !== 1 && (
                  <Select
                    ghost
                    value={text}
                    // @ts-ignore
                    style={{ '& svg': { display: 'none' } }}
                    onChange={(e) => {
                      const tempSplitted = [...splittedInputValue]
                      tempSplitted[idx] = e

                      if (!filtersAreNested) {
                        setInputValue(tempSplitted.join(' '))
                        setSplittedInputValue([...tempSplitted])
                      } else {
                        //  flatten the array first
                        FlattenFilters(query.filters)
                        query.filters = snurpArr.reverse()
                        setQuery({ ...query })

                        // dan pas veranderen
                        setInputValue(tempSplitted.join(' '))
                        setSplittedInputValue([...tempSplitted])

                        // zet nested filters to false
                        setFiltersAreNested(false)
                      }
                    }}
                    options={[
                      '=',
                      '!=',
                      '>',
                      '<',
                      '>=',
                      '<=',
                      'has',
                      'includes',
                    ]}
                    placeholder=""
                  />
                )}
              </Text>
            ) : idx === 2 ||
              arithmeticProgression(4, 140)
                .map((v) => v + 1)
                .includes(idx) ? (
              <>
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 30,
                    padding: 10,
                    backgroundColor: color('lighttext'),
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                    cursor: 'text',
                  }}
                  onClick={(e) => {
                    carretIsInBlockIndex = idx
                    PutCursorInRightPlaceOnClick(e, idx)
                  }}
                >
                  {idx === 2 && (
                    <LinkIcon
                      size={16}
                      color="accent"
                      style={{ marginRight: 8 }}
                    />
                  )}

                  {text?.split('')?.map((letter, index) =>
                    index === carretInBlockSubPos - 1 ? (
                      <div style={{ display: 'flex' }}>
                        <span id={index} key={index}>
                          {letter}
                        </span>
                        {(carretIsInBlockIndex === 2 && idx === 2) ||
                        (carretIsInBlockIndex === 5 && idx === 5) ? (
                          <FakeCarret />
                        ) : null}
                      </div>
                    ) : (
                      <span id={index} key={index}>
                        {letter}
                      </span>
                    )
                  )}
                </Text>
                {idx === 2 && (
                  <ArrowRightIcon size={16} style={{ margin: 'auto 8px' }} />
                )}
              </>
            ) : arithmeticProgression(4, 140)
                .map((v) => v + 2)
                .includes(idx) ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 10,
                  height: 30,
                  margin: '0 8px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${color('accent')}`,
                  borderRadius: 4,
                }}
              >
                <Text color="accent">
                  {/* {text[0] === '$' ? text : '$' + text} */}
                  <Select
                    ghost
                    value={text[0] === '$' ? text : '$' + text}
                    style={{
                      // @ts-ignore
                      '& div': { color: `${color('accent')} !important` },
                      '& svg': { display: 'none' },
                    }}
                    onChange={(e) => {
                      const tempSplitted = [...splittedInputValue]
                      tempSplitted[idx] = e

                      if (!filtersAreNested) {
                        setInputValue(tempSplitted.join(' '))
                        setSplittedInputValue([...tempSplitted])
                      } else {
                        // flatten the array first
                        FlattenFilters(query.filters)
                        query.filters = snurpArr.reverse()
                        setQuery({ ...query })

                        // dan pas veranderen
                        setInputValue(tempSplitted.join(' '))
                        setSplittedInputValue([...tempSplitted])

                        // zet nested filters to false
                        setFiltersAreNested(false)
                      }
                    }}
                    options={['$and', '$or']}
                    placeholder=""
                  />
                </Text>
              </div>
            ) : (
              <div
                style={{
                  background: 'lightgrey',
                  padding: 5,
                  borderRight: idx % 3 === 0 ? 'none' : '1px solid grey',
                  borderTopRightRadius: idx % 3 === 0 ? 4 : 0,
                  borderBottomRightRadius: idx % 3 === 0 ? 4 : 0,
                }}
              >
                {text}
              </div>
            )}
          </React.Fragment>
        ))}
      </styled.div>
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
    </>
  )
}
