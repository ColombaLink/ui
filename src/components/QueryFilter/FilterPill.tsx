import React, { useRef } from 'react'
import { color, Text, Select } from '~'
import { styled } from 'inlines'

const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']
const logicalOperators = ['$and', '$or', '$not']

const FakeCarret = styled('div', {
  width: 1,
  marginLeft: 1.5,
  marginRight: 1.5,
  marginTop: 2,
  height: 15,
  backgroundColor: color('text'),
  '@keyframes': {
    '0%': { opacity: 0 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
  animationDuration: '1s',
  animationEffect: 'step-start',
  animationIterationCount: 'infinite',
})

//  arithmetic progression
const AP_LIMIT = 70
const aProgress = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n)

console.log('arithmeticProgression', aProgress(7, AP_LIMIT))

type FilterPillProps = {
  value: string
  setInputValue: (e) => void
  InputToFilters: (e) => void
  caretIsInBlockIndex: number
  caretInBlockSubPos: number
  openSelectBox: { num: number; open: boolean }
  setOpenSelectBox: (value: { num: number; open: boolean }) => void
}

export const FilterPill = ({
  value,
  setInputValue,
  InputToFilters,
  caretIsInBlockIndex,
  caretInBlockSubPos,
  openSelectBox,
  setOpenSelectBox,
}: FilterPillProps) => {
  // bepaal in welk index block je de carret terecht komt

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
            openSelectBox={openSelectBox}
            setOpenSelectBox={setOpenSelectBox}
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
            caretIsInBlockIndex={caretIsInBlockIndex}
            openSelectBox={openSelectBox}
            setOpenSelectBox={setOpenSelectBox}
          />
        )
      )}
    </>
  )
}

const LeftPill = ({
  value,
  index,
  caretIsInBlockIndex,
  caretInBlockSubPos,
}) => {
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
      {caretIsInBlockIndex === index
        ? value.split('').map((letter, idx) =>
            idx === caretInBlockSubPos ? (
              <>
                <span>{letter}</span>
                <FakeCarret />
              </>
            ) : (
              <span>{letter}</span>
            )
          )
        : value}
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
  caretIsInBlockIndex,
  openSelectBox,
  setOpenSelectBox,
}) => {
  const selectRef = useRef(null)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (index === openSelectBox.num) {
      selectRef.current?.childNodes[0].childNodes[0].childNodes[0]?.click()
    }

    setOpenSelectBox({ num: index, open: false })
  }

  return (
    <div ref={selectRef}>
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
            const temp = inputValue.split(' ')
            temp[index] = e
            if (caretIsInBlockIndex !== index || index === openSelectBox.num) {
              setInputValue(temp.join(' '))
              InputToFilters(temp.join(' '))
            }
          }}
          options={compareOperators}
          placeholder=""
        />
      </Text>
    </div>
  )
}

const OperatorPill = ({
  value,
  setInputValue,
  inputValue,
  index,
  InputToFilters,
  caretIsInBlockIndex,
  openSelectBox,
  setOpenSelectBox,
}) => {
  const selectRef = useRef(null)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (index === openSelectBox.num) {
      selectRef.current?.childNodes[0].childNodes[0].childNodes[0]?.click()
    }

    setOpenSelectBox({ num: index, open: false })
  }

  return (
    <div ref={selectRef}>
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
            '& div': {
              padding: '10px',
              color: `${color('accent')} !important`,
            },
            '& svg': { display: 'none' },
          }}
          onChange={(e: string) => {
            const temp = inputValue.split(' ')
            temp[index] = e
            if (caretIsInBlockIndex !== index || index === openSelectBox.num) {
              setInputValue(temp.join(' '))
              InputToFilters(temp.join(' '))
            }
          }}
          options={logicalOperators}
          placeholder=""
        />
      </Text>
    </div>
  )
}
