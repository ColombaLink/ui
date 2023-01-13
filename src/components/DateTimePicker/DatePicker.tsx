import React, { useState, useEffect, useRef, CSSProperties } from 'react'
import { ChevronDownIcon, ChevronUpIcon, Text, color } from '~'
import { styled } from 'inlines'

type DatePickerProps = {
  inputValue?: string
  setInputValue?: (value: string) => void
  setShowDatePicker?: (value: boolean) => void
  setFocused?: (value: boolean) => void
  clearHandler?: () => void
  fromValue?: string
  tillValue?: string
  isDateRange?: boolean
  style?: CSSProperties
  setFocusOnBeginDate?: (value: boolean) => void
  setFocusOnEndDate?: (value: boolean) => void
  setFromValue?: (value: string) => void
  setTillValue?: (value: string) => void
  focusOnBeginDate?: boolean
  focusOnEndDate?: boolean
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
  fromValue,
  tillValue,
  isDateRange,
  style,
  setFocusOnBeginDate,
  setFocusOnEndDate,
  setFromValue,
  setTillValue,
  focusOnBeginDate,
  focusOnEndDate,
}: DatePickerProps) => {
  const dateObj = new Date()

  // console.log('TILL VALUE UIT DE PICKER -->', tillValue)
  // console.log('from VALUE UIT DE PICKER', fromValue)

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

  const currentDay = dateObj.getDate()
  const currentMonth = dateObj.getMonth()
  const currentYear = dateObj.getFullYear()

  const [selectedDay, setSelectedDay] = useState(currentDay)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [presentDay] = useState(currentDay)

  // FROM
  const [fromDay, setFromDay] = useState(+fromValue?.split('/')[0])
  const [fromMonth, setFromMonth] = useState(+fromValue?.split('/')[1])
  const [fromYear, setFromYear] = useState(+fromValue?.split('/')[2])
  // console.log('fromDay, fromMonth, fromYear', fromDay, fromMonth, fromYear)

  // TILL
  const [tillDay, setTillDay] = useState(+tillValue?.split('/')[0])
  const [tillMonth, setTillMonth] = useState(+tillValue?.split('/')[1])
  const [tillYear, setTillYear] = useState(+tillValue?.split('/')[2])
  // console.log('tillDay, tillMonth, tillYear', tillDay, tillMonth, tillYear)

  const [hoverDay, setHoverDay] = useState(null)
  const [hoverMonth, setHoverMonth] = useState(null)
  const [hoverYear, setHoverYear] = useState(null)

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

    // if you press before the from date
    if (
      makeDateForComparison(year, month, day) <
      makeDateForComparison(fromYear, fromMonth, fromDay)
    ) {
      console.log('fire fire 🍟')
      setFromDay(day)
      setFromMonth(month)
      setFromYear(year)

      setFromValue(`${day}/${month}/${year}`)

      setTillDay(tillDay)
      setTillMonth(tillMonth)
      setTillYear(tillYear)

      setTillValue(`${tillDay}/${tillMonth}/${tillYear}`)

      //  close the datepicker and switch to the from date field picker
      if (focusOnEndDate) {
        setShowDatePicker(false)
      }

      setFocusOnBeginDate(true)
      setFocusOnEndDate(false)
    } else {
      setInputValue(`${day}/${month}/${year}`)
    }
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

    if (fromValue) {
      setFromDay(+fromValue?.split('/')[0])
      setFromMonth(+fromValue?.split('/')[1])
      setFromYear(+fromValue?.split('/')[2])
    }

    if (tillValue) {
      setTillDay(+tillValue?.split('/')[0])
      setTillMonth(+tillValue?.split('/')[1])
      setTillYear(+tillValue?.split('/')[2])
    }
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

    // console.log('selectedMonth', selectedMonth)
    // console.log('selectedYear', selectedYear)
    // console.log('selectedDay', selectedDay)

    // console.log(
    //   'whats this?',
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

  const makeDateForComparison = (year, month, day) => {
    if (day < 10) {
      day = `0${day}`
    }
    if (month < 10) {
      month = `0${month}`
    }
    // return de datum in milliseconds
    return Date.parse(`${year}-${month}-${day}`)
  }

  // use for styling the ranged days divs
  const isRangedDay = (year, month, day) => {
    return (
      makeDateForComparison(year, month, day) >
        makeDateForComparison(fromYear, fromMonth, fromDay) &&
      makeDateForComparison(year, month, day) <
        makeDateForComparison(tillYear, tillMonth, tillDay) &&
      makeDateForComparison(selectedYear, selectedMonth, selectedDay)
    )
  }
  const isFromDay = (year, month, day) => {
    return day === fromDay && month === fromMonth && year === fromYear
  }
  const isTillDay = (year, month, day) => {
    return day === tillDay && month === tillMonth && year === tillYear
  }

  const isHoverDay = () => {
    return makeDateForComparison(hoverYear, hoverMonth, hoverDay)
  }
  // get hover day value
  //

  return (
    <StyledDatePickerBox ref={datePickerRef} style={{ ...style }}>
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
                background:
                  val.day === selectedDay ||
                  isFromDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day)
                    ? color('accent')
                    : isRangedDay(val.year, val.month, val.day)
                    ? color('lightaccent')
                    : '',

                // background:
                //   makeDateForComparison(fromYear, fromMonth, fromDay) <=
                //   makeDateForComparison(hoverYear, hoverMonth, hoverDay)
                //     ? color('red')
                //     : color('green'),
                color:
                  val.day === selectedDay ||
                  isFromDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day)
                    ? color('background')
                    : color('text'),
                borderRadius: isFromDay(val.year, val.month, val.day)
                  ? '4px 0px 0px 4px'
                  : isTillDay(val.year, val.month, val.day)
                  ? '0px 4px 4px 0px'
                  : isRangedDay(val.year, val.month, val.day)
                  ? 0
                  : 4,

                width: isRangedDay(val.year, val.month, val.day)
                  ? 34
                  : isFromDay(val.year, val.month, val.day) ||
                    isTillDay(val.year, val.month, val.day)
                  ? 32
                  : 26,
                height: 26,
                margin: 4,
                marginLeft:
                  isRangedDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day)
                    ? 0
                    : isFromDay(val.year, val.month, val.day)
                    ? 2
                    : 4,
                marginRight:
                  isRangedDay(val.year, val.month, val.day) ||
                  isFromDay(val.year, val.month, val.day)
                    ? 0
                    : isTillDay(val.year, val.month, val.day)
                    ? 2
                    : 4,

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
              onMouseOver={() => {
                setHoverDay(val.day)
                setHoverMonth(val.month)
                setHoverYear(val.year)

                //     console.log('hover', val.day, val.month, val.year)
              }}
              key={i}
              onClick={() => {
                changeHandler(selectedYear, selectedMonth, val.day)
                // now close it
                if (!isDateRange) {
                  setShowDatePicker(false)
                  setFocused(false)
                }
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
