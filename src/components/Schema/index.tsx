import React, { CSSProperties, FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { SchemaRight } from './SchemaRight'
import { useLocation } from '~'

export const Schema: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const [location] = useLocation()
  const [, type, ...path] = location.substring(prefix.length).split('/')

  return (
    <div style={{ display: 'flex', ...style }}>
      <SchemaLeft prefix={prefix} />
      <SchemaMain db={db} type={type} path={path} />
      <SchemaRight type={type} path={path} />
    </div>
  )
}
