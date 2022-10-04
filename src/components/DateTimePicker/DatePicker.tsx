import React, { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text, color } from '~'
import { styled } from 'inlines'

type DatePickerProps = {
  inputValue?: string
  setInputValue?: (value: string) => void
  setShowDatePicker?: (value: boolean) => void
  setFocused?: (value: boolean) => void
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

export const DatePicker = ({
  inputValue,
  setInputValue,
  setShowDatePicker,
  setFocused,
}: DatePickerProps) => {
  const dateObj = new Date()
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

  const currentDay = dateObj.getDate()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()

  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

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

    setInputValue(`${year}-${month}-${day}`)
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
    setSelectedDay(+inputValue?.split('-')[2])
    setSelectedMonth(+inputValue?.split('-')[1])
    setSelectedYear(+inputValue?.split('-')[0])
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

    // add some offset for the days layout
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Sat') {
      tempArr.unshift('x', 'x', 'x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Fri') {
      tempArr.unshift('x', 'x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Thu') {
      tempArr.unshift('x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Wed') {
      tempArr.unshift('x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Tue') {
      tempArr.unshift('x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] === 'Mon') {
      tempArr.unshift('x')
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
          {months[+inputValue?.split('-')[1]]} {selectedYear}
        </Text>

        <div style={{ display: 'flex', gap: 16 }}>
          <ChevronUpIcon onClick={oneMonthBack} />
          <ChevronDownIcon onClick={oneMonthForward} />
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
            <div
              style={{
                border:
                  val.day === selectedDay ? `1px solid ${color('accent')}` : '',
                borderRadius: 4,
                width: 26,
                height: 26,
                margin: 4,
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={i}
              onClick={() => {
                changeHandler(selectedYear, selectedMonth, val.day)
              }}
            >
              {val.day}
            </div>
          )
        )}
      </div>

      <div style={{ borderBottom: `1px solid ${color('border')}` }} />
      <div style={{ padding: '12px 16px' }}>
        <Text weight={400} onClick={todayHandler} space="4px">
          Today
        </Text>
        <Text weight={400} space="4px" onClick={nextDay}>
          Select next date
        </Text>
        <Text weight={400} space="4px" onClick={prevDay}>
          Select previous date
        </Text>
      </div>
      <div style={{ borderBottom: `1px solid ${color('border')}` }} />

      <Text
        style={{ padding: '8px 16px' }}
        weight={400}
        onClick={() => changeHandler('YYYY', 'MM', 'DD')}
      >
        Clear
      </Text>
    </StyledDatePickerBox>
  )
}
