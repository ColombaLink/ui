import React, { FC } from 'react'
import { Menu, Text, useSchemaTypes } from '~'
import { SystemLabel } from '~/components/Schema/SchemaLeft'

export const ContentLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  const { loading, types } = useSchemaTypes()

  if (loading) {
    // TODO loading state
    return <>loading...</>
  }

  return (
    <Menu
      prefix={prefix}
      style={{ paddingTop: 24, minWidth: 234 }}
      header={
        <Text size="18px" weight="700" style={{ marginBottom: 18 }}>
          Content
        </Text>
      }
      data={{
        All: '/all',
        Bawler: {
          Snuk: '/slay',
        },
      }}
    />
  )
}
