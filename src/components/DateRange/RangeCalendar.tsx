import React, { useEffect, useState } from 'react'
import { styled, color, useContextState } from '~'

type RangeCalendarProps = {
  days: string[]
  selectedDay: string
  selectedMonth: string
  selectedYear: string
  setSelectedDay: (e) => void
  fromRangeCal?: boolean
  tillRangeCal?: boolean
}

export const RangeCalendar = ({
  selectedDay,
  selectedMonth,
  selectedYear,
  days,
  setSelectedDay,
  fromRangeCal,
  tillRangeCal,
}: RangeCalendarProps) => {
  const [daysArr, setDaysArr] = useState([])

  const [hoverDay, setHoverDay] = useState(null)
  const [hoverMonth, setHoverMonth] = useState(null)
  const [hoverYear, setHoverYear] = useState()

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  const [fromValue] = useContextState('fromValue')
  const [tillValue] = useContextState('tillValue')

  const fromDateObj = new Date(+fromValue)
  const fromYear = fromDateObj.getFullYear()
  const fromMonth = fromDateObj.getMonth() + 1
  const fromDay = fromDateObj.getDate()

  //   console.log('FROM --> ', fromYear, fromMonth, fromDay)

  const tillDateObj = new Date(+tillValue)
  const tillYear = tillDateObj.getFullYear()
  const tillMonth = tillDateObj.getMonth() + 1
  const tillDay = tillDateObj.getDate()

  //   console.log('Till --> ', tillYear, tillMonth, tillDay)

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

  const checkIfRanged = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkTime = new Date(year, month, day).getTime()

    if (checkTime > fromTime && checkTime < tillTime) {
      //   console.log('🔮')
      return true
    }
  }

  const checkIfIsHoverDay = (year, month, day) => {
    const fromTime = new Date(fromYear, fromMonth, fromDay).getTime()
    const tillTime = new Date(tillYear, tillMonth, tillDay).getTime()
    const checkValTime = new Date(year, month, day).getTime()
    const hoverTime = new Date(hoverYear, hoverMonth, hoverDay).getTime()

    if (
      checkValTime < fromTime &&
      checkValTime > hoverTime &&
      +hoverDay !== 0 &&
      tillTime > checkValTime &&
      fromRangeCal
    ) {
      return true
    } else if (
      checkValTime > tillTime &&
      checkValTime < hoverTime &&
      +hoverDay !== 0 &&
      fromTime < checkValTime &&
      tillRangeCal
    ) {
      return true
    }
  }

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
                width: 34,
                height: 26,
                // margin: '4px',
                marginTop: '4px',
                marginBottom: '4px',
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
              onMouseEnter={() => {
                console.log('hover day', hoverDay)
                if (val.day !== null) {
                  setHoverDay(val.day)
                  setHoverMonth(val.month)
                  setHoverYear(val.year)
                }
              }}
              onMouseLeave={() => {
                setHoverDay(null)
                setHoverMonth(null)
                setHoverYear(null)
              }}
              style={{
                border:
                  val.day === presentDay &&
                  +selectedMonth === currentMonth + 1 &&
                  +selectedYear === currentYear
                    ? `1px solid ${color('accent')}`
                    : '',
                background:
                  val.day === +selectedDay
                    ? color('accent')
                    : val.day === fromDay &&
                      +selectedMonth === fromMonth &&
                      +selectedYear === fromYear
                    ? color('accent')
                    : val.day === tillDay &&
                      +selectedMonth === tillMonth &&
                      +selectedYear === tillYear
                    ? color('accent')
                    : checkIfRanged(val.year, val.month, val.day)
                    ? color('lightaccent')
                    : checkIfIsHoverDay(val.year, val.month, val.day)
                    ? color('border')
                    : '',
                color:
                  val.day === +selectedDay
                    ? color('background')
                    : val.day === fromDay &&
                      +selectedMonth === fromMonth &&
                      +selectedYear === fromYear
                    ? color('background')
                    : val.day === tillDay &&
                      +selectedMonth === tillMonth &&
                      +selectedYear === tillYear
                    ? color('background')
                    : color('text'),
                borderRadius: checkIfRanged(val.year, val.month, val.day)
                  ? 0
                  : checkIfIsHoverDay(val.year, val.month, val.day)
                  ? 0
                  : 4,
                boxSizing: 'border-box',
                width: 34,
                height: 26,
                marginTop: '4px',
                marginBottom: '4px',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  background: val.day && color('accent'),
                  cursor: 'pointer',
                  color: val.day && color('background'),
                  borderRadius: '4px !important',
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
