import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import {
  Badge,
  Text,
  border,
  Color,
  colorNameByIndex,
  Row,
  ScrollArea,
  styled,
  color,
} from '~'

const colorById: { [id: string]: Color } = {}
let cnt = 0

export const useColorById = (id: string): Color => {
  return colorById[id] || (colorById[id] = colorNameByIndex(cnt++))
}

const DefaultHeader: FC<{ data: any }> = () => {
  return (
    <Row style={{ marginBottom: 24 }}>
      <Badge
        color="accent"
        style={{
          borderRight: border(1, 'border'),
        }}
      >
        <Row style={{ gap: 8 }}>
          <Text color="accent" typography="caption400">
            {new Date().toString()}
          </Text>
        </Row>
      </Badge>
    </Row>
  )
}

const Log: FC<{ log: any; skipHeader?: boolean; header?: FC<any> }> = ({
  log,
  skipHeader,
  header,
}) => {
  const isError = log.lvl === 'error'
  const Header: FC<{ log: any }> = header || DefaultHeader
  return (
    <styled.div
      style={{
        marginTop: skipHeader ? 0 : 24,
        paddingTop: skipHeader ? 24 : 16,
        paddingLeft: 16,
        overflowX: 'hidden',
        paddingRight: 16,
        width: '100%',
        borderTop: skipHeader ? undefined : border(1, 'border'),
      }}
    >
      {skipHeader ? null : <Header log={log} />}

      <pre
        style={{
          color: color(isError ? 'red' : 'text'),
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
        }}
      >
        {log.msg}
      </pre>
    </styled.div>
  )
}

export const Logs: FC<{
  data: {
    msg: string
  }[]
  checksum?: number
  header?: FC<any>
  skipHeaderFn?: (current: any, previous) => boolean
}> = ({ data = [], checksum, header, skipHeaderFn }) => {
  const ref = useRef<HTMLDivElement>()

  const [isAtBottom, setIsAtBottom] = useState(true)

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

  useEffect(() => {
    if (isAtBottom && ref.current) {
      ref.current.scrollTop = ref.current?.scrollHeight
    }
  }, [ref, data, checksum || data.length])

  const children: ReactNode[] = []
  for (let i = 0; i < data.length; i++) {
    const log = data[i]
    let skip = false
    if (typeof skipHeaderFn === 'function') {
      const prev = i > 0 && data[i - 1]
      skip = skipHeaderFn(log, prev)
    }
    children.push(<Log key={i} log={log} header={header} skipHeader={skip} />)
  }

  return (
    <ScrollArea
      ref={ref}
      style={{
        flexGrow: 1,
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
      <styled.div
        style={{
          maxWidth: '100%',
          minWidth: '100%',
          paddingBottom: 32,
        }}
      >
        {children}
      </styled.div>
    </ScrollArea>
  )
}
