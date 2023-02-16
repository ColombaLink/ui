import React from 'react'
import { color, Text } from '~'
import { FakeCarret } from './FakeCarret'

type LeftPillProps = {
  idx: number
  onClick: (e) => void
  inputValue: string
  carretPosition: number
  carretInBlockSubPos: number
  carretIsInBlockIndex: number
  arithmeticProgression: (start: number, end: number) => number[]
  text: string
  apLimit: number
}

export const LeftPill = ({
  idx,
  onClick,
  inputValue,
  carretPosition,
  carretInBlockSubPos,
  carretIsInBlockIndex,
  arithmeticProgression,
  text,
  apLimit,
}: LeftPillProps) => {
  const arithmeticIndexCheck = arithmeticProgression(4, apLimit)
    .map((v) => v - 1)
    .includes(idx)

  return (
    <Text
      wrap
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
      onClick={onClick}
    >
      {carretPosition === 0 && inputValue.length === 0 ? <FakeCarret /> : null}
      {idx === 0
        ? text?.split('')?.map((letter, index) =>
            index === carretInBlockSubPos - 1 ? (
              <div style={{ display: 'flex' }} key={index}>
                <span id={index.toString()} key={index}>
                  {letter.toUpperCase()}
                </span>
                {carretIsInBlockIndex === 0 && <FakeCarret />}
              </div>
            ) : (
              <span id={index.toString()} key={index}>
                {letter.toUpperCase()}
              </span>
            )
          )
        : null}

      {arithmeticIndexCheck ? (
        !text ? (
          <FakeCarret />
        ) : (
          text?.split('')?.map((letter, index) =>
            index === carretInBlockSubPos - 1 ? (
              <div style={{ display: 'flex' }} key={index}>
                {carretInBlockSubPos === 0 && carretIsInBlockIndex === idx && (
                  <FakeCarret />
                )}
                {carretInBlockSubPos === 0 && <FakeCarret />}
                <span id={index.toString()} key={index}>
                  {letter}
                </span>

                {carretIsInBlockIndex === idx && arithmeticIndexCheck ? (
                  <FakeCarret />
                ) : null}
              </div>
            ) : (
              <React.Fragment key={index}>
                {carretInBlockSubPos === 0 &&
                  carretIsInBlockIndex === idx &&
                  index === 0 && <FakeCarret />}
                <span id={index.toString()} key={index}>
                  {letter}
                </span>
              </React.Fragment>
            )
          )
        )
      ) : null}
    </Text>
  )
}
