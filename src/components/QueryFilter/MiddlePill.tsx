import React, { useRef } from 'react'
import { Text, Select, color, usePropState } from '~'
import { FakeCaret } from './FakeCaret'

const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']

export const MiddlePill = ({
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

  const [tempVal] = usePropState(inputValue)

  if (openSelectBox.open) {
    // selectRef.current.focus()
    if (index === openSelectBox.num) {
      document.getElementById(`selectid-${index}`).click()
    }

    setOpenSelectBox({ num: index, open: false })
    setCaretPosition(inputValue.length)
  }

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
                  <FakeCaret />
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
