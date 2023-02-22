import React from 'react'
import { Text, color } from '~'
import { FakeCaret } from './FakeCaret'

export const LeftPill = ({
  value,
  index,
  caretIsInBlockIndex,
  caretInBlockSubPos,
}) => {
  return (
    <Text
      color="text2"
      style={{
        height: 30,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: color('lighttext'),
        borderRight: `1px solid ${color('border')}`,
        position: 'relative',
        cursor: 'text',
      }}
    >
      {caretIsInBlockIndex === index
        ? value.split('').map((letter, idx) =>
            idx === caretInBlockSubPos ? (
              <React.Fragment key={idx}>
                <span>{letter}</span>
                <FakeCaret />
              </React.Fragment>
            ) : (
              <span key={idx}>{letter}</span>
            )
          )
        : value}
    </Text>
  )
}
