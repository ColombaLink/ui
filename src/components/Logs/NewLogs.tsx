import React, { ReactNode, useState } from 'react'
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
}[]

type NewLogsProps = {
  data?: NewLogsObject
  groupByTime?: number
}

const VerticalLine = styled('div', {
  height: '100%',
  width: '1px',
  backgroundColor: color('border'),
  position: 'absolute',
  left: 16,
  top: 0,
  bottom: 0,
  zIndex: 0,
})

const StatusDot = styled('div', {
  height: 6,
  width: 6,
  borderRadius: 3,
})

// groupby -> groupbytime, type, status,
// if within time and is same type... group m
// TODO: Scroll direction bottom to top, top to bottom
// TODO: counter for logs per block.

export const NewLogs = ({ data, groupByTime }: NewLogsProps) => {
  const { status, type, ts, subType, color, icon, msg } = data

  const mergedData = []

  // if type is the same && binnen groupByTime --> merge het object , en doe de messages in een array

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].type)
  }

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
          status={item.status}
          subType={item.subType}
        />
      ))}
    </styled.div>
  )
}

const GroupedLogs = ({
  icon,
  color: colorProp,
  ts,
  msg,
  type,
  status,
  subType,
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <styled.div style={{ display: 'flex', position: 'relative' }}>
      <styled.div style={{ marginRight: 12, marginTop: 16 }}>
        {renderOrCreateElement(Avatar, {
          color: colorProp,
          icon: icon,
        })}
      </styled.div>

      <div style={{ marginBottom: 20, width: '100%' }}>
        <styled.div
          style={{
            borderRadius: 8,
            padding: '12px 20px',
            width: '100%',
            '&:hover': {
              backgroundColor: '#eeeffd3b',
            },
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <GroupedLogsHeader
            ts={ts}
            color={color}
            type={type}
            status={status}
            subType={subType}
            msg={msg}
          />

          {/* map throug single logs that belong togehter // show them in a scroll area */}
          {expanded && <SingleLog msg={msg} />}
        </styled.div>
      </div>
      <VerticalLine />
    </styled.div>
  )
}

const GroupedLogsHeader = ({ ts, color, type, status, subType, msg }) => {
  return (
    <styled.div>
      <styled.div style={{ display: 'flex', marginBottom: 4 }}>
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text
            color="accent"
            typography="caption500"
            style={{ marginRight: 8 }}
          >
            {dayjs(ts).format('HH:mm:ss')}
          </Text>
          <Text
            color="accent"
            typography="caption400"
            style={{ marginRight: 8 }}
          >
            {dayjs(ts).format('DD/MM/YYYY')}
          </Text>
          <StatusDot
            style={{
              backgroundColor:
                status === 'error'
                  ? color('red')
                  : status === 'succes'
                  ? color('green')
                  : status === 'info'
                  ? color('accent')
                  : color('border'),
            }}
          />
        </styled.div>
      </styled.div>

      <Text style={{ marginBottom: 4 }} typography="subtext600">
        {msg.substring(0, 74)}
        {msg.length > 74 && '...'}
      </Text>
      <styled.div style={{ marginBottom: 8 }}>
        {typeof subType === 'string' ? (
          <Text color="text2" typography="caption500">
            {subType}
          </Text>
        ) : (
          renderOrCreateElement(subType)
        )}
      </styled.div>
    </styled.div>
  )
}

const SingleLog = ({ msg }) => {
  return (
    <styled.div
      style={{
        background: color('background'),
        // display: 'none',
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <pre
        style={{
          //  color: color(isError ? 'red' : 'text'),
          userSelect: 'text',
          padding: 0,
          margin: 0,
          maxWidth: '100%',
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
