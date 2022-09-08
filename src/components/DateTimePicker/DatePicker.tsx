import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '~'

export const DatePicker = () => {
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
  const currentDayOfWeek = days[dateObj.getDay()]
  const currentDay = dateObj.getDate()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()

  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const [daysArr, setDaysArr] = useState([])

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // if selected month is - 1 , december en jaar terug,
  // if selected month is + 1, januari en jaar vooruit

  const tempArr = []

  useEffect(() => {
    //empty tempArr
    tempArr.splice(0, tempArr.length)

    console.log(selectedMonth, months[selectedMonth])
    console.log('Days in this month', daysInMonth(selectedMonth, selectedYear))

    for (let i = 0; i <= daysInMonth(selectedMonth, selectedYear); i++) {
      console.log(
        days[new Date(selectedYear, selectedMonth, i).getDay()] + ' ' + i
      )
      tempArr.push(i)
    }

    setDaysArr(tempArr)
  }, [selectedMonth])

  console.log(tempArr)

  return (
    <div
      style={{ border: '1px solid blue', width: 300, height: 300, padding: 10 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          {months[selectedMonth]} {selectedYear}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <ChevronUpIcon
            // @ts-ignore
            onClick={() => setSelectedMonth(selectedMonth - 1)}
          />
          <ChevronDownIcon />
        </div>
      </div>

      {/* days column */}
      <div style={{ display: 'flex', gap: 30, textAlign: 'center' }}>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div>
        {daysArr.map((val, i) => (
          <div
            style={{
              border: '1px solid black',
              width: 34,
              height: 34,
              display: 'inline-block',
              textAlign: 'center',
            }}
            key={i}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  )
}
