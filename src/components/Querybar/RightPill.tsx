import React from 'react'
import { color, Text, ArrowRightIcon, LinkIcon } from '~'
import { FakeCarret } from './FakeCarret'

type RightPillProps = {
  idx: number
  onClick: () => void
  carretInBlockSubPos: number
  carretIsInBlockIndex: number
  arithmeticProgression: (start: number, end: number) => number[]
  text: string
  apLimit: number
}

export const RightPill = ({
  idx,
  onClick,
  carretInBlockSubPos,
  carretIsInBlockIndex,
  arithmeticProgression,
  text,
  apLimit,
}: RightPillProps) => {
  return (
    <>
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 30,
          padding: 10,
          backgroundColor: color('lighttext'),
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          cursor: 'text',
        }}
        onClick={onClick}
      >
        {idx === 2 && (
          <LinkIcon size={16} color="accent" style={{ marginRight: 8 }} />
        )}

        {!text ? (
          <FakeCarret />
        ) : (
          text?.split('')?.map((letter, index) =>
            index === carretInBlockSubPos - 1 ? (
              <div style={{ display: 'flex' }} key={index}>
                <span id={index} key={index}>
                  {letter}
                </span>
                {carretIsInBlockIndex === idx &&
                arithmeticProgression(4, apLimit)
                  .map((v) => v + 1)
                  .includes(idx) ? (
                  <FakeCarret />
                ) : null}
              </div>
            ) : (
              <>
                {carretInBlockSubPos === 0 &&
                  carretIsInBlockIndex === idx &&
                  index === 0 && <FakeCarret />}
                <span id={index} key={index}>
                  {letter}
                </span>
              </>
            )
          )
        )}
      </Text>
      {idx === 2 && <ArrowRightIcon size={16} style={{ margin: 'auto 8px' }} />}
    </>
  )
}
