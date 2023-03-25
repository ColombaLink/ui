import React, { FC, ReactNode, useState } from 'react'
import { Text } from '../Text'
import { color, spaceToPx } from '~/utils'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '~/icons'
import { Space, Color } from '~/types'
import { Style, styled } from 'inlines'

type AccordionItemProps = {
  label?: string
  children?: ReactNode
  space?: Space
  checked?: boolean
  style?: Style
  expanded?: boolean
  topRight?: ReactNode
  // color?: Color
}

type AccordionProps = {
  children?: ReactNode
  space?: Space
  style?: Style
  color?: Color
}

export const Accordion: FC<AccordionProps> = ({
  children,
  space,
  style,
  color: colorProp = 'accent',
}) => {
  return (
    <>
      {children && (
        <styled.div style={{ marginBottom: spaceToPx(space), ...style }}>
          {React.Children.map(children as React.ReactElement, (child) => (
            <div>
              {React.cloneElement(child, {
                color: colorProp,
              })}
            </div>
          ))}
        </styled.div>
      )}
    </>
  )
}

export const AccordionItem: FC<AccordionItemProps> = ({
  label,
  children,
  topRight,
  checked,
  style,
  expanded,
  color: colorProp = 'accent',
  ...props
}) => {
  const [openS, setOpen] = useState<boolean>()

  const open = openS ?? expanded

  return (
    <div style={{ marginBottom: 12 }}>
      <styled.div
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: color(
            open ? colorProp : 'background2',
            undefined,
            open
            // open
          ),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px 16px 16px',
          borderRadius: 8,
          height: 56,
          cursor: 'pointer',
          ...style,
        }}
        {...props}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text color={open ? colorProp : 'text'} typo="body600">
            {label}
          </Text>
          {checked && <CheckIcon style={{ marginLeft: 10 }} color="accent" />}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {topRight || null}
          {open ? (
            <ChevronUpIcon
              style={{ marginLeft: topRight ? 16 : 0 }}
              color={open ? colorProp : 'text'}
            />
          ) : (
            <ChevronDownIcon
              style={{ marginLeft: topRight ? 16 : 0 }}
              color={open ? colorProp : 'text'}
            />
          )}
        </div>
      </styled.div>
      {open && (
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
      )}
    </div>
  )
}
