import { Children, cloneElement, FC, ReactElement, ReactNode, useState } from 'react'
import {
  Text,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Color,
  color,
} from '~'

import { Style, styled } from 'inlines';

type AccordionItemProps = {
  label?: string
  children?: ReactNode
  checked?: boolean
  style?: Style
  expanded?: boolean
  onExpand?: (expanded: boolean) => void
  topRight?: ReactNode
  color?: Color
}

type AccordionProps = {
  children?: ReactNode
  style?: Style
  color?: Color
}

export const Accordion: FC<AccordionProps> = ({
  children,
  style,
  color: colorProp = 'accent',
}) => {
  return (
    <>
      {children && (
        <styled.div style={{ ...style }}>
          {Children.map(children as ReactElement, (child) => (
            <styled.div>
              {cloneElement(child, {
                color: colorProp,
              })}
            </styled.div>
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
  onExpand,
  expanded,
  color: colorProp = 'accent',
  ...props
}) => {
  const [openS, setOpen] = useState<boolean>()

  const open = expanded ?? openS

  return (
    <styled.div
      style={{
        marginBottom: 12,
      }}
    >
      <styled.div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(!open)
          if (onExpand) {
            onExpand(!open)
          }
        }}
        style={{
          backgroundColor: color(
            open ? colorProp : 'background2',
            undefined,
            open
            // open
          ),
          '&:hover': {
            backgroundColor: color('accent', 'active', true),
            color: color('accent'),
          },
          transition: 'background-color 0.25s, color 0.25s',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px 16px 16px',
          borderRadius: 8,
          height: 56,
          cursor: 'pointer',
          color: color('text'),
          ...style,
        }}
        {...props}
      >
        <styled.div style={{ display: 'flex', alignItems: 'center' }}>
          <Text color={open ? colorProp : 'inherit'} typography="body600">
            {label}
          </Text>
          {checked && <CheckIcon style={{ marginLeft: 10 }} color="accent" />}
        </styled.div>

        <styled.div
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
        </styled.div>
      </styled.div>
      {open && (
        <styled.div
          style={{
            marginBottom: 24,
            marginTop: 24,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {children}
        </styled.div>
      )}
    </styled.div>
  )
}
