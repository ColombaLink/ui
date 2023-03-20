import React, { FC, CSSProperties } from 'react'
import { Text } from '../Text'
import { ChevronRightIcon } from '~/icons'
import { Link, useRoute } from 'kabouter'
import { styled } from 'inlines'

type BreadcrumbsProps = {
  style?: CSSProperties
  data?: {
    [key: string]: string
  }
  prefix?: string
  selected?: string
}

const StyledLink = styled(Link, {
  alignItems: 'center',
  borderRadius: 4,
  display: 'flex',
  height: 32,
})

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  data,
  style,
  prefix = '',
  selected,
  ...props
}) => {
  const route = useRoute()

  if (!data) {
    return null
  }

  if (!selected) {
    selected = route.location
  }

  return (
    <div style={{ display: 'flex', ...style }} {...props}>
      {Object.keys(data).map((key, index) => {
        const href = prefix + data[key]
        const isActive = false

        return (
          <StyledLink href={href} key={index}>
            <Text
              style={{ marginLeft: 16 }}
              color={isActive ? 'text' : 'text2'}
            >
              {key}
            </Text>
            {Object.keys(data).length - 1 !== index && (
              <ChevronRightIcon
                style={{ marginLeft: 16 }}
                color={isActive ? 'text' : 'text2'}
              />
            )}
          </StyledLink>
        )
      })}
    </div>
  )
}
