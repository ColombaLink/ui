import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useMultiSelect } from '~/hooks/useSelect'
import { Text } from '~/components/Text'
import { deepEqual } from '@saulx/utils'
import { SelectLabel, StyledSelect } from './shared'
import {
  Value,
  Option,
  FilterSelectBadge,
  FilterSelectMoreBadge,
} from '../ContextMenu'
import { Color } from '~/types'
import { PositionProps } from '../Overlay'
import { styled, Style } from 'inlines'
import { ChevronDownIcon } from '~/icons'

export type MultiSelectProps = {
  color?: Color
  filterable?: boolean | 'create'
  label?: string
  onChange: (values: Value[]) => void
  options: (Option | Value)[]
  overlay?: PositionProps
  placeholder?: string
  style?: Style
  values?: Value[]
  ghost?: boolean
  disabled?: boolean
}

const StyledBadgeContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledLabelContainer = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const MultiSelect: FC<MultiSelectProps> = ({
  options,
  values = [],
  onChange,
  style,
  filterable,
  color = 'text',
  placeholder = 'Select options',
  overlay,
  label,
  ghost,
  disabled,
}) => {
  const ref = useRef<HTMLInputElement | null>()
  const [displayIndex, setDisplayIndex] = useState(values?.length || 0)
  // if these values update force update on the dropdown
  const [currentValues, open, setValues] = useMultiSelect(options, values, {
    variant: 'over',
    filterable,
    placement: 'left',
    width: 'target',
    ...overlay,
  })

  useEffect(() => {
    if (!deepEqual(currentValues, values)) {
      onChange(currentValues)
    }

    setDisplayIndex(currentValues.length)

    let handle: any

    const correctIt = (time = 0, cnt = 0) => {
      clearTimeout(handle)
      handle = setTimeout(() => {
        if (ref.current.children[0]?.children?.length) {
          const { width } = ref.current.getBoundingClientRect()
          const innerWidth = ref.current.children[0].clientWidth
          if (innerWidth > width - 80) {
            let targetW = innerWidth
            for (
              let i = ref.current.children[0].children.length - 1;
              i >= 0;
              i--
            ) {
              const child = ref.current.children[0].children[i] as HTMLElement
              if (!child.getAttribute('data-aviato-select-more')) {
                targetW -= child.getBoundingClientRect().width + 8
                if (targetW <= width - 80) {
                  setDisplayIndex(i)
                  correctIt(25)
                  break
                }
              }
            }
          } else {
            for (let i = 0; i < ref.current.children[0].children.length; i++) {
              const child = ref.current.children[0].children[i] as HTMLElement

              child.style.opacity = '1'
            }
          }
          if (cnt < 3) {
            correctIt(25, ++cnt)
          }
        }
      }, time)
    }

    correctIt()

    return () => {
      clearTimeout(handle)
    }
  }, [currentValues, ref])

  let optionsBadges: ReactNode

  if (!currentValues?.length) {
    optionsBadges = <Text color="text2">{placeholder}</Text>
  } else {
    const c = []
    const len = Math.min(displayIndex, currentValues.length)

    for (let i = 0; i < len; i++) {
      const v = currentValues[i]
      const opt = options.find((opt) => {
        if (typeof opt === 'object' && opt.value === v) {
          return true
        }
        return false
      }) as Option

      c.push(
        <FilterSelectBadge
          key={v}
          style={{ marginRight: 8, opacity: 0 }}
          label={opt ? opt.label : v}
          onClose={() => {
            const newValues = currentValues.filter((val) => val !== v)
            setValues(newValues)
            onChange(newValues)
          }}
        />
      )
    }

    if (displayIndex < currentValues.length) {
      c.push(
        <FilterSelectMoreBadge
          style={{ opacity: 0 }}
          number={currentValues.length - displayIndex}
          key={currentValues.length}
        />
      )
    }

    optionsBadges = <StyledBadgeContainer>{c}</StyledBadgeContainer>
  }

  if (ghost) {
    style = {
      ...style,
      backgroundColor: null,
      border: null,
      padding: 0,
      '@media (hover: hover)': {
        '&:hover': null,
      },
      boxShadow: null,
    }
  }
  if (disabled) {
    style = {
      ...style,
      cursor: 'not-allowed',
      backgroundColor: 'rgba(0,0,0,0.12)',
      opacity: '0.5',
    }
  }

  if (label) {
    return (
      <SelectLabel label={label} onClick={disabled ? null : open} style={style}>
        <StyledLabelContainer ref={ref}>
          {optionsBadges}
          <ChevronDownIcon color={color} size={16} />
        </StyledLabelContainer>
      </SelectLabel>
    )
  }

  return (
    <StyledSelect ref={ref} onClick={disabled ? null : open} style={style}>
      {optionsBadges}
      <ChevronDownIcon color={color} size={16} />
    </StyledSelect>
  )
}
