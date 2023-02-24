import React, { useState, useRef, useEffect } from 'react'
import { Text, Select, color, CloseCircleIcon, removeAllOverlays } from '~'
import { styled } from 'inlines'

// move this
const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']

export const FirstFilterPill = ({ setIsFocus }) => {
  const [pillInputValue, setPillInputValue] = useState('Type Is Flappie')
  const [pillIsSelected, setPillIsSelected] = useState(false)

  const inputRef = useRef(null)

  const controller = new AbortController()

  useEffect(() => {
    console.log('flappe')
    if (pillIsSelected) {
      setIsFocus(true)
      document.addEventListener('keydown', (e) => onKeyHandler(e), {
        signal: controller.signal,
      })
    } else if (!pillIsSelected) {
      setIsFocus(false)
      controller.abort()
    }
    //  TODO else remove event listener??
  }, [pillIsSelected])

  useEffect(() => {
    setPillIsSelected(false)
    setIsFocus(false)
    controller.abort()
  }, [pillInputValue])

  let cnt = 0

  const onKeyHandler = (e) => {
    if (e.key === 'Tab' && pillIsSelected) {
      cnt++
      if (cnt === 1) {
        removeAllOverlays()
        console.log('tab was pressed ')
        console.log('cnt  ===> 👻', cnt)
        inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
      }
      if (cnt === 2) {
        removeAllOverlays()
        console.log('DOSS', cnt)
        inputRef.current.nextElementSibling.childNodes[2].childNodes[0].click()
      }
      if (cnt === 3) {
        removeAllOverlays()
        setPillIsSelected(false)
        setIsFocus(false)
        cnt = 0
        //   document.removeEventListener('keydown', onKeyHandler)
        controller.abort()

        // inputRef.current.focus()
      }
      console.log('Count', cnt)
    }

    if (e.key === 'Backspace' && pillIsSelected) {
      console.log('Op je Bek Space')
      deletePill()
    }

    if (e.key !== 'Tab') {
      setPillIsSelected(false)
      cnt = 0
      controller.abort()
    }
  }

  const deletePill = () => {
    console.log('delete this')
    setPillIsSelected(false)
    setPillInputValue('')
  }

  return (
    <>
      <input
        ref={inputRef}
        value={pillInputValue}
        onChange={(e) => setPillInputValue(e.target.value)}
        style={{ border: '1px solid green', position: 'absolute', top: 20 }}
        //  onKeyDown={(e) => onKeyHandler(e)}
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
            onClick={() => {
              inputRef.current.focus()
              setIsFocus(true)
              setPillIsSelected(true)

              //   onClickHandler(e, idx)
            }}
          >
            {idx === 0 && <Text color="text2">{item}</Text>}

            {idx !== 0 && (
              <Select
                ghost
                value={pillInputValue.split(' ')[idx]}
                filterable
                // @ts-ignore
                style={{
                  // @ts-ignore
                  '& div': { padding: '8px', display: 'flex' },
                  '& svg': { display: 'none' },
                }}
                onChange={(e: string) => {
                  // document.getElementById(`selectid-${index}`).childNodes[0].value =
                  //   inputValue.split(' ')[index]
                  console.log('Change --> ', e)
                  const temp = pillInputValue.split(' ')
                  temp[idx] = e
                  setPillInputValue(temp.join(' '))
                  setPillIsSelected(false)
                  // setIsFocus(false)
                  controller.abort()
                }}
                options={
                  idx === 1
                    ? compareOperators
                    : ['Snurpie', 'Flurpie', 'Snorkies']
                }
                placeholder=""
                onClick={() => {
                  console.log('naniniiinin')
                  //   inputRef.current.focus()
                  setIsFocus(true)
                  //  setPillIsSelected(true)
                }}
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
