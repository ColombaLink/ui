import React, { useState, useEffect } from 'react'
import {
  ArrowRightIcon,
  color,
  Input,
  Text,
  StackIcon,
  LinkIcon,
  Button,
} from '~'
import { RootPill } from './RootPill'
import { FilterPill } from './FilterPill'
import { styled } from 'inlines'

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  const [inputValue, setInputValue] = useState('')
  const [splittedInputValue, setSplittedInputValue] = useState([])

  // count and or ors in the query
  const [numberOfFilterPills, setNumberOfFilterPills] = useState(1)
  // to track nested operators
  const [arrayOfLogics, setArrayOfLogics] = useState([])

  useEffect(() => {
    console.log('query changed -->', arrayOfLogics)
  }, [query])

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

    arrayOfLogics[0] = splittedInputValue[6]

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

  const nestFilters = (query, arr) => {
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

  const flattenFilters = (obj) => {
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
          flattenFilters(obj[key])
          console.log('snurp 🐸', snurpArr)
        }
      }
    }
    snurpArr.push(tempObj)
  }

  return (
    <>
      <Input
        space="12px"
        value={inputValue}
        onChange={(e) => {
          // set twice to sync with useeffect
          setSplittedInputValue(e.split(' '))
          setInputValue(e)
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
        }}
      >
        {/* harcode the first six options in there after that repeat */}
        {splittedInputValue.map((text, idx) => (
          <React.Fragment key={idx}>
            {idx === 0 || idx === 3 || idx === 7 || idx === 11 ? (
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
                }}
              >
                {idx === 0 ? text.toUpperCase() : text}
              </Text>
            ) : idx === 1 || idx === 4 || idx === 8 || idx === 12 ? (
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
                }}
                onClick={() => console.log('clicked my index is ', idx)}
              >
                {idx === 1 && <StackIcon size={16} color="accent" />}
                {text}
              </Text>
            ) : idx === 2 || idx === 5 || idx === 9 || idx === 13 ? (
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
                  {text}
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
                  {text[0] === '$' ? text : '$' + text}
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
        <Button onClick={() => nestFilters(query, arrayOfLogics)}>
          COMBINE
        </Button>
        <Button
          outline
          onClick={() => {
            flattenFilters(query.filters)
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
