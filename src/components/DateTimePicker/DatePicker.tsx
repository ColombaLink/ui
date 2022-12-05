import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text, color } from '~'
import { styled } from 'inlines'

type DatePickerProps = {
  inputValue?: string
  setInputValue?: (value: string) => void
  setShowDatePicker?: (value: boolean) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
}

const StyledDatePickerBox = styled('div', {
  background: color('background'),
  position: 'absolute',
  border: `1px solid ${color('border')}`,
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  width: 280,
  zIndex: 1,
  boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)',
})

const StyledChevronHolders = styled('div', {
  borderRadius: 4,
  height: 24,
  width: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': { background: color('border'), cursor: 'pointer' },
})

export const DatePicker = ({
  inputValue,
  setInputValue,
  setShowDatePicker,
  setFocused,
  clearHandler,
}: DatePickerProps) => {
  const dateObj = new Date()

  // console.log('Date', dateObj, dateObj.getDate())
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // console.log('INPUT VALUE UIT DE PICKER', inputValue)

  const currentDay = dateObj.getDate()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()

  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const [presentDay] = useState(currentDay)

  const datePickerRef = useRef(null)

  const changeHandler = (year, month, day) => {
    if (day < 10) {
      day = `0${day}`
      setSelectedDay(day)
    } else {
      setSelectedDay(day)
    }
    if (month < 10) {
      month = `0${month}`
      setSelectedMonth(month)
    } else {
      setSelectedMonth(month)
    }
    setSelectedYear(year)

    // setInputValue(`${year}-${month}-${day}`)
    setInputValue(`${day}/${month}/${year}`)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false)
        setFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [datePickerRef])

  useEffect(() => {
    setSelectedDay(+inputValue?.split('/')[0])
    setSelectedMonth(+inputValue?.split('/')[1])
    setSelectedYear(+inputValue?.split('/')[2])
  }, [inputValue])

  const [daysArr, setDaysArr] = useState([])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  const todayHandler = () => {
    changeHandler(
      dateObj.getFullYear(),
      (dateObj.getMonth() + 1).toString().slice(-2),
      dateObj.getDate()
    )
  }

  const oneMonthBack = () => {
    if (selectedMonth === +'01') {
      changeHandler(selectedYear - 1, 12, selectedDay)
    } else {
      changeHandler(selectedYear, selectedMonth - 1, selectedDay)
    }
  }
  const oneMonthForward = () => {
    if (selectedMonth === 12) {
      changeHandler(selectedYear + 1, 1, selectedDay)
    } else {
      changeHandler(selectedYear, selectedMonth + 1, selectedDay)
    }
  }

  const nextDay = () => {
    if (selectedDay === daysInMonth(selectedMonth, selectedYear)) {
      if (selectedMonth === 12) {
        changeHandler(selectedYear + 1, +'01', +'01')
      } else {
        changeHandler(selectedYear, selectedMonth + 1, +'01')
      }
    } else {
      changeHandler(selectedYear, selectedMonth, selectedDay + 1)
    }
  }

  const prevDay = () => {
    if (selectedDay === +'01') {
      if (selectedMonth === +'01') {
        changeHandler(
          selectedYear - 1,
          +'12',
          daysInMonth(12, selectedYear - 1)
        )
      } else {
        changeHandler(
          selectedYear,
          selectedMonth - 1,
          daysInMonth(selectedMonth - 1, selectedYear)
        )
      }
    } else {
      changeHandler(selectedYear, selectedMonth, selectedDay - 1)
    }
  }

  const tempArr = []

  useEffect(() => {
    tempArr.splice(0, tempArr.length)

    for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
      tempArr.push({ day: i, month: selectedMonth, year: selectedYear })
    }

    // console.log(
    //   'whats this than slut',
    //   days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()]
    // )

    // add some offset for the days layout
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Sat'
    ) {
      tempArr.unshift('x', 'x', 'x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Fri'
    ) {
      tempArr.unshift('x', 'x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Thu'
    ) {
      tempArr.unshift('x', 'x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Wed'
    ) {
      tempArr.unshift('x', 'x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Tue'
    ) {
      tempArr.unshift('x')
    }
    if (
      days[new Date(`${selectedMonth} 1, ${selectedYear}`).getDay()] === 'Mon'
    ) {
      // tempArr.unshift()
    }

    setDaysArr(tempArr)
  }, [selectedMonth])

  return (
    <StyledDatePickerBox ref={datePickerRef}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}
      >
        <Text weight={400}>
          {months[+inputValue?.split('/')[1]]} {selectedYear}
        </Text>

        <div style={{ display: 'flex', gap: 16 }}>
          <StyledChevronHolders onClick={oneMonthBack}>
            <ChevronUpIcon />
          </StyledChevronHolders>
          <StyledChevronHolders onClick={oneMonthForward}>
            <ChevronDownIcon />
          </StyledChevronHolders>
        </div>
      </div>

      {/* days column */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          textAlign: 'center',
          color: 'grey',
          padding: '0px 20px',
          justifyContent: 'center',
        }}
      >
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>

      <div style={{ padding: '10px 20px' }}>
        {daysArr.map((val, i) =>
          val === 'x' ? (
            <div
              key={i}
              style={{
                width: 26,
                height: 26,
                margin: 4,
                display: 'inline-flex',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              }}
            >
              .
            </div>
          ) : (
            <styled.div
              style={{
                border:
                  val.day === presentDay &&
                  selectedMonth === currentMonth + 1 &&
                  selectedYear === currentYear
                    ? `1px solid ${color('accent')}`
                    : '',
                background: val.day === selectedDay ? color('accent') : '',
                color:
                  val.day === selectedDay ? color('background') : color('text'),
                borderRadius: 4,
                width: 26,
                height: 26,
                margin: 4,
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  background:
                    val.day === selectedDay ? color('accent') : color('border'),
                  cursor: 'pointer',
                },
              }}
              key={i}
              onClick={() => {
                changeHandler(selectedYear, selectedMonth, val.day)
                // now close it
                setShowDatePicker(false)
                setFocused(false)
              }}
            >
              {val.day}
            </styled.div>
          )
        )}
      </div>

      <div style={{ borderBottom: `1px solid ${color('border')}` }} />
      <styled.div
        style={{
          padding: '12px 16px',
          '& div': {
            '&:hover': { cursor: 'pointer' },
          },
        }}
      >
        <Text weight={400} onClick={todayHandler} space="4px">
          Today
        </Text>
        <Text weight={400} space="4px" onClick={nextDay} style={{}}>
          Select next date
        </Text>
        <Text weight={400} space="4px" onClick={prevDay} style={{}}>
          Select previous date
        </Text>
      </styled.div>
      <div style={{ borderBottom: `1px solid ${color('border')}` }} />

      <Text
        style={{ padding: '8px 16px' }}
        weight={400}
        onClick={() => {
          clearHandler()
          setShowDatePicker(false)
          setFocused(false)
        }}
      >
        Clear
      </Text>
    </StyledDatePickerBox>
  )
}
