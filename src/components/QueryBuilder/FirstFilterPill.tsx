import React, { useState, useRef } from 'react'
import { Text, Select, color, CloseCircleIcon } from '~'
import { styled } from 'inlines'

// move this
const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']

export const FirstFilterPill = () => {
  const [pillInputValue, setPillInputValue] = useState('Type Is Flappie')
  const [pillIsSelected, setPillIsSelected] = useState(false)

  const inputRef = useRef(null)

  const onClickHandler = (e, idx) => {
    if (idx === 0) {
      setPillIsSelected(true)
      inputRef.current.focus()
    }
  }

  const onKeyHandler = (e) => {
    e.preventDefault()
    if (e.key === 'Tab') {
      console.log('tab was pressed')
      if (pillIsSelected) {
        console.log('tab was pressed and selected is true')
        console.log(inputRef.current.nextElementSibling.childNodes[1])
        inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
        setPillIsSelected(false)
      }
    }
    if (e.key === 'Backspace' && pillIsSelected) {
      console.log('Op je Bek Space')
      deletePill()
    }
  }

  const deletePill = () => {
    console.log('delete this')
    setPillIsSelected(false)
  }

  return (
    <>
      <input
        ref={inputRef}
        value={pillInputValue}
        onChange={(e) => setPillInputValue(e.target.value)}
        style={{ border: '1px solid green', position: 'absolute', top: 20 }}
        onKeyDown={(e) => onKeyHandler(e)}
      />
      <div style={{ display: 'flex', position: 'relative' }}>
        {pillInputValue.split(' ').map((item, idx) => (
          <styled.div
            style={{
              height: 28,
              padding: idx === 0 ? 8 : 0,
              display: 'flex',
              alignItems: 'center',
              borderTopLeftRadius: idx === 0 ? 4 : 0,
              borderBottomLeftRadius: idx === 0 ? 4 : 0,
              borderTopRightRadius: idx === 2 ? 4 : 0,
              borderBottomRightRadius: idx === 2 ? 4 : 0,
              backgroundColor: pillIsSelected
                ? 'rgba(44, 60, 234, 0.08)'
                : color('lightgrey'),
              borderRight: `1px solid ${color('border')}`,
              position: 'relative',
              cursor: 'text',
              '&:hover': {
                backgroundColor: pillIsSelected
                  ? 'rgba(44, 60, 234, 0.08)'
                  : color('lightgrey:hover'),
              },
            }}
            key={idx}
            onClick={(e) => onClickHandler(e, idx)}
          >
            {idx === 0 && <Text color="text2">{item}</Text>}

            {idx !== 0 && (
              <Select
                ghost
                value={pillInputValue.split(' ')[idx]}
                filterable
                // @ts-ignore
                style={{
                  //  background: 'yellow',

                  // @ts-ignore
                  '& div': { padding: '8px', display: 'flex' },
                  '& svg': { display: 'none' },
                }}
                onChange={(e: string) => {
                  // document.getElementById(`selectid-${index}`).childNodes[0].value =
                  //   inputValue.split(' ')[index]
                  const temp = pillInputValue.split(' ')
                  temp[idx] = e
                  setPillInputValue(temp.join(' '))
                }}
                options={idx === 1 ? compareOperators : ['blha', 'bjha']}
                placeholder=""
              />
            )}
          </styled.div>
        ))}
        {pillIsSelected && (
          <CloseCircleIcon
            color="accent"
            size={12}
            style={{
              position: 'absolute',
              top: -4,
              right: -5,
              cursor: 'pointer',
            }}
            onClick={() => deletePill()}
          />
        )}
      </div>
    </>
  )
}
