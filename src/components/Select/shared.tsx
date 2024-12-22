import { FC, ReactNode } from 'react'
import { Style, styled, color, Text, Color, RowSpaced } from '~'

export const StyledSelect = styled('div', {
  justifyContent: 'space-between',
  borderRadius: 8,
  alignItems: 'center',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  boxShadow: `0px 1px 4px ${color('background2')}`,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 7,
  paddingBottom: 7,
  cursor: 'pointer',
  userSelect: 'none',
  height: 38,
  overflowY: 'hidden',
  overflowX: 'hidden',
  display: 'flex',
  width: '100%',
  '@media (hover: hover)': {
    '&:hover': {
      border: `1px solid ${color('border:hover')}`,
    },
  },
})

export const SelectLabel: FC<{
  children: ReactNode
  onClick: any
  style?: Style
  color?: Color
  label: ReactNode
}> = ({ children, onClick, style, color: colorProp, label }) => {
  return (
    <RowSpaced
      onClick={onClick}
      style={{
        alignItems: null,
        borderRadius: 4,
        border: `1px solid ${color('border')}`,
        backgroundColor: color('background'),
        cursor: 'pointer',
        userSelect: 'none',
        height: 38,
        overflowY: 'hidden',
        overflowX: 'hidden',
        width: '100%',
        '@media (hover: hover)': {
          '&:hover': {
            border: `1px solid ${color('border:hover')}`,
          },
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
          backgroundColor: color('lightbackground2:contrast'),
          borderRight: `1px solid ${color('border')}`,
          flexShrink: 0,
        }}
      >
        {label}
      </Text>
      <Text
        weight={400}
        color={colorProp}
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 12,
          paddingRight: 12,
          borderRight: `1px solid ${color('border')}`,
        }}
      >
        {children}
      </Text>
    </RowSpaced>
  )
}
