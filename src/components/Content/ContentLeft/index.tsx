import { useQuery } from '@based/react'
import React, { FC, useState } from 'react'
import { border, LoadingIcon, Menu, Text, useSchema, Badge } from '~'

export const SystemLabel = ({ isActive = false, children }) => {
  const [hover, setHover] = useState(false)
  let thingy: boolean
  if (hover || isActive) {
    thingy = false
  } else {
    thingy = true
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {children}
      <Badge ghost={thingy}>system</Badge>
    </div>
  )
}

export const ContentLeft: FC<{}> = () => {
  const { schema, loading: loadingSchema } = useSchema()
  const { data: views = {}, loading } = useQuery('based:observe-views')

  if (!loading && !loadingSchema) {
    const types = Object.keys(schema.types)
    if (!views.default) {
      views.default = []
    }
    views.default = []
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

  const data = {}

  if (views.custom?.length) {
    data['Custom Views'] = views.custom.map(({ id, query, label }) => {
      return {
        label,
        value: { id, query },
      }
    })
  }

  data['Default Views'] = views.default?.map(({ id, query, label }) => {
    return {
      label,
      value: { id, query },
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
      collapse
      style={{
        paddingTop: 24,
        minWidth: 234,
        paddingLeft: 16,
        paddingRight: 16,
      }}
      header={
        <Text
          size="22px"
          weight="700"
          style={{ marginBottom: 24, lineHeight: '32px' }}
        >
          Content
        </Text>
      }
      data={data}
    />
  )
}
