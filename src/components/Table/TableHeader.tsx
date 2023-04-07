import React, { ReactNode, FC } from 'react'
import { styled, Style, Text } from '~'

type TableHeaderProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
}

const TableHeaderItem = styled('div', {
  height: 36,
  display: 'flex',
  alignItems: 'center',
  // default width for now
  width: 124,
  overflow: 'hidden',
})

export const TableHeader: FC<TableHeaderProps> = ({ headers }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        borderBottom: '1px solid rgba(28, 45, 65, 0.1)',
      }}
    >
      {headers?.map((item, idx) => (
        <TableHeaderItem key={item.key}>
          <Text color="text2">{item.label}</Text>
        </TableHeaderItem>
      ))}
    </styled.div>
  )
}
