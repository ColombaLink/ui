import React, { ReactNode } from 'react'
import { Color, Icon } from '~/types'

type NewLogsProps = {
  status?: string
  type?: string
  ts?: number
  subType?: string | ReactNode
  color?: Color
  icon?: Icon
  groupByTime?: number
}

export const NewLogs = ({
  status,
  type,
  ts,
  subType,
  color,
  icon,
  groupByTime,
}: NewLogsProps) => {
  return <div>flip</div>
}
