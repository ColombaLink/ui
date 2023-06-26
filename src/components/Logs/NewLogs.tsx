import React, { ReactNode } from 'react'
import { Color, Icon } from '~/types'
import { styled } from 'inlines'
import { Avatar, Text, renderOrCreateElement, color } from '~'
import dayjs from 'dayjs'

type NewLogsObject = {
  status?: string
  type?: string
  ts?: number
  msg?: string
  subType?: string | ReactNode
  color?: Color
  icon?: Icon
  groupByTime?: number
}[]

type NewLogsProps = {
  data?: NewLogsObject
}

// groupby -> groupbytime, type, status,

export const NewLogs = ({ data }: NewLogsProps) => {
  const { status, type, ts, subType, color, icon, groupByTime, msg } = data

  console.log(data, 'flap')
  // wrap the logs here
  return (
    <styled.div style={{ width: '100%' }}>
      {data.map((item, idx) => (
        <GroupedLogs
          key={idx}
          icon={item.icon}
          color={item.color}
          ts={item.ts}
          msg={item.msg}
          type={item.type}
        />
      ))}
    </styled.div>
  )
}

const GroupedLogs = ({ icon, color: colorProp, ts, msg, type }) => {
  return (
    <styled.div style={{ display: 'flex', marginBottom: 12 }}>
      <styled.div style={{ marginRight: 12, marginTop: 16 }}>
        {renderOrCreateElement(Avatar, {
          color: colorProp,
          icon: icon,
        })}
      </styled.div>

      <styled.div
        style={{
          backgroundColor: '#eeeffd3b',
          borderRadius: 8,
          padding: '12px 20px',
          width: '100%',
        }}
      >
        <GroupedLogsHeader ts={ts} color={color} type={type} />
        {/* map throug single logs that belong togehter */}
        <SingleLog msg={msg} />
      </styled.div>
    </styled.div>
  )
}

const GroupedLogsHeader = ({ ts, color, type }) => {
  return (
    <styled.div>
      <styled.div style={{ display: 'flex', marginBottom: 4 }}>
        <styled.div
          style={{
            display: 'flex',
            // backgroundColor: color('tran'),
            padding: '4px 8px',
            width: 'fit-content',
            borderRadius: 12,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            border: `1px solid ${color('border')}`,
          }}
        >
          <Text
            color="accent"
            typography="caption500"
            style={{ marginRight: 8 }}
          >
            {dayjs(ts).format('HH:mm:ss')}
          </Text>
          <Text color="accent" typography="caption400">
            {dayjs(ts).format('DD/MM/YYYY')}
          </Text>
        </styled.div>
        <styled.div
          style={{
            backgroundColor: color('lightaccent'),
            padding: '4px 8px',
            width: 'fit-content',
            borderRadius: 12,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            border: `1px solid ${color('border')}`,
            marginLeft: '-1px',
          }}
        >
          <Text color="accent" typography="caption500">
            {type}
          </Text>
        </styled.div>
      </styled.div>

      <Text style={{ marginBottom: 4, marginLeft: 8 }} typography="subtext600">
        First Sentence of newest message
      </Text>
      <styled.div style={{ marginBottom: 8, marginLeft: 8 }}>
        <Text color="text2">Activity person</Text>
      </styled.div>
    </styled.div>
  )
}

const SingleLog = ({ msg }) => {
  return (
    <styled.div
      style={{
        background: color('background2'),
        marginLeft: 8,
        padding: '4px 8px',
      }}
    >
      <pre
        style={{
          //  color: color(isError ? 'red' : 'text'),
          userSelect: 'text',
          padding: 0,
          margin: 0,
          maxWidth: '100%',
          marginLeft: 6,
          width: '100%',
          border: undefined,
          lineHeight: '18px',
          fontSize: 14,
          fontFamily: 'Fira Code',
          wordBreak: 'break-all',
          whiteSpace: 'break-spaces',
        }}
        dangerouslySetInnerHTML={{ __html: msg }}
      ></pre>
    </styled.div>
  )
}
