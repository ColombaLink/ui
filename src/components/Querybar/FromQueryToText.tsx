import React, { useState } from 'react'
import { Text, Button, Input } from '~'
import { logicalOperatorsMap } from './Operators'

export const FromQueryToText = () => {
  // Input field for queries
  const [rawInputValue, setRawInputValue] = useState(
    '{"target":"root","field":"descendants","filters":{"$field":"a","$operator":"=","$value":"a","$and":{"$field":"b","$operator":"=","$value":"b","$or":{"$field":"c","$operator":"!=","$value":"c"}}}}'
  )
  const [readableText, setReadableText] = useState('')

  let filterString = ''

  const flatArr = []
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
    <div style={{ marginBottom: 16, maxWidth: 1000 }}>
      <Text space wrap>
        raw: {rawInputValue}
      </Text>
      <Input
        jsonInput
        indent
        space
        placeholder=""
        value={rawInputValue}
        onChange={(e) => {
          setRawInputValue(e)
          setReadableText(readableTextFromQuery(e))
        }}
      />

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
