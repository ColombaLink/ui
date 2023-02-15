import React from 'react'
import { color, Text, Select, StackIcon } from '~'
import { FakeCarret } from './FakeCarret'
import { operatorMap } from './Operators'

type MiddlePillProps = {
  idx: number
  text: string
  carretInBlockSubPos: number
  carretIsInBlockIndex: number
  splittedInputValue: string[]
  setInputValue: (value: string) => void
  setQuery: (value: any) => void
  query: any
  filtersAreNested: boolean
  setFiltersAreNested: (value: boolean) => void
  FlattenFilters: (filters: any) => void
  snurpArr: any[]
}

export const MiddlePill = ({
  idx,
  text,
  carretInBlockSubPos,
  carretIsInBlockIndex,
  splittedInputValue,
  setInputValue,
  setQuery,
  query,
  filtersAreNested,
  setFiltersAreNested,
  FlattenFilters,
  snurpArr,
}: MiddlePillProps) => {
  return (
    <Text
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 30,
        padding: idx === 1 ? 10 : 0,
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
      {idx !== 1 &&
        (!text ? (
          <FakeCarret style={{ marginRight: 10, marginLeft: 10 }} />
        ) : (
          <Select
            ghost
            value={text}
            // @ts-ignore
            style={{
              '& div': { padding: '10px' },
              '& svg': { display: 'none' },
            }}
            onChange={(e) => {
              const tempSplitted = [...splittedInputValue]
              tempSplitted[idx] = e

              if (!filtersAreNested) {
                setInputValue(tempSplitted.join(' '))
                // setSplittedInputValue([...tempSplitted])
              } else {
                FlattenFilters(query.filters)
                query.filters = snurpArr.reverse()
                setQuery({ ...query })

                // dan pas veranderen
                setInputValue(tempSplitted.join(' '))
                setFiltersAreNested(false)
              }
            }}
            options={Object.keys(operatorMap)}
            placeholder=""
          />
        ))}
    </Text>
  )
}
