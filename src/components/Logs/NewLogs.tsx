import React, { ReactNode } from 'react'
import { Color, Icon } from '~/types'
import { styled } from 'inlines'
import { Avatar, Text } from '~'
import dayjs from 'dayjs'

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
  // wrap the logs here
  return (
    <styled.div>
      <GroupedLogs icon={icon} color={color} ts={ts} />
    </styled.div>
  )
}

const GroupedLogs = ({ icon, color, ts }) => {
  return (
    <styled.div style={{ display: 'flex' }}>
      <styled.div style={{ marginRight: 12 }}>
        <Avatar icon={icon} color={color} />
      </styled.div>

      <styled.div>
        <GroupedLogsHeader ts={ts} color={color} />
        {/* map throug single logs that belong togehter */}
        <Text>Single logs here</Text>
      </styled.div>
    </styled.div>
  )
}

const GroupedLogsHeader = ({ ts, color }) => {
  return (
    <styled.div>
      <Text color={color} typography="caption400">
        {dayjs(ts).format('DD/MM/YYYY')}
      </Text>
      <Text color={color} typography="caption600">
        {dayjs(ts).format('HH:mm:ss')}
      </Text>
    </styled.div>
  )
}

const SingleLog = () => {
  return <styled.div>single logje.</styled.div>
}
