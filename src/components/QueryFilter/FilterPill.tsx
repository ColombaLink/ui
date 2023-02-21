import React from 'react'
import { color, Text, Select } from '~'
import { styled } from 'inlines'

type FilterPillProps = {
  value: string
}

export const compareOperators = [
  '=',
  '!=',
  '>',
  '<',
  '>=',
  '<=',
  'includes',
  'has',
]
export const logicalOperators = ['$and', '$or', '$not']

export const FilterPill = ({ value }: FilterPillProps) => {
  return (
    <>
      {value
        .split(' ')
        .map((item, idx) =>
          idx === 0 ? (
            <LeftPill key={idx} value={item} />
          ) : idx === 1 ? (
            <MiddlePill key={idx} value={item} />
          ) : idx === 2 ? (
            <RightPill key={idx} value={item} />
          ) : (
            <OperatorPill key={idx} value={item} />
          )
        )}
    </>
  )
}

const LeftPill = ({ value }) => {
  return (
    <Text
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
    >
      {value}
    </Text>
  )
}

const RightPill = ({ value }) => {
  return (
    <Text
      color="text2"
      style={{
        height: 30,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: color('lighttext'),
        borderRight: `1px solid ${color('border')}`,
        position: 'relative',
        cursor: 'text',
      }}
    >
      {value}
    </Text>
  )
}

const MiddlePill = ({ value }) => {
  return (
    <Text
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 30,
        //  padding: 10,
        minWidth: 'auto',
        backgroundColor: color('lighttext'),
        borderRight: `1px solid ${color('border')}`,
        position: 'relative',
      }}
    >
      <Select
        ghost
        value={value}
        // @ts-ignore
        style={{
          // @ts-ignore
          '& div': { padding: '10px' },
          '& svg': { display: 'none' },
        }}
        onChange={(e: string) => {
          // setValueText(e)
          console.log('Change -->', e, 'type of e -->', typeof e)
        }}
        options={compareOperators}
        placeholder=""
      />
    </Text>
  )
}

const OperatorPill = ({ value }) => {
  return (
    <Text
      color="accent"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 30,
        minWidth: 'auto',
        backgroundColor: color('background'),
        border: `1px solid ${color('accent')}`,
        borderRadius: 4,
        position: 'relative',
        marginLeft: 6,
        marginRight: 6,
      }}
    >
      <Select
        ghost
        value={value}
        // @ts-ignore
        style={{
          // @ts-ignore
          '& div': { padding: '10px', color: `${color('accent')} !important` },
          '& svg': { display: 'none' },
        }}
        onChange={(e: string) => {
          // setValueText(e)
          console.log('Change -->', e, 'type of e -->', typeof e)
        }}
        options={logicalOperators}
        placeholder=""
      />
    </Text>
  )
}
