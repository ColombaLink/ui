import React, { ReactNode, useState, useRef, useEffect } from 'react'
import { Color, Icon } from '~/types'
import { styled } from 'inlines'
import { Avatar, Text, renderOrCreateElement, color, ScrollArea } from '~'
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

  const groupByTimeInMilliSeconds = groupByTime * 60000

  console.log('group by time 🕐', groupByTimeInMilliSeconds)

  const dataSortedOnTypes = {}
  const sortedTypes = []

  console.log('start data -->', data)

  /// new stuff from here ///////////////////////////////////////
  // TODO: group the objects on type and if they are groupable by time..
  // lets sort the object by type and time first
  const orderBy = (arr, props, orders) =>
    [...arr].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] =
            orders && orders[i] === 'desc'
              ? [b[prop], a[prop]]
              : [a[prop], b[prop]]
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
        }
        return acc
      }, 0)
    )

  const orderedByTypeAndTime = orderBy(data, ['type', 'ts'], ['asc', 'desc'])
  console.log('X 👨🏻‍🍳🕐', orderedByTypeAndTime)

  const finalArr = []

  const checkIfThereAreSameTypeAndWithinRange = (obj, obj2) => {
    if (obj.type === obj2?.type) {
      //  console.log('same type', obj, obj2)
      if (Math.abs(obj.ts - obj2.ts) < groupByTimeInMilliSeconds) {
        // console.log('less then group time')
        // console.log(obj)
        // console.log(obj2)
        return true
      }
    }
  }

  let group = []
  for (let i = 0; i < orderedByTypeAndTime.length; i++) {
    if (
      checkIfThereAreSameTypeAndWithinRange(
        orderedByTypeAndTime[i],
        orderedByTypeAndTime[i + 1]
      )
    ) {
      console.log('ehllo', orderedByTypeAndTime[i])
      group.push(orderedByTypeAndTime[i])
    } else if (
      checkIfThereAreSameTypeAndWithinRange(
        orderedByTypeAndTime[i],
        orderedByTypeAndTime[i - 1]
      )
    ) {
      group.push(orderedByTypeAndTime[i])
      console.log('smurp', orderedByTypeAndTime[i])
    } else if (group.length > 0) {
      finalArr.push(group)
      group = []
    } else {
      group.push(orderedByTypeAndTime[i])
      finalArr.push(group)
      group = []
    }
  }

  console.log('BRAND NEW ARR', finalArr)

  /// till here ///////////////////////////////////////
  // ////////////////////////////////////////////////////////////

  //   for (let i = 0; i < data.length; i++) {
  //     if (!sortedTypes.includes(data[i].type)) {
  //       sortedTypes.push(data[i].type)
  //     }
  //   }

  //   for (let i = 0; i < sortedTypes.length; i++) {
  //     dataSortedOnTypes[sortedTypes[i]] = []
  //   }

  //   for (let i = 0; i < data.length; i++) {
  //     if (sortedTypes.includes(data[i].type)) {
  //       const key = data[i].type.toString()
  //       //  messageData[key].push(data[i].msg)
  //       dataSortedOnTypes[key].push({ ...data[i] })
  //     }
  //   }

  //   console.log('sorted Types -->', sortedTypes)
  //   console.log('dataSorted on types -->', dataSortedOnTypes)

  // sort the arrays
  //   sortedTypes.map((item, idx) =>
  //     dataSortedOnTypes[item].sort(function (a, b) {
  //       return b.ts - a.ts
  //     })
  //   )

  //   for (let i = 0; i < sortedTypes.length; i++) {
  //     dataSortedOnTypes[sortedTypes[i]][0].subObjects = []
  //     // console.log('hello>')
  //     for (let j = 0; j < dataSortedOnTypes[sortedTypes[i]].length; j++) {
  //       if (j === 0) {
  //         // console.log('fire??')
  //       } else if (j > 0) {
  //         //   console.log('nanin', dataSortedOnTypes[sortedTypes[i]][j])
  //         dataSortedOnTypes[sortedTypes[i]][0].subObjects.push(
  //           dataSortedOnTypes[sortedTypes[i]][j]
  //         )
  //       }
  //     }
  //   }

  //   console.log('👔', dataSortedOnTypes)

  // if type is the same && binnen groupByTime --> merge het object , en doe de messages in een array

  //   console.log(data, 'flap')
  // wrap the logs here
  return (
    <styled.div style={{ width: '100%' }}>
      {finalArr.map((item, idx) => {
        // item = item[0]

        console.log(item, '???')

        return (
          <GroupedLogs
            key={idx}
            icon={item[0]?.icon}
            color={item[0]?.color}
            ts={item[0].ts}
            msg={item[0].msg}
            type={item[0].type}
            status={item[0]?.status}
            subType={item[0]?.subType}
            subItems={item}
          />
        )
      })}
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
  subItems,
}) => {
  const [expanded, setExpanded] = useState(false)

  // Scroll logic
  const [isAtBottom, setIsAtBottom] = useState(true)

  const ref = useRef<HTMLDivElement>()

  const scrollHandler = (e: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
    const newIsAtBottom = scrollTop + clientHeight >= scrollHeight
    setIsAtBottom(newIsAtBottom)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', scrollHandler)
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [ref])

  //   useEffect(() => {
  //     if (isAtBottom && ref.current) {
  //       ref.current.scrollTop = ref.current?.scrollHeight
  //     }
  //   }, [ref, subObjects.length])

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
              backgroundColor: '#eeeffd7d',
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
          {expanded && (
            <styled.div
              ref={ref}
              style={{
                // flexGrow: 1,
                // minWidth: 'auto',
                maxWidth: '100%',
                '&::-webkit-scrollbar': {
                  backgroundColor: 'rgba(0,0,0,0)',
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: color('background'),
                  borderRadius: '12px',
                },
              }}
            >
              <SingleLog msg={msg} style={{ marginTop: 16 }} />

              {subItems.map((item, idx) =>
                idx !== 0 ? (
                  <SingleLog msg={item.msg} key={idx} ts={item.ts} />
                ) : null
              )}
            </styled.div>
          )}
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
          <Text style={{ marginLeft: 8 }}>{type}</Text>
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

const SingleLog = ({ msg, style, ts }) => {
  return (
    <styled.div
      style={{
        background: color('background'),
        marginBottom: 16,

        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {ts && (
        <styled.div style={{ display: 'flex' }}>
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
        </styled.div>
      )}

      <pre
        style={{
          //  color: color(isError ? 'red' : 'text'),
          boxSizing: 'inherit',
          display: 'inherit',
          userSelect: 'text',
          padding: 0,
          margin: 0,
          //   maxWidth: '100%',
          //   width: '100%',
          border: undefined,
          lineHeight: '18px',
          fontSize: 14,
          fontFamily: 'Fira Code',
          wordBreak: 'keep-all',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
          position: 'relative',
        }}
        dangerouslySetInnerHTML={{ __html: msg }}
      >
        {/* {JSON.stringify(msg, null, 2)} */}
      </pre>
    </styled.div>
  )
}
