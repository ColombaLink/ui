import { prettyNumber } from '@based/pretty-number'
import React, { FC, CSSProperties, ReactNode, useState } from 'react'
import { styled, ScrollArea, Text, Row, border, color } from '~'

type Row = {
  country: string
  count: number
  votes: [
    {
      participant: string
      count: number
    }
  ]
}

// TODO: make generic (label, value)
type ResultTableProps = {
  label?: string
  style?: CSSProperties
  total?: number
  data?: Row[]
}

const ResultRow: FC<{
  data: Row
  index: number
}> = ({ data, index }) => {
  const [expand, setExpand] = useState(false)
  const rows: ReactNode[] = []

  if (expand) {
    for (let i = 0; i < data.votes.length; i++) {
      const vote = data.votes[i]
      rows.push(
        <Row
          style={{
            width: 125,
            padding: 16,
            '&:hover': {
              backgroundColor: color('accent', true),
            },
          }}
        >
          <Text typography={'body600'}>{vote.participant}</Text>
          <Text style={{ marginLeft: 16 }} color="accent" typography="body600">
            {prettyNumber(vote.count ?? 0, 'number-short')}
          </Text>
        </Row>
      )
    }

    rows.push(
      <Row
        style={{
          height: 1,
          width: 125,
        }}
      />,
      <Row
        style={{
          height: 1,
          width: 125,
        }}
      />,
      <Row
        style={{
          height: 1,
          width: 125,
        }}
      />,
      <Row
        style={{
          height: 1,
          width: 125,
        }}
      />,
      <Row
        style={{
          height: 1,
          width: 125,
        }}
      />
    )
  }

  return (
    <>
      <Row
        onClick={() => setExpand(!expand)}
        style={{
          flexGrow: expand ? 1 : 0,
          width: 125,
          padding: 16,

          backgroundColor: expand ? color('accent', true) : null,
          '&:hover': {
            backgroundColor: color('accent', true),
          },
        }}
      >
        <Text typography={'body600'}>{data.country}</Text>
        <Text style={{ marginLeft: 16 }} color="accent" typography="body600">
          {expand ? data.count : prettyNumber(data.count ?? 0, 'number-short')}
        </Text>
      </Row>

      {expand ? (
        <Row
          style={{
            backgroundColor: expand ? color('background2') : null,

            // backgroundColor: expand ? color('background2') : null,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {rows}
        </Row>
      ) : null}
    </>
  )
}

export const ResultTable: FC<ResultTableProps> = ({
  data = [],
  label,
  total,
}) => {
  const rows: ReactNode[] = []

  for (let i = 0; i < data.length; i++) {
    rows.push(<ResultRow index={i} data={data[i]} key={i} />)
  }

  return (
    <styled.div
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <Row
        style={{
          borderBottom: border(1, 'border'),
          // paddingRight: 32,
          // paddingLeft: 32,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <Text>{label}</Text>

        <Text style={{ marginLeft: 16 }} color="accent" typography="body600">
          {total}
        </Text>
      </Row>
      <styled.div
        style={{
          height: '100%',
          flexGrow: 1,
          display: 'flex',
          // flexDirection: 'column',
          minWidth: null,
          // gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {rows}
      </styled.div>
    </styled.div>
  )
}
