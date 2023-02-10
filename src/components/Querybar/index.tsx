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
      in root desc type is yvestype
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
          {/* harcode the first six options in there after that repeat */}
          {splittedInputValue.map((text, idx) => (
            <React.Fragment key={idx}>
              {idx === 0 || idx === 3 || idx === 7 ? (
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
              ) : idx === 1 || idx === 4 || idx === 8 ? (
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
                >
                  {idx === 1 && <StackIcon size={16} color="accent" />}
                  {text}
                </Text>
              ) : idx === 2 || idx === 5 || idx === 9 ? (
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
                    {text}
                  </Text>
                  {idx === 2 && (
                    <ArrowRightIcon size={16} style={{ margin: 'auto 8px' }} />
                  )}
                </>
              ) : idx === 6 || idx === 10 ? (
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
                  <Text color="accent">{text}</Text>
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
