import React, { useEffect, useState } from 'react'
import { styled, Style, ChevronDownIcon, ChevronUpIcon, Text, color } from '~'
import { Calendar } from './Calendar'

type PickerProps = {
  valueAsString: string
  setValueAsString: (e) => string
}

const StyledDatePickerBox = styled('div', {
  background: color('background'),
  borderBottomLeftRadius: 4,
  borderBottomRightRadius: 4,
  width: 280,
  height: 396,
})

const StyledChevronHolders = styled('div', {
  borderRadius: 4,
  height: 24,
  width: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (hover: hover)': {
    '&:hover': { background: color('border'), cursor: 'pointer' },
  },
})

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

export const Picker = ({ valueAsString, setValueAsString }: PickerProps) => {
  const [selectedDay, setSelectedDay] = useState(valueAsString?.split('/')[0])
  const [selectedMonth, setSelectedMonth] = useState(
    valueAsString?.split('/')[1]
  )
  const [selectedYear, setSelectedYear] = useState(valueAsString?.split('/')[2])

  const dateObj = new Date()

  // So if year, day or month changes set the new Value 🔥
  useEffect(() => {
    setValueAsString(`${selectedDay}/${selectedMonth}/${selectedYear}`)
  }, [selectedDay, selectedMonth, selectedYear])

  //   const changeHandler = (year, month, day) => {
  //     if (day < 10) {
  //       day = `0${day}`
  //       setSelectedDay(day)
  //     } else {
  //       setSelectedDay(day)
  //     }
  //     if (month < 10) {
  //       month = `0${month}`
  //       setSelectedMonth(month)
  //     } else {
  //       setSelectedMonth(month)
  //     }
  //     setSelectedYear(year)

  //     setValueAsString(`${day}/${month}/${year}`)
  //   }

  // Days forward or backward
  const DayChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      setSelectedDay(
        +selectedDay + 1 < 10
          ? '0' + (+selectedDay + 1).toString()
          : (+selectedDay + 1).toString()
      )
    }
    if (str === 'backward') {
      setSelectedDay(
        +selectedDay - 1 < 10
          ? '0' + (+selectedDay - 1).toString()
          : (+selectedDay - 1).toString()
      )
    }
  }

  // Months forward or backward
  const MonthChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (selectedMonth === `12` || +selectedMonth === 12) {
        setSelectedMonth('01')
        setSelectedYear((+selectedYear + 1).toString())
      } else {
        setSelectedMonth(
          +selectedMonth < 9
            ? '0' + (+selectedMonth + 1).toString()
            : (+selectedMonth + 1).toString()
        )
      }
    }
    if (str === 'backward') {
      if (selectedMonth === `01` || +selectedMonth === 1) {
        setSelectedMonth('12')
        setSelectedYear((+selectedYear - 1).toString())
      } else {
        setSelectedMonth(
          +selectedMonth < 11
            ? '0' + (+selectedMonth - 1).toString()
            : (+selectedMonth - 1).toString()
        )
      }
    }
  }

  return (
    <StyledDatePickerBox>
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
        }}
      >
        <Text weight={400}>
          {months[+selectedMonth]} {selectedYear}
        </Text>
        <styled.div style={{ display: 'flex' }}>
          <StyledChevronHolders
            onClick={() => MonthChanger('backward')}
            style={{ marginRight: 16 }}
          >
            <ChevronUpIcon />
          </StyledChevronHolders>
          <StyledChevronHolders onClick={() => MonthChanger('forward')}>
            <ChevronDownIcon />
          </StyledChevronHolders>
        </styled.div>
      </styled.div>
      {/* Calendar */}
      <Calendar
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
      {/* More Button options */}
      <styled.div
        style={{
          padding: '12px 16px',
          '@media (hover: hover)': {
            '& div': {
              '&:hover': { cursor: 'pointer' },
            },
          },
        }}
      >
        <Text
          weight={400}
          onClick={() => {
            setSelectedYear(dateObj.getFullYear().toString())
            setSelectedMonth(
              dateObj.getMonth() < 10
                ? `0${dateObj.getMonth() + 1}`
                : `${dateObj.getMonth() + 1}`
            )
            setSelectedDay(
              dateObj.getDate() < 10
                ? `0${dateObj.getDate()}`
                : `${dateObj.getDate()}`
            )
          }}
          space="4px"
        >
          Today
        </Text>
        <Text weight={400} space="4px" onClick={() => DayChanger('forward')}>
          Select next date
        </Text>
        <Text weight={400} space="4px" onClick={() => DayChanger('backward')}>
          Select previous date
        </Text>
      </styled.div>
      <styled.div style={{ borderBottom: `1px solid ${color('border')}` }} />
      <Text
        style={{ padding: '8px 16px', cursor: 'pointer' }}
        weight={400}
        onClick={() => setValueAsString('dd/mm/yyyy')}
      >
        Clear
      </Text>
    </StyledDatePickerBox>
  )
}
