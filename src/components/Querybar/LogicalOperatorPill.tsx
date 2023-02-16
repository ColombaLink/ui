import React, { useRef } from 'react'
import { color, Text, Select } from '~'
import { logicalOperatorsMap } from './Operators'

type LogicalOperatorPillProps = {
  text: string
  arithmeticProgression: (start: number, end: number) => number[]
  arrayOfLogics: any[]
  idx: number
  splittedInputValue: string[]
  filtersAreNested: boolean
  setInputValue: (value: string) => void
  FlattenFilters: (filters: any) => void
  snurpArr: any[]
  setQuery: (value: any) => void
  query: any
  setFiltersAreNested: (value: boolean) => void
  openSelectBox: { num: number; open: boolean }
  setOpenSelectBox: (value: { num: number; open: boolean }) => void
}

export const LogicalOperatorPill = ({
  text,
  arithmeticProgression,
  arrayOfLogics,
  idx,
  splittedInputValue,
  filtersAreNested,
  setInputValue,
  FlattenFilters,
  snurpArr,
  setQuery,
  query,
  setFiltersAreNested,
  openSelectBox,
  setOpenSelectBox,
}: LogicalOperatorPillProps) => {
  const selectRef = useRef(null)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (idx === openSelectBox.num) {
      console.log(
        selectRef.current.childNodes[0].childNodes[0].childNodes[0].click()
      )
    }

    setOpenSelectBox({ num: idx, open: false })
  }

  return (
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
      ref={selectRef}
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
            const arr = arithmeticProgression(4, 140).map((v) => v + 2)
            // calculate back so idx 6 -> [0]
            // idx 10 -> [1]
            arrayOfLogics[arr.indexOf(idx)] = e

            const tempSplitted = [...splittedInputValue] as string[] | number[]
            tempSplitted[idx] = e

            if (!filtersAreNested) {
              setInputValue(tempSplitted.join(' '))
              //   setSplittedInputValue([...tempSplitted])
            } else {
              // flatten the array first
              FlattenFilters(query.filters)
              query.filters = snurpArr.reverse()
              setQuery({ ...query })
              // dan pas veranderen
              setInputValue(tempSplitted.join(' '))
              //   setSplittedInputValue([...tempSplitted])
              // zet nested filters to false
              setFiltersAreNested(false)
            }
          }}
          options={Object.keys(logicalOperatorsMap)}
          placeholder=""
        />
      </Text>
    </div>
  )
}
