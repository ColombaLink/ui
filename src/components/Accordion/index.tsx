import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Text } from '../Text'
import { color, spaceToPx } from '~/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '~/icons'
import { Space } from '~/types'

type AccordionItemProps = {
  label?: string
  children?: ReactNode
  space?: Space
  checked?: boolean
  style?: CSSProperties
  active?: boolean
}

type AccordionProps = {
  children?: ReactNode
  space?: Space
  style?: CSSProperties
}

export const Accordion: FC<AccordionProps> = ({ children, space, style }) => {
  return (
    <div style={{ marginBottom: spaceToPx(space), ...style }}>{children}</div>
  )
}

export const AccordionItem: FC<AccordionItemProps> = ({
  label,
  children,
  checked,
  style,
  active,
  ...props
}) => {
  const [open, setOpen] = useState(active)

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: color(open ? 'lightaccent' : 'background2'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px 16px 16px',
          borderRadius: 4,
          height: 56,
          cursor: 'pointer',
          ...style,
        }}
        {...props}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text size="15px" weight={600}>
            {label}
          </Text>
          {checked && <CheckIcon style={{ marginLeft: 10 }} color="accent" />}
        </div>

        <div>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
      </div>
      {open ? (
        <div
          style={{
            marginBottom: 24,
            marginTop: 24,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
