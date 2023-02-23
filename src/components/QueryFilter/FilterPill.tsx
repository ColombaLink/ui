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
  inputReference?
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
  inputReference,
}: FilterPillProps) => {
  ///
  const PutCursorInRightPlaceOnClick = (e, idx, offset = 0) => {
    // if you do not click the div.
    if (e.target.tagName !== 'div') {
      const countedBlocksLength = value
        .split(' ')
        .reduce((acc, curr, index) => {
          if (index < idx) {
            return acc + curr.length + 1
          } else {
            return acc
          }
        }, 0)

      caretIsInBlockIndex = idx

      const newSelectedCarretPosition =
        countedBlocksLength + +e.target.id.substr(9) + offset
      setCaretPosition(newSelectedCarretPosition)

      inputReference?.current?.focus()
      inputReference.current.selectionStart = newSelectedCarretPosition + 1
      inputReference.current.selectionEnd = newSelectedCarretPosition + 1
    }
  }

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
            onClick={(e) => {
              e.stopPropagation()
              caretIsInBlockIndex = idx
              PutCursorInRightPlaceOnClick(e, idx)
            }}
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
            onClick={(e) => {
              e.stopPropagation()
              caretIsInBlockIndex = idx
              PutCursorInRightPlaceOnClick(e, idx)
            }}
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
