import React, { FC } from 'react'
import { Badge, LoadingIcon, WarningIcon, CheckIcon } from '~'
import { styled } from 'inlines'

export const Status: FC<{
  running?: number
  deploying?: number
  unreachable?: number
  type: 'service' | 'machine' | 'instance'
}> = ({ running, type, deploying, unreachable }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {running ? (
        <Badge iconRight={CheckIcon} style={{ marginRight: 12 }} color="accent">
          {running} {type}
          {running > 1 ? 's' : ''} running
        </Badge>
      ) : null}
      {deploying ? (
        <Badge style={{ marginRight: 12 }} color="text" iconRight={LoadingIcon}>
          {deploying} {type}
          {deploying > 1 ? 's' : ''} deploying
        </Badge>
      ) : null}
      {unreachable ? (
        <Badge style={{ marginRight: 12 }} color="red" iconRight={WarningIcon}>
          {unreachable} {type}
          {unreachable > 1 ? 's' : ''} unreachable
        </Badge>
      ) : null}
    </styled.div>
  )
}
