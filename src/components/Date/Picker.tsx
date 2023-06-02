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
  setValue: (e) => string
  timeString?: string
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
    newDate.getMonth() < 9
      ? '0' + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1
  const day =
    newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()

  return `${day}/${month}/${year}`
}

const stringToMilliseconds = (str: string, time?: string): number => {
  const dateString = `${str?.split('/').reverse().join('-')}T${time || '00:00'}`
  console.log('date string', dateString)
  const outputMs = new Date(dateString).getTime()
  return outputMs
}

export const Picker = ({ setValue, timeString }: PickerProps) => {
  const dateObj = new Date()

  const [millisecondsValue] = useContextState('val')

  useEffect(() => {
    const newMillSecVal = MscToString(millisecondsValue as number)
    setSelectedDay(newMillSecVal.split('/')[0])
    setSelectedMonth(newMillSecVal.split('/')[1])
    setSelectedYear(newMillSecVal.split('/')[2])
  }, [millisecondsValue])

  const [valueAsString, setValueAsString] = useState(
    millisecondsValue ? MscToString(millisecondsValue as number) : ''
  )

  const [selectedDay, setSelectedDay] = useState(valueAsString?.split('/')[0])
  const [selectedMonth, setSelectedMonth] = useState(
    valueAsString?.split('/')[1]
  )
  const [selectedYear, setSelectedYear] = useState(valueAsString?.split('/')[2])

  // if (!valueAsString) {
  //   setValueAsString(
  //     `${
  //       dateObj.getDate() < 10
  //         ? `0${dateObj.getDate()}`
  //         : `${dateObj.getDate()}`
  //     }/${
  //       dateObj.getMonth() < 10
  //         ? `0${dateObj.getMonth() + 1}`
  //         : `${dateObj.getMonth() + 1}`
  //     }/${dateObj.getFullYear().toString()}`
  //   )
  // }

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate()
  }

  // So if year, day or month changes set the new Value 🔥
  useEffect(() => {
    setValueAsString(`${selectedDay}/${selectedMonth}/${selectedYear}`)
    // zet het naar milliseconde
    setValue(
      stringToMilliseconds(
        `${selectedDay}/${selectedMonth}/${selectedYear}`,
        timeString
      )
    )
  }, [selectedDay, selectedMonth, selectedYear, valueAsString])

  // Days forward or backward
  const dayChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (+selectedDay === daysInMonth(+selectedMonth, +selectedYear)) {
        if (+selectedMonth === 12) {
          setSelectedDay('01')
          setSelectedMonth('01')
          setSelectedYear((+selectedYear + 1).toString())
        } else {
          monthChanger('forward')
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
          monthChanger('backward')
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
  const monthChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (selectedMonth === `12` || +selectedMonth === 12) {
        setSelectedMonth('01')
        setSelectedYear((+selectedYear + 1).toString())
      } else {
        setSelectedMonth(
          +selectedMonth === 9
            ? '10'
            : +selectedMonth < 9
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
            onClick={() => monthChanger('backward')}
            style={{ marginRight: 16 }}
          >
            <ChevronUpIcon />
          </StyledChevronHolders>
          <StyledChevronHolders onClick={() => monthChanger('forward')}>
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
          style={{ marginBottom: 4 }}
        >
          Today
        </Text>
        <Text
          weight={400}
          style={{ marginBottom: 4 }}
          onClick={() => dayChanger('forward')}
        >
          Select next date
        </Text>
        <Text
          weight={400}
          style={{ marginBottom: 4 }}
          onClick={() => dayChanger('backward')}
        >
          Select previous date
        </Text>
      </styled.div>
      <styled.div style={{ borderBottom: `1px solid ${color('border')}` }} />
      <Text
        style={{ padding: '8px 16px', cursor: 'pointer' }}
        weight={400}
        onClick={() => {
          setValue(0)
          removeAllOverlays()
        }}
      >
        Clear
      </Text>
    </StyledDatePickerBox>
  )
}
