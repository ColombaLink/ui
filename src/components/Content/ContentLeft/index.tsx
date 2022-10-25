import React, { FC } from 'react'
import { Menu, Text, useSchemaTypes } from '~'

export const ContentLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  const { loading, types } = useSchemaTypes()

  if (loading) return <>...</>

  return (
    <Menu
      prefix={prefix}
      collapse
      style={{ paddingTop: 24, minWidth: 234 }}
      header={
        <Text size="18px" weight="700" style={{ marginBottom: 18 }}>
          Content
        </Text>
      }
      data={{
        'Default Views': Object.keys(types).map((type) => {
          return {
            href: `/${types[type].meta.name}?filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22${type}%22%7D%5D`,
            label: types[type].meta.name,
          }
        }),
      }}
    />
  )
}
