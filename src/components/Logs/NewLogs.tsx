import React, { ReactNode } from 'react'
import { Color, Icon } from '~/types'
import { styled } from 'inlines'

type NewLogsProps = {
  status?: string
  type?: string
  ts?: number
  subType?: string | ReactNode
  color?: Color
  icon?: Icon
  groupByTime?: number
}

// groupby -> groupbytime, type, status,

export const NewLogs = ({
  status,
  type,
  ts,
  subType,
  color,
  icon,
  groupByTime,
}: NewLogsProps) => {
  return <styled.div>flip</styled.div>
}

const LogsWrapper = () => {
  return <styled.div>wrapper</styled.div>
}

const GroupedLogs = () => {
  return <styled.div>groupie</styled.div>
}

const SingleLog = () => {
  return <styled.div>single logje.</styled.div>
}
