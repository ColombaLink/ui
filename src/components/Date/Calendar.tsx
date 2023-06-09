import React, { useEffect, useState } from 'react'
import { styled, color } from '~'

type CalendarProps = {
  days: string[]
  selectedDay: string
  selectedMonth: string
  selectedYear: string
  setSelectedDay: (e) => void
}

export const Calendar = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  days,
  setSelectedDay,
}: CalendarProps) => {
  const [daysArr, setDaysArr] = useState([])

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // to determine the current day
  const dateObj = new Date()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()
  const presentDay = dateObj.getDate()

  const tempArr = []

  // Calender layout offset
  useEffect(() => {
    tempArr.splice(0, tempArr.length)

    for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
      tempArr.push({ day: i, month: selectedMonth, year: selectedYear })
    }

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
  }, [selectedMonth, selectedYear])

  return (
    <>
      <styled.div
        style={{
          display: 'flex',
          textAlign: 'center',
          color: 'grey',
          padding: '0px 20px',
          justifyContent: 'center',
          '& div': {
            width: '26px',
            textAlign: 'center',
            margin: '4px',
          },
        }}
      >
        <styled.div>M</styled.div>
        <styled.div>T</styled.div>
        <styled.div>W</styled.div>
        <styled.div>T</styled.div>
        <styled.div>F</styled.div>
        <styled.div>S</styled.div>
        <styled.div>S</styled.div>
      </styled.div>

      <styled.div style={{ padding: '10px 20px' }}>
        {daysArr.map((val, i) =>
          val === 'x' ? (
            <styled.div
              key={i}
              style={{
                width: 26,
                height: 26,
                margin: '4px',
                display: 'inline-flex',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              }}
            >
              .
            </styled.div>
          ) : (
            <styled.div
              style={{
                border:
                  val.day === presentDay &&
                  +selectedMonth === currentMonth + 1 &&
                  +selectedYear === currentYear
                    ? `1px solid ${color('accent')}`
                    : '',
                background: val.day === +selectedDay ? color('accent') : '',
                color:
                  val.day === +selectedDay
                    ? color('background')
                    : color('text'),
                borderRadius: 4,
                boxSizing: 'border-box',
                width: 26,
                height: 26,
                margin: '4px',
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
                setSelectedDay(val.day < 10 ? `0${val.day}` : `${val.day}`)
              }}
            >
              {val.day}
            </styled.div>
          )
        )}
      </styled.div>

      <styled.div style={{ borderBottom: `1px solid ${color('border')}` }} />
    </>
  )
}
