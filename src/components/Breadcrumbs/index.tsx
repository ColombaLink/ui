import React, { FC, ReactNode, MouseEvent } from 'react'
import { Text, ChevronRightIcon, styled, Style } from '~'

type BreadcrumbsProps = {
  style?: Style
  data?: {
    [key: string]: ReactNode | ((e: MouseEvent<HTMLDivElement>) => void)
  }
  active?: string
  onChange?: (key: string) => void
}

const StyledLink = styled('div', {
  alignItems: 'center',
  borderRadius: 4,
  display: 'flex',
  height: 32,
  cursor: 'pointer',
})

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  data,
  style,
  active,
  onChange,
  ...props
}) => {
  if (!data) {
    return null
  }

  return (
    <div style={{ display: 'flex', ...style }} {...props}>
      {Object.keys(data).map((key, index) => {
        const el = data[key]
        const onClick =
          typeof el === 'function'
            ? (e) => {
                if (onChange) {
                  onChange(key)
                }
                el(e)
              }
            : () => {
                if (onChange) {
                  onChange(key)
                }
              }
        const label =
          typeof el === 'function' ? (
            <Text
              style={{ marginLeft: 16 }}
              color={active === key ? 'text' : 'text2'}
            >
              {key}
            </Text>
          ) : typeof el === 'string' ? (
            <Text
              style={{ marginLeft: 16 }}
              color={active === key ? 'text' : 'text2'}
            >
              {el}
            </Text>
          ) : (
            el
          )
        return (
          <StyledLink key={index} onClick={onClick}>
            {label}
            {Object.keys(data).length - 1 !== index && (
              <ChevronRightIcon
                style={{ marginLeft: 16 }}
                color={active === key ? 'text' : 'text2'}
              />
            )}
          </StyledLink>
        )
      })}
    </div>
  )
}
