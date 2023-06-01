import React, { useEffect, useState } from 'react'
import {
  styled,
  ChevronDownIcon,
  ChevronUpIcon,
  Text,
  color,
  removeAllOverlays,
  useContextState,
} from '~'
import { Calendar } from './Calendar'

type PickerProps = {
  // valueAsString: string
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

const MscToString = (value: number): string => {
  const newDate = new Date(value)
  const year = newDate.getFullYear()
  const month =
    newDate.getMonth() + 1 < 10
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1
  const day =
    newDate.getDate() + 1 < 10 ? '0' + newDate.getDate() : newDate.getDate()

  return `${day}/${month}/${year}`
}

const stringToMilliseconds = (str: string): number => {
  const dateString = `${str?.split('/').reverse().join('-')}T00:00`
  const outputMs = new Date(dateString).getTime()
  console.log('output in ms 🎉', outputMs)
  return outputMs
}

export const Picker = ({ setValue }) => {
  const dateObj = new Date()

  const [millisecondsValue] = useContextState('val')
  const [stringValue] = useContextState('stringVal')

  console.log('From picker ⛏', millisecondsValue)
  console.log('From picker ,', stringValue)

  const [valueAsString, setValueAsString] = useState(
    millisecondsValue ? MscToString(millisecondsValue as number) : ''
  )

  const [selectedDay, setSelectedDay] = useState(valueAsString?.split('/')[0])
  const [selectedMonth, setSelectedMonth] = useState(
    valueAsString?.split('/')[1]
  )
  const [selectedYear, setSelectedYear] = useState(valueAsString?.split('/')[2])

  console.log('--> from Picker 🥷🏻', valueAsString)

  if (!valueAsString) {
    setValueAsString(
      `${
        dateObj.getDate() < 10
          ? `0${dateObj.getDate()}`
          : `${dateObj.getDate()}`
      }/${
        dateObj.getMonth() < 10
          ? `0${dateObj.getMonth() + 1}`
          : `${dateObj.getMonth() + 1}`
      }/${dateObj.getFullYear().toString()}`
    )
  }

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // So if year, day or month changes set the new Value 🔥
  useEffect(() => {
    setValueAsString(`${selectedDay}/${selectedMonth}/${selectedYear}`)
    // zet het naar milliseconde
    setValue(
      stringToMilliseconds(`${selectedDay}/${selectedMonth}/${selectedYear}`)
    )
  }, [selectedDay, selectedMonth, selectedYear, valueAsString])

  // Days forward or backward
  const DayChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (+selectedDay === daysInMonth(+selectedMonth, +selectedYear)) {
        if (+selectedMonth === 12) {
          setSelectedDay('01')
          setSelectedMonth('01')
          setSelectedYear((+selectedYear + 1).toString())
        } else {
          MonthChanger('forward')
          setSelectedDay('01')
        }
      } else
        setSelectedDay(
          +selectedDay + 1 < 10
            ? '0' + (+selectedDay + 1).toString()
            : (+selectedDay + 1).toString()
        )
    }
    if (str === 'backward') {
      if (selectedDay === '01' || +selectedDay === 1) {
        if (selectedMonth === '01' || +selectedMonth === 1) {
          setSelectedDay(daysInMonth(12, +selectedYear - 1).toString())
          setSelectedMonth('12')
          setSelectedYear((+selectedYear - 1).toString())
        } else {
          MonthChanger('backward')
          setSelectedDay(
            daysInMonth(+selectedMonth - 1, selectedYear).toString()
          )
        }
      } else {
        setSelectedDay(
          +selectedDay - 1 < 10
            ? '0' + (+selectedDay - 1).toString()
            : (+selectedDay - 1).toString()
        )
      }
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
          {(months[+valueAsString?.split('/')[1]] || '') +
            ' ' +
            (valueAsString?.split('/')[2] || '')}
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
        onClick={() => {
          setValueAsString('')
          removeAllOverlays()
        }}
      >
        Clear
      </Text>
    </StyledDatePickerBox>
  )
}
