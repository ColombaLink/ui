import React, { FC, useEffect, ReactNode, CSSProperties } from 'react'
import { useSelect } from '~/hooks/useSelect'
import { Value, Option } from '~/components/ContextMenu'
import { Text } from '~/components/Text'
import { styled } from 'inlines'
import { PositionProps } from '../Overlay'
import { Color } from '~/types'
import { ChevronDownIcon } from '~/icons'
import { color } from '~/utils'

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

export const StyledSelectLabel = styled('div', {
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
})

export const StyledLeftLabel = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 12,
  paddingRight: 12,
  backgroundColor: color('ActionLight'),
  borderRight: `1px solid ${color('OtherDivider')}`,
})

export const StyledRightLabel = styled('div', {
  flexGrow: 1,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 12,
  paddingRight: 12,
  borderRight: `1px solid ${color('OtherDivider')}`,
})

export const SelectLabel = ({
  children,
  onClick,
  style,
  color = '$TextPrimary',
  label,
}) => {
  return (
    <StyledSelectLabel onClick={onClick} style={{ color, ...style }}>
      <StyledLeftLabel>
        <Text>{label}</Text>
      </StyledLeftLabel>
      <StyledRightLabel>{children}</StyledRightLabel>
    </StyledSelectLabel>
  )
}

export type SelectProps = {
  value?: Value
  options: (Option | Value)[]
  onChange: (value: Value) => void
  filterable?: boolean | 'create'
  placeholder?: string
  overlay?: PositionProps
  label?: string
  color?: Color
  style?: CSSProperties
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  style,
  filterable,
  color = '$TextPrimary',
  placeholder = 'Select an option',
  overlay,
  label,
}) => {
  const [currentValue, open] = useSelect(options, value, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })

  useEffect(() => {
    if (currentValue !== value) {
      onChange(currentValue)
    }
  }, [currentValue])

  let labelValue: ReactNode = currentValue

  if (currentValue) {
    for (const opt of options) {
      if (typeof opt === 'object' && opt.value === currentValue && opt.label) {
        labelValue = opt.label
      }
    }
  }

  const children = (
    <>
      <Text color={!currentValue ? 'Secondary' : 'Primary'}>
        {labelValue || placeholder}
      </Text>
      <ChevronDownIcon color={color} />
    </>
  )

  if (label) {
    return (
      <SelectLabel label={label} onClick={open} style={style}>
        {children}
      </SelectLabel>
    )
  }

  return (
    <StyledSelect onClick={open} style={style}>
      {children}
    </StyledSelect>
  )
}
