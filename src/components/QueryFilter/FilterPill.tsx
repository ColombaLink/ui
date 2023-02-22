import React, { useRef } from 'react'
import { color, Text, Select, usePropState } from '~'
import { FakeCarret } from './FakeCarret'

const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']
const logicalOperators = ['$and', '$or', '$not']

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
              <React.Fragment key={idx}>
                <span>{letter}</span>
                <FakeCarret />
              </React.Fragment>
            ) : (
              <span key={idx}>{letter}</span>
            )
          )
        : value}
    </Text>
  )
}

const RightPill = ({
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
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: color('lighttext'),
        borderRight: `1px solid ${color('border')}`,
        position: 'relative',
        cursor: 'text',
      }}
    >
      {caretIsInBlockIndex === index
        ? value.split('').map((letter, idx) =>
            idx === caretInBlockSubPos ? (
              <React.Fragment key={idx}>
                <span>{letter}</span>
                <FakeCarret />
              </React.Fragment>
            ) : (
              <span key={idx}>{letter}</span>
            )
          )
        : value}
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
  caretInBlockSubPos,
  openSelectBox,
  setOpenSelectBox,
  caretPosition,
  setCaretPosition,
}) => {
  const selectRef = useRef(null)

  const [tempVal, setTempVal] = usePropState(inputValue)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (index === openSelectBox.num) {
      console.log('NANI??')
      document.getElementById(`selectid-${index}`).click()
    }

    setOpenSelectBox({ num: index, open: false })
    setCaretPosition(inputValue.length)
  }

  console.log(selectRef.current)

  console.log(
    'flippie -->',
    document.getElementById(`selectid-${index}`)?.childNodes[0]
  )

  return (
    <div ref={selectRef}>
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          // gap: 8,
          height: 30,
          padding: 10,
          minWidth: 'auto',
          backgroundColor: color('lighttext'),
          borderRight: `1px solid ${color('border')}`,
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => {
          // open selectbox
          setOpenSelectBox({ num: index, open: true })
        }}
      >
        {caretIsInBlockIndex === index
          ? value.split('').map((letter, idx) =>
              idx === caretInBlockSubPos ? (
                <React.Fragment key={idx}>
                  <span>{letter}</span>
                  <FakeCarret />
                </React.Fragment>
              ) : (
                <span key={idx}>{letter}</span>
              )
            )
          : value}

        <Select
          id={`selectid-${index}`}
          ghost
          value={tempVal.split(' ')[index]}
          // @ts-ignore
          style={{
            // @ts-ignore
            background: 'yellow',
            width: 0,
            '& div': { padding: '10px', display: 'flex' },
            '& svg': { display: 'none' },
          }}
          onChange={(e: string) => {
            if (caretIsInBlockIndex !== index) {
              const temp = tempVal.split(' ')
              temp[index] = e
              setInputValue(temp.join(' '))
              InputToFilters(temp.join(' '))
              setCaretPosition(caretPosition)
            }

            // document.getElementById(`selectid-${index}`).childNodes[0].value =
            //   inputValue.split(' ')[index]
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
  caretInBlockSubPos,
  openSelectBox,
  setOpenSelectBox,
  caretPosition,
  setCaretPosition,
}) => {
  const selectRef = useRef(null)

  const [tempVal, setTempVal] = usePropState(inputValue)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (index === openSelectBox.num) {
      console.log('NANI??')
      document.getElementById(`selectid-${index}`).click()
    }

    setOpenSelectBox({ num: index, open: false })
    setCaretPosition(inputValue.length)
  }

  console.log(selectRef.current)

  console.log(
    'flippie -->',
    document.getElementById(`selectid-${index}`)?.childNodes[0]
  )

  return (
    <div ref={selectRef}>
      <Text
        color="accent"
        style={{
          display: 'flex',
          alignItems: 'center',
          // gap: 8,
          padding: 10,
          height: 30,
          minWidth: 'auto',
          backgroundColor: color('background'),
          border: `1px solid ${color('accent')}`,
          borderRadius: 4,
          position: 'relative',
          marginLeft: 6,
          marginRight: 6,
          cursor: 'pointer',
        }}
        onClick={() => {
          // open selectbox
          setOpenSelectBox({ num: index, open: true })
        }}
      >
        {caretIsInBlockIndex === index
          ? value.split('').map((letter, idx) =>
              idx === caretInBlockSubPos ? (
                <React.Fragment key={idx}>
                  <span>{letter}</span>
                  <FakeCarret />
                </React.Fragment>
              ) : (
                <span key={idx}>{letter}</span>
              )
            )
          : value}

        <Select
          id={`selectid-${index}`}
          ghost
          value={tempVal.split(' ')[index]}
          // @ts-ignore
          style={{
            background: 'yellow',
            width: 0,
            // @ts-ignore
            '& div': {
              padding: '10px',
              color: `${color('accent')} !important`,
            },
            '& svg': { display: 'none' },
          }}
          onChange={(e: string) => {
            if (caretIsInBlockIndex !== index) {
              const temp = tempVal.split(' ')
              temp[index] = e
              setInputValue(temp.join(' '))
              InputToFilters(temp.join(' '))
              setCaretPosition(caretPosition)
            }
          }}
          options={logicalOperators}
          placeholder={value}
        />
      </Text>
    </div>
  )
}
