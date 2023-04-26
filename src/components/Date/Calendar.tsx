import React from 'react'
import { styled } from '~'

export const Calendar = () => {
  return (
    <>
      <styled.div
        style={{
          display: 'flex',
          gap: 24,
          textAlign: 'center',
          color: 'grey',
          padding: '0px 20px',
          justifyContent: 'center',
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
                margin: 4,
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
                  selectedMonth === currentMonth + 1 &&
                  selectedYear === currentYear
                    ? `1px solid ${color('accent')}`
                    : '',
                background:
                  val.day === selectedDay ||
                  isFromDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day) ||
                  isHoveredDay(val.year, val.month, val.day)
                    ? color('accent')
                    : isRangedDay(val.year, val.month, val.day) ||
                      isRangedHoverDay(val.year, val.month, val.day)
                    ? color('lightaccent')
                    : '',
                color:
                  val.day === selectedDay ||
                  isFromDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day) ||
                  isHoveredDay(val.year, val.month, val.day)
                    ? color('background')
                    : color('text'),
                borderRadius:
                  isHoveredDay(val.year, val.month, val.day) &&
                  isRangedSmallerHoverDay(val.year, val.month, val.day)
                    ? '0px 4px 4px 0px'
                    : isFromDay(val.year, val.month, val.day) &&
                      !isRangedSmallerHoverDay(val.year, val.month, val.day)
                    ? '4px 0px 0px 4px'
                    : isTillDay(val.year, val.month, val.day)
                    ? '0px 4px 4px 0px'
                    : isRangedDay(val.year, val.month, val.day) ||
                      isRangedHoverDay(val.year, val.month, val.day)
                    ? 0
                    : 4,

                width:
                  isFromDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day)
                    ? 32
                    : isRangedDay(val.year, val.month, val.day) ||
                      isRangedHoverDay(val.year, val.month, val.day)
                    ? 34
                    : 26,
                height: 26,
                margin: 4,
                marginLeft:
                  isRangedDay(val.year, val.month, val.day) ||
                  isRangedHoverDay(val.year, val.month, val.day) ||
                  isTillDay(val.year, val.month, val.day)
                    ? 0
                    : isFromDay(val.year, val.month, val.day)
                    ? 2
                    : 4,
                marginRight:
                  isRangedDay(val.year, val.month, val.day) ||
                  isRangedHoverDay(val.year, val.month, val.day) ||
                  isFromDay(val.year, val.month, val.day)
                    ? 0
                    : isTillDay(val.year, val.month, val.day)
                    ? 1
                    : 4,

                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                '@media (hover: hover)': {
                  '&:hover': {
                    background:
                      val.day === selectedDay
                        ? color('accent')
                        : !isDateRange && color('border'),
                    cursor: 'pointer',
                  },
                },
              }}
              onMouseOver={() => {
                if (isDateRange) {
                  setHoverDay(val.day)
                  setHoverMonth(val.month)
                  setHoverYear(val.year)
                }
              }}
              onMouseLeave={() => {
                if (isDateRange) {
                  setHoverDay(null)
                  setHoverMonth(null)
                  setHoverYear(null)
                }
              }}
              key={i}
              onClick={() => {
                changeHandler(selectedYear, selectedMonth, val.day)
                // now close it
                if (!isDateRange) {
                  setShowDatePicker(false)
                  setFocused(false)
                }
                if (focusOnBeginDate) {
                  setFocusOnBeginDate(false)
                  setShowDatePicker(false)
                  setFocusOnEndDate(true)
                } else if (focusOnEndDate) {
                  setShowDatePicker(false)
                  setFocused(false)
                  setFocusOnEndDate(false)
                }
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
