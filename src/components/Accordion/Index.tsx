import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Text } from '../Text'
import { color, spaceToPx } from '~/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '~/icons'
import { Space } from '~/types'

type AccordionItemProps = {
  title?: string
  children?: ReactNode
  space?: Space
  checked?: boolean
  style?: CSSProperties
}

type AccordionProps = {
  children?: ReactNode
  space?: Space
  style?: CSSProperties
}

export const Accordion: FC<AccordionProps> = ({ children, space, style }) => {
  space = 32
  return (
    <div style={{ marginBottom: spaceToPx(space), ...style }}>{children}</div>
  )
}

export const AccordionItem: FC<AccordionItemProps> = ({
  title,
  children,
  checked,
  space = 12,
  style,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        marginBottom: spaceToPx(space),
      }}
    >
      <div
        style={{
          backgroundColor: open
            ? color('PrimaryLightAccent')
            : color('Greylight'),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px 16px 16px',
          borderRadius: 4,
          height: 56,
          cursor: 'pointer',
          ...style,
        }}
        onClick={() => setOpen(!open)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text size="15px" weight={600} color="TextPrimary">
            {title}
          </Text>
          {checked && (
            <CheckIcon style={{ marginLeft: 10 }} color="PrimaryMain" />
          )}
        </div>

        <div>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
      </div>
      <div
        style={{
          display: open ? 'block' : 'none',
          marginBottom: 24,
          marginTop: 24,
        }}
      >
        {children}
      </div>
    </div>
  )
}
