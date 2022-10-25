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
            href: `/${type}`,
            label: types[type].meta.name,
          }
        }),
      }}
    />
  )
}
