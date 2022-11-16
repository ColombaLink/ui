import { useClient, useData } from '@based/react'
import React, { FC } from 'react'
import { border, LoadingIcon, Menu, Text, useSchema, useSchemaTypes } from '~'

export const ContentLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  const { schema, loading: loadingSchema } = useSchema()
  const { data: views, loading } = useData('basedObserveViews')
  if (!loading && !loadingSchema) {
    const types = Object.keys(schema.types)
    if (!views.default) {
      views.default = []
    }

    if (views.default.length < types.length) {
      const viewTypes = new Set(views.default.map(({ id }) => id))
      for (const type of types) {
        if (!viewTypes.has(type)) {
          views.default.push({
            id: type,
            query: `filter=%5B%7B%22%24field%22%3A%22type%22%2C%22%24operator%22%3A%22%3D%22%2C%22%24value%22%3A%22${type}%22%7D%5D&target=root&field=descendants`,
            label: type,
          })
        }
      }
    }
  }

  // useClient().call('basedSetViews', {})

  const data = {}

  if (views.custom?.length) {
    data['Custom Views'] = views.custom.map(({ id, query, label }) => {
      return {
        label,
        href: `/${id}?${query}`,
      }
    })
  }

  data['Default Views'] = views.default?.map(({ id, query, label }) => {
    return {
      label,
      href: `/${id}?${query}`,
    }
  })

  return loading ? (
    <div
      style={{
        width: 234,
        borderRight: border(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span>
        <LoadingIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
        Loading content views
      </span>
    </div>
  ) : (
    <Menu
      prefix={prefix}
      collapse
      style={{ paddingTop: 24, width: 234 }}
      header={
        <Text size="18px" weight="700" style={{ marginBottom: 18 }}>
          Content
        </Text>
      }
      data={data}
    />
  )
}
