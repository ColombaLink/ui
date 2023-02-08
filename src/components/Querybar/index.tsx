import React, { useState, useEffect } from 'react'
import { ArrowRightIcon, color, Input, Text, StackIcon } from '~'
import { RootPill } from './RootPill'
import { FilterPill } from './FilterPill'
import { styled } from 'inlines'

export const QueryBar = () => {
  const [query, setQuery] = useState({
    filters: [],
    target: 'root',
    field: 'descendants',
  })

  // count and or ors in the query
  const [numberOfFilterPills, setNumberOfFilterPills] = useState(1)
  // to track nested operators
  const [arrayOfLogics, setArrayOfLogics] = useState([])

  useEffect(() => {
    console.log('query changed -->', arrayOfLogics)
  }, [query])

  const [inputValue, setInputValue] = useState('')
  const [splittedInputValue, setSplittedInputValue] = useState([])

  useEffect(() => {
    setSplittedInputValue(inputValue.split(' '))
    console.log('splittedInputValue', splittedInputValue)
  }, [inputValue])

  return (
    <>
      <styled.div
        style={{
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          padding: 6,
        }}
      >
        <Input
          space="12px"
          value={inputValue}
          onChange={(e) => {
            setSplittedInputValue(e.split(' '))
            setInputValue(e)
          }}
        />
        <div
          style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}
        >
          {/* harcode the first three options in there after that repeat */}
          {splittedInputValue.map((text, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 ? (
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
                  {text}
                </Text>
              ) : idx === 1 ? (
                <Text
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    height: 30,
                    padding: 10,
                    minWidth: 74,
                    backgroundColor: color('lighttext'),
                    borderRight: `1px solid ${color('border')}`,
                  }}
                >
                  <StackIcon size={16} color="accent" />
                  {text}
                </Text>
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
        </div>

        <RootPill query={query} setQuery={setQuery} />

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
        ))}
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
        {JSON.stringify(query, null, 2)}
      </pre>
    </>
  )
}
