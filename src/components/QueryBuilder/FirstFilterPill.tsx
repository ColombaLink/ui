import React, { useState, useRef, useEffect } from 'react'
import { Text, Select, color, CloseCircleIcon, removeAllOverlays } from '~'
import { styled } from 'inlines'

// move this
const compareOperators = ['=', '!=', '>', '<', '>=', '<=', 'includes', 'has']

export const FirstFilterPill = () => {
  const [pillInputValue, setPillInputValue] = useState('Type Is Flappie')
  const [pillIsSelected, setPillIsSelected] = useState(false)
  const [tabCount, setTabCount] = useState(0)
  const [openOnePill, setOpenOnePill] = useState(false)
  const [openSecondPill, setOpenSecondPill] = useState(false)

  const inputRef = useRef(null)

  const onClickHandler = (e, idx) => {
    if (idx === 0) {
      setPillIsSelected(true)
      inputRef.current.focus()
    }
  }

  // useEffect(() => {
  //   let counter = 0
  //   window.addEventListener('keydown', (e) => {
  //     if (e.key === 'Tab') {
  //       e.preventDefault()
  //       counter++
  //       setTabCount(counter)
  //       console.log('Counter 🎃', counter)
  //     } else {
  //       setPillIsSelected(false)
  //       setOpenOnePill(false)
  //       setOpenSecondPill(false)
  //     }
  //   })
  // }, [])

  // useEffect(() => {
  //   if (pillIsSelected && !openOnePill && !openSecondPill) {
  //     inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
  //     setOpenOnePill(true)
  //   }
  //   if (openOnePill && pillIsSelected) {
  //     removeAllOverlays()
  //     inputRef.current.nextElementSibling.childNodes[2].childNodes[0].click()
  //     setOpenSecondPill(true)
  //     setOpenOnePill(false)
  //   }
  //   if (openSecondPill && pillIsSelected) {
  //     removeAllOverlays()
  //     setPillIsSelected(false)
  //     setOpenSecondPill(false)
  //   }
  // }, [tabCount])

  // const tabHand = () => {
  //   inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
  //   console.log(tabCount, '<__tabCount___--')

  //   inputRef.current.nextElementSibling.childNodes[2].childNodes[0].click()
  // }

  // inputRef.current.nextElementSibling.childNodes[1].childNodes[0].addEventListener(
  //   'keydown',
  //   (e) => {
  //     console.log('ARR ', e)
  //   }
  // )

  // const [tabbieCount, setTabbieCount] = useState(1)
  // // let tabbieCount = 0
  useEffect(() => {
    console.log('flappe')
    window.addEventListener('keydown', (e) => onKeyHandler(e))
  }, [])

  // console.log('Tabbie count 👻', tabbieCount)
  // useEffect(() => {
  //   inputRef.current.focus()
  // }, [tabbieCount])

  let cnt = 0
  const onKeyHandler = (e) => {
    // tabbieCount++
    e.preventDefault()
    e.stopPropagation()
    if (e.key === 'Tab') {
      cnt++
      if (cnt === 1) {
        console.log('tab was pressed and selected is true')
        console.log('cunt  ===> 👻', cnt)
        inputRef.current.nextElementSibling.childNodes[1].childNodes[0].click()
      }
      if (cnt === 2) {
        removeAllOverlays()
        console.log('DOSS', cnt)
        inputRef.current.nextElementSibling.childNodes[2].childNodes[0].click()
      }
      if (cnt === 3) {
        removeAllOverlays()
        inputRef.current.focus()
        cnt = 0
      }
      // window.addEventListener('keydown', (e) =>
      //   e.key === 'Tab' ? removeAllOverlays() : null
      // )
      console.log('Count', cnt)
      // tabHand()
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
