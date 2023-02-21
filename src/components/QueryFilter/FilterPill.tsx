import React from 'react'
import { color, Text, Select } from '~'
import { styled } from 'inlines'

type FilterPillProps = {
  value: string
  setInputValue: (e) => void
  InputToFilters: (e) => void
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

const AP_LIMIT = 70
//  arithmetic progression
const aProgress = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

console.log('arithmeticProgression', aProgress(7, 90))

export const FilterPill = ({
  value,
  setInputValue,
  InputToFilters,
}: FilterPillProps) => {
  return (
    <>
      {value.split(' ').map((item, idx) =>
        idx === 0 || aProgress(4, AP_LIMIT).includes(idx) ? (
          <LeftPill key={idx} value={item} />
        ) : idx === 1 ||
          aProgress(4, AP_LIMIT)
            .map((v) => v + 1)
            .includes(idx) ? (
          <MiddlePill
            key={idx}
            value={item}
            setInputValue={setInputValue}
            inputValue={value}
            InputToFilters={InputToFilters}
            index={idx}
          />
        ) : idx === 2 ||
          aProgress(4, AP_LIMIT)
            .map((v) => v + 2)
            .includes(idx) ? (
          <RightPill key={idx} value={item} />
        ) : (
          <OperatorPill
            key={idx}
            value={item}
            setInputValue={setInputValue}
            inputValue={value}
            InputToFilters={InputToFilters}
            index={idx}
          />
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

const MiddlePill = ({
  value,
  setInputValue,
  inputValue,
  index,
  InputToFilters,
}) => {
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
          const temp = inputValue.split(' ')
          temp[index] = e
          console.log('----> TEMP ', temp)
          setInputValue(temp.join(' '))
          InputToFilters(temp.join(' '))
        }}
        options={compareOperators}
        placeholder=""
      />
    </Text>
  )
}

const OperatorPill = ({
  value,
  setInputValue,
  inputValue,
  index,
  InputToFilters,
}) => {
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
          const temp = inputValue.split(' ')
          temp[index] = e
          console.log('----> TEMP ', temp)
          setInputValue(temp.join(' '))
          InputToFilters(temp.join(' '))
        }}
        options={logicalOperators}
        placeholder=""
      />
    </Text>
  )
}
