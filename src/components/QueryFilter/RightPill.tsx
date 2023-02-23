import React from 'react'
import { Text, color } from '~'
import { FakeCaret } from './FakeCaret'

export const RightPill = ({
  value,
  index,
  caretIsInBlockIndex,
  caretInBlockSubPos,
  onClick,
}) => {
  return (
    <Text
      color="text2"
      style={{
        height: 30,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        backgroundColor: color('lighttext'),
        borderRight: `1px solid ${color('border')}`,
        position: 'relative',
        cursor: 'text',
      }}
      onClick={onClick}
    >
      {caretIsInBlockIndex === index
        ? value.split('').map((letter, idx) =>
            idx === caretInBlockSubPos ? (
              <React.Fragment key={idx}>
                <span id={`letterid-${idx}`}>{letter}</span>
                <FakeCaret />
              </React.Fragment>
            ) : (
              <span id={`letterid-${idx}`} key={idx}>
                {letter}
              </span>
            )
          )
        : value}
    </Text>
  )
}
