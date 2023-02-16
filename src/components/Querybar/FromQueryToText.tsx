import React, { useState } from 'react'
import { Text, Button } from '~'
import { logicalOperatorsMap } from './Operators'

export const FromQueryToText = () => {
  // Input field for queries
  const [rawInputValue, setRawInputValue] = useState(
    '{"target":"root","field":"descendants","filters":{"$field":"a","$operator":"=","$value":"a","$and":{"$field":"b","$operator":"=","$value":"b","$or":{"$field":"c","$operator":"!=","$value":"c"}}}}'
  )
  const [readableText, setReadableText] = useState('')

  let filterString = ''

  let flatArr = []
  const FlatIt = (obj) => {
    const tempObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // only works if key is exactly $and or $or
        // if (key !== '$and' && key !== '$or' && key !== '$not') {
        //   tempObj[key] = obj[key]
        // }
        tempObj[key] = obj[key]
        if (typeof obj[key] === 'object') {
          FlatIt(obj[key])
        }
      }
    }
    flatArr.push(tempObj)
  }

  const readableTextFromQuery = (input) => {
    filterString = ''
    const parsed = JSON.parse(input)

    const target = parsed.target
    const field = parsed.field

    FlatIt(parsed.filters)

    flatArr.reverse().forEach((obj) => {
      const logicalOperator = Object.keys(obj)
        .filter((item) => Object.keys(logicalOperatorsMap).includes(item))
        .toString()

      if (logicalOperator) {
        filterString += `${obj.$field} ${obj.$operator} ${obj.$value} ${logicalOperator} `
      } else {
        filterString += `${obj.$field} ${obj.$operator} ${obj.$value}`
      }
    })
    console.log(`in ${target} ${field} ${filterString}`)
    return `in ${target} ${field} ${filterString}`
  }

  return (
    <div style={{ background: '#ffffed', padding: 10, marginBottom: 12 }}>
      <input
        placeholder="paste a query in here"
        value={rawInputValue}
        style={{
          padding: 6,
          border: '1px solid orange',
          marginBottom: 8,
          width: '100%',
        }}
        onChange={(e) => {
          setRawInputValue(e.target.value)
        }}
      />
      <Text space>raw: {rawInputValue}</Text>
      <Text space>normal: {readableText}</Text>
      <Button
        onClick={() => {
          setReadableText(readableTextFromQuery(rawInputValue))
        }}
      >
        Make readable text
      </Button>
    </div>
  )
}

// {"filters":{"$field":"flip","$operator":"=","$value":"flap"},"target":"root","field":"descendants"}
