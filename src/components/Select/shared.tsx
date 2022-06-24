import React, { CSSProperties, FC, ReactNode } from 'react'
import { Text } from '~/components/Text'
import { styled } from 'inlines'
import { color } from '~/utils'
import { Color } from '~/types'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 4,
  alignItems: 'center',
  border: `1px solid ${color('OtherDivider')}`,
  backgroundColor: color('Background1dp'),
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  '&:hover': {
    border: `1px solid ${color('OtherInputBorderHover')}`,
  },
})
export const SelectLabel: FC<{
  children: ReactNode
  onClick: any
  style?: CSSProperties
  color?: Color
  label: string
}> = ({
  children,
  onClick,
  style,
  color: colorProp = 'TextPrimary',
  label,
}) => {
  return (
    <styled.div
      onClick={onClick}
      style={{
        justifyContent: 'space-between',
        borderRadius: 4,
        border: `1px solid ${color('OtherDivider')}`,
        backgroundColor: color('Background1dp'),
        cursor: 'pointer',
        userSelect: 'none',
        height: 38,
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        '&:hover': {
          border: `1px solid ${color('OtherInputBorderHover')}`,
        },
        ...style,
      }}
    >
      <Text
        color={colorProp}
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          backgroundColor: color('ActionLight'),
          borderRight: `1px solid ${color('OtherDivider')}`,
          flexShrink: 0,
        }}
      >
        {label}
      </Text>
      <Text
        color={colorProp}
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderRight: `1px solid ${color('OtherDivider')}`,
        }}
      >
        {children}
      </Text>
    </styled.div>
  )
}
