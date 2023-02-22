/* eslint-disable */

import React from 'react'
import { LeftPill } from './LeftPill'
import { MiddlePill } from './MiddlePill'
import { RightPill } from './RightPill'
import { OperatorPill } from './OperatorPill'

//  arithmetic progression
const AP_LIMIT = 70
const aProgress = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)
// console.log('arithmeticProgression', aProgress(7, AP_LIMIT))

type FilterPillProps = {
  value: string
  setInputValue: (e) => void
  InputToFilters: (e) => void
  caretIsInBlockIndex: number
  caretInBlockSubPos: number
  openSelectBox: { num: number; open: boolean }
  setOpenSelectBox: (value: { num: number; open: boolean }) => void
  caretPosition: number
  setCaretPosition: (e) => void
}

export const FilterPill = ({
  value,
  setInputValue,
  InputToFilters,
  caretIsInBlockIndex,
  caretInBlockSubPos,
  openSelectBox,
  setOpenSelectBox,
  caretPosition,
  setCaretPosition,
}: FilterPillProps) => {
  return (
    <>
      {value.split(' ').map((item, idx) =>
        idx === 0 || aProgress(4, AP_LIMIT).includes(idx) ? (
          <LeftPill
            key={idx}
            value={item}
            index={idx}
            caretIsInBlockIndex={caretIsInBlockIndex}
            caretInBlockSubPos={caretInBlockSubPos}
          />
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
            caretIsInBlockIndex={caretIsInBlockIndex}
            caretInBlockSubPos={caretInBlockSubPos}
            openSelectBox={openSelectBox}
            setOpenSelectBox={setOpenSelectBox}
            caretPosition={caretPosition}
            setCaretPosition={setCaretPosition}
          />
        ) : idx === 2 ||
          aProgress(4, AP_LIMIT)
            .map((v) => v + 2)
            .includes(idx) ? (
          <RightPill
            key={idx}
            value={item}
            index={idx}
            caretIsInBlockIndex={caretIsInBlockIndex}
            caretInBlockSubPos={caretInBlockSubPos}
          />
        ) : (
          <OperatorPill
            key={idx}
            value={item}
            setInputValue={setInputValue}
            inputValue={value}
            InputToFilters={InputToFilters}
            index={idx}
            caretIsInBlockIndex={caretIsInBlockIndex}
            caretInBlockSubPos={caretInBlockSubPos}
            openSelectBox={openSelectBox}
            setOpenSelectBox={setOpenSelectBox}
            caretPosition={caretPosition}
            setCaretPosition={setCaretPosition}
          />
        )
      )}
    </>
  )
}
