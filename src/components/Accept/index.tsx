import React, { FC } from 'react'
import { CheckIcon, Button, CloseIcon, Row, Style } from '~'

export const Accept = <T,>({
  onAccept,
  onCancel,
  value,
  style,
}: {
  style?: Style
  value?: T
  onAccept: ((value: T) => void) | ((value: T) => Promise<void>)
  onCancel: (value: T) => void
}): ReturnType<FC> => {
  return (
    <Row style={style}>
      <Button
        onClick={() => {
          onCancel(value)
        }}
        ghost
        style={{ marginLeft: 16 }}
        icon={<CloseIcon />}
      />
      <Button
        color="accent"
        onClick={async () => {
          onAccept(value)
        }}
        ghost
        style={{ marginLeft: 4 }}
        icon={<CheckIcon />}
      />
    </Row>
  )
}
