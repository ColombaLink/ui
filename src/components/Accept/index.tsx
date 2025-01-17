import { FC } from 'react'
import { CheckIcon, Button, CloseIcon, Row } from '~'
import { Style } from 'inlines';

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
          return onCancel(value)
        }}
        ghost
        style={{ marginLeft: 16 }}
        icon={<CloseIcon />}
      />
      <Button
        color="accent"
        onClick={async () => {
          return onAccept(value)
        }}
        ghost
        style={{ marginLeft: 4 }}
        icon={<CheckIcon />}
      />
    </Row>
  )
}
