import React, { useEffect, useState } from 'react'
import { styled, Style, ChevronDownIcon, ChevronUpIcon, Text, color } from '~'

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

  const MonthChanger = (str: 'forward' | 'backward') => {
    if (str === 'forward') {
      if (selectedMonth === `12` || +selectedMonth === 12) {
        setSelectedMonth('01')
        setSelectedYear((+selectedYear + 1).toString())
        setValueAsString(`${selectedDay}/01/${+selectedYear + 1}`)
      } else {
        setSelectedMonth(
          +selectedMonth < 9
            ? '0' + (+selectedMonth + 1).toString()
            : (+selectedMonth + 1).toString()
        )
      }
    }
  }

  useEffect(() => {
    setValueAsString(`${selectedDay}/${selectedMonth}/${selectedYear}`)
  }, [selectedDay, selectedMonth, selectedYear])

  //   const oneMonthForward = () => {
  //     if (+selectedMonth === 12) {
  //       changeHandler(selectedYear + 1, 1, selectedDay)
  //     } else {
  //       changeHandler(selectedYear, +selectedMonth + 1, selectedDay)
  //     }
  //   }

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
          {months[+valueAsString?.split('/')[1]]} {valueAsString?.split('/')[2]}
        </Text>
        <styled.div style={{ display: 'flex' }}>
          <StyledChevronHolders
            //  onClick={oneMonthBack}
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

      {/* More Button options */}
    </StyledDatePickerBox>
  )
}
