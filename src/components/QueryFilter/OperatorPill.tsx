import React, { useRef } from 'react'
import { Text, Select, color, usePropState } from '~'
import { FakeCaret } from './FakeCaret'

const logicalOperators = ['$and', '$or', '$not']

export const OperatorPill = ({
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
  inputReference,
}) => {
  const selectRef = useRef(null)

  const [tempVal] = usePropState(inputValue)

  if (openSelectBox.open) {
    if (index === openSelectBox.num) {
      document.getElementById(`selectid-${index}`).click()
    }

    setOpenSelectBox({ num: index, open: false })
    setCaretPosition(inputValue.length)
  }

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

            inputReference?.current.focus()
            if (inputReference) {
              inputReference.current.selectionStart = inputValue.length
            }

            setCaretPosition(inputValue.length - 1)
          }}
          options={logicalOperators}
          placeholder={value}
        />
      </Text>
    </div>
  )
}
