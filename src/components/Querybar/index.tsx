import React, { useState, useEffect, useRef } from 'react'
import {
  ArrowRightIcon,
  color,
  Input,
  Text,
  StackIcon,
  LinkIcon,
  Button,
  Select,
} from '~'
import { RootPill } from './RootPill'
import { FilterPill } from './FilterPill'
import { styled } from 'inlines'

// TODO: fake overlay cursor -> CaretPosition
// add event listeners for left and right arrows
// TODO: tab to autocomplete
// TODO: when will submit happen
// TODO: in useEffect keep adding more after length?? can be better

const FakeCarret = styled('div', {
  width: 1,
  marginLeft: 1.5,
  marginRight: 1.5,
  marginTop: 2,
  height: 15,
  backgroundColor: color('accent'),
  '@keyframes': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  animationDuration: '1s',
  animationEffect: 'step-start',
  animationIterationCount: 'infinite',
})

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

  const InputFieldRef = useRef()

  // settting splittedInputValue twice to sync up
  useEffect(() => {
    setSplittedInputValue(inputValue.split(' '))
    console.log('splittedInputValue', splittedInputValue)
  }, [inputValue])

  useEffect(() => {
    query.target = splittedInputValue[1]
    query.field = splittedInputValue[2]

    if (query.filters[0] && splittedInputValue.length < 4) {
      query.filters.pop()
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
      query.filters.pop()
    }

    if (splittedInputValue.length > 7) {
      query.filters[1] = {
        $field: splittedInputValue[7],
        $operator: splittedInputValue[8],
        $value: splittedInputValue[9],
      }
    }
  }, [splittedInputValue])

  /* /////////  To combine and to unCombine the query object ///////// */
  let snurpArr = []

  const NestFilters = (query, arr) => {
    // empty the snurpArr
    snurpArr = []

    const snurp = {}
    let target = snurp
    query.filters.forEach((obj, index) => {
      Object.assign(target, obj)
      const l = arr[index]
      if (l) {
        target = target[l] = {}
      }
    })

    query.filters = { ...snurp }
    console.log('query 🐸', query)
    setQuery({ ...query })
  }

  const FlattenFilters = (obj) => {
    const tempObj = {}

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log('key', key, '---->', obj[key])

        // only works if key is exactly $and or $or
        if (key !== '$and' && key !== '$or') {
          tempObj[key] = obj[key]
          console.log('tempObj 🐸', tempObj)
        }

        if (typeof obj[key] === 'object') {
          FlattenFilters(obj[key])
          console.log('snurp 🐸', snurpArr)
        }
      }
    }
    snurpArr.push(tempObj)
  }

  // about the Carret position
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
      //   console.log('carret is in block 🧀', idx)
      // console.log(
      //   'Sub position in block 🥕',
      //   idx,
      //   '=',
      //   carretPosition - counter
      // )
    }
    counter += text.length + 1
  })

  return (
    <>
      <Text>CarretPOs: {carretPosition}</Text>
      <Text>
        Carret SUB Pos in block:{carretPosition} - {counter} ={' '}
        {counter - carretPosition}
      </Text>
      <Text>CarretPosition in index block {carretIsInBlockIndex} </Text>
      <Text>inputvalue length : {inputValue.length}</Text>
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
          //   console.log('inputFieldRef', InputFieldRef)
          //   console.log('Caret is at position: 🥕', e.target.selectionStart)
          setCarretPosition(e.target.selectionStart)
        }}
        onClick={(e) => {
          // listen for mouse position
          //  console.log('inputFieldRef', InputFieldRef.current?.selectionStart)
          setCarretPosition(e.target.selectionStart)
        }}
      />
      <styled.div
        style={{
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 12,
          position: 'relative',
        }}
      >
        {/* harcode the first six options in there after that repeat */}
        {splittedInputValue.map((text, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 || idx === 3 || idx === 7 || idx === 11 || idx === 15 ? (
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
                  console.log('click on block', idx)
                  console.log(InputFieldRef)
                  console.log(e.target.id)
                  carretIsInBlockIndex = idx
                  setCarretPosition(e.target.id)
                  InputFieldRef?.current?.focus()
                  InputFieldRef.current.selectionStart = e.target.id
                  InputFieldRef.current.selectionEnd = e.target.id
                }}
              >
                {inputValue.length === 0 && <FakeCarret />}
                {idx === 0
                  ? text?.split('')?.map((letter, index) =>
                      index === carretInBlockSubPos - 1 ? (
                        <div style={{ display: 'flex' }}>
                          <span id={index} key={index}>
                            {letter}
                          </span>
                          {carretIsInBlockIndex === 0 && <FakeCarret />}
                        </div>
                      ) : (
                        <span id={index} key={index}>
                          {letter}
                        </span>
                      )
                    )
                  : null}

                {/* {idx === 0 ? (
                  <div style={{ display: 'flex' }}>
                    <span>{text?.substr(0, carretPosition).toUpperCase()}</span>
                    {carretIsInBlockIndex === 0 && <FakeCarret />}
                    <span>{text?.substr(carretPosition).toUpperCase()}</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex' }}>
                    <span>{text?.substr(0, carretInBlockSubPos)}</span>
                    {(carretIsInBlockIndex === 3 && idx === 3) ||
                    (carretIsInBlockIndex === 7 && idx === 7) ? (
                      <FakeCarret />
                    ) : null}
                    <span>{text?.substr(carretInBlockSubPos)}</span>
                  </div>
                )} */}
              </Text>
            ) : idx === 1 ||
              idx === 4 ||
              idx === 8 ||
              idx === 12 ||
              idx === 16 ? (
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
                      setInputValue(tempSplitted.join(' '))
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
              idx === 5 ||
              idx === 9 ||
              idx === 13 ||
              idx === 17 ? (
              <>
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    height: 30,
                    padding: 10,
                    backgroundColor: color('lighttext'),
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                >
                  {idx === 2 && <LinkIcon size={16} color="accent" />}

                  <div style={{ display: 'flex' }}>
                    <span>{text?.substr(0, carretInBlockSubPos)}</span>
                    {(carretIsInBlockIndex === 2 && idx === 2) ||
                    (carretIsInBlockIndex === 5 && idx === 5) ||
                    (carretIsInBlockIndex === 9 && idx === 9) ? (
                      <FakeCarret />
                    ) : null}
                    <span>{text?.substr(carretInBlockSubPos)}</span>
                  </div>
                </Text>
                {idx === 2 && (
                  <ArrowRightIcon size={16} style={{ margin: 'auto 8px' }} />
                )}
              </>
            ) : idx === 6 || idx === 10 || idx === 14 ? (
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
                      setInputValue(tempSplitted.join(' '))
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
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => NestFilters(query, arrayOfLogics)}>
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
      </div>
      {/* <RootPill query={query} setQuery={setQuery} /> */}
      {/* 
        {[...Array(numberOfFilterPills)]?.map((item, index) => (
          <FilterPill
            query={query}
            setQuery={setQuery}
            index={index}
            key={index}
            numberOfFilterPills={numberOfFilterPills}
            setNumberOfFilterPills={setNumberOfFilterPills}
            setArrayOfLogics={setArrayOfLogics}
            arrayOfLogics={arrayOfLogics}
          />
        ))} */}
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
