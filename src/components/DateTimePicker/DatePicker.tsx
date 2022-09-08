import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text, Separator, color } from '~'

type DatePickerProps = {
  year?: number
  month?: number
  day?: number
}

export const DatePicker = ({ year, month, day }: DatePickerProps) => {
  const dateObj = new Date()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
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

  const [memorizedDay, setMemorizedDay] = useState()

  const [selectedDate, setSelectedDate] = useState(
    new Date(selectedYear, selectedMonth, selectedDay)
  )

  console.log('current day', currentDay)
  console.log('selected day', selectedDay)

  const [daysArr, setDaysArr] = useState([])

  // Functions
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const todayHandler = () => {
    setSelectedDay(currentDay)
    setSelectedMonth(currentMonth)
    setSelectedYear(currentYear)
  }

  const oneMonthBack = () => {
    setSelectedMonth(selectedMonth - 1)
    console.log('one month back', selectedMonth)
  }

  const oneMonthForward = () => {
    setSelectedMonth(selectedMonth + 1)
    console.log('one month forward', selectedMonth)
  }

  const areMemorizedDayAndSelectedDayEqual = (a, b) => {
    if (a && b) {
      if (
        a['day'] === b['day'] &&
        a['month'] === b['month'] &&
        a['year'] === b['year']
      ) {
        return true
      }
    }
  }

  // if selected month is - 1 , december en jaar terug,
  // if selected month is + 1, januari en jaar vooruit

  const tempArr = []

  useEffect(() => {
    //if the year should change
    if (selectedMonth === -1) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    }
    if (selectedMonth === 12) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    }

    console.log('memorized day', memorizedDay)

    //empty tempArr
    tempArr.splice(0, tempArr.length)

    for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
      //   console.log(
      //     days[new Date(selectedYear, selectedMonth, i).getDay()] + ' ' + i
      //   )
      tempArr.push({ day: i, month: selectedMonth, year: selectedYear })
    }

    // add some offset for the days layout
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Sat') {
      tempArr.unshift('x', 'x', 'x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Fri') {
      tempArr.unshift('x', 'x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Thu') {
      tempArr.unshift('x', 'x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Wed') {
      tempArr.unshift('x', 'x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Tue') {
      tempArr.unshift('x', 'x')
    }
    if (days[new Date(selectedYear, selectedMonth, 0).getDay()] == 'Mon') {
      tempArr.unshift('x')
    }

    setDaysArr(tempArr)
  }, [selectedMonth])

  console.log(tempArr)

  return (
    <div
      style={{
        border: `1px solid ${color('border')}`,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: 280,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}
      >
        <Text weight={400}>
          {months[selectedMonth]} {selectedYear}
        </Text>

        <div style={{ display: 'flex', gap: 16 }}>
          <ChevronUpIcon
            // @ts-ignore
            onClick={oneMonthBack}
          />
          <ChevronDownIcon
            // @ts-ignore
            onClick={oneMonthForward}
          />
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
                border: areMemorizedDayAndSelectedDayEqual(val, memorizedDay)
                  ? `1px solid ${color('accent')}`
                  : '',
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
                console.log('val', val)
                setSelectedDay(val['day'])
                setMemorizedDay(val)
              }}
            >
              {val['day']}
            </div>
          )
        )}
      </div>

      <div style={{ borderBottom: `1px solid ${color('border')}` }}></div>
      <div style={{ padding: '12px 16px' }}>
        {/* @ts-ignore */}
        <Text weight={400} onClick={todayHandler} space="4px">
          Today
        </Text>
        <Text weight={400} space="4px">
          Select next date
        </Text>
        <Text weight={400} space="4px">
          Select previous date
        </Text>
      </div>
      <div style={{ borderBottom: `1px solid ${color('border')}` }}></div>
      <Text style={{ padding: '8px 16px' }}>Clear</Text>
    </div>
  )
}
