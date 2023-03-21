import React, { FC } from 'react'
import { Text } from '../Text'
import { color } from '../../utils'
import { ChevronRightIcon } from '../../icons'
import { styled, Style } from 'inlines'

type BreadcrumbsProps = {
  style?: Style
  data?: {
    [key: string]: string
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
        return (
          <StyledLink
            key={index}
            onClick={() => {
              onChange(key)
            }}
          >
            <Text
              style={{ marginLeft: 16 }}
              color={active === key ? 'text' : 'text2'}
            >
              {data[key]}
            </Text>
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
