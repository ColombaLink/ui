import React, { FC } from 'react'
import { Badge, LoadingIcon, WarningIcon, CheckIcon, Row, Color } from '~'

export const Status: FC<{
  running?: number
  deploying?: number
  unreachable?: number
  goodColor?: Color
  count?: number
  type: 'service' | 'machine' | 'instance'
}> = ({
  running,
  type,
  deploying,
  unreachable,
  goodColor = 'green',
  count,
}) => {
  const noProblems = !unreachable

  return (
    <Row>
      {count !== undefined ? (
        <Badge
          style={{ marginRight: 12 }}
          color="accent"
          // color={noProblems ? goodColor : null}
        >
          {count} {type}
          {count !== 1 ? 's' : ''}
        </Badge>
      ) : null}
      {running ? (
        <Badge
          iconRight={noProblems ? CheckIcon : null}
          style={{ marginRight: 12 }}
          color={noProblems ? goodColor : null}
        >
          {running} {type}
          {running > 1 ? 's' : ''} running
        </Badge>
      ) : null}
      {deploying ? (
        <Badge style={{ marginRight: 12 }} color="text" icon={LoadingIcon}>
          {deploying} {type}
          {deploying > 1 ? 's' : ''} deploying
        </Badge>
      ) : null}
      {unreachable ? (
        <Badge style={{ marginRight: 12 }} color="red" icon={WarningIcon}>
          {unreachable} {type}
          {unreachable > 1 ? 's' : ''} unreachable
        </Badge>
      ) : null}
    </Row>
  )
}