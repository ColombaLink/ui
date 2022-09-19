import React, { CSSProperties, FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { SchemaRight } from './SchemaRight'
import { useLocation } from '~'

export const SchemaEditor: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const [location] = useLocation()
  const type = location.substring(prefix.length).split('/')[1]

  return (
    <div style={{ display: 'flex', ...style }}>
      <SchemaLeft prefix={prefix} />
      <SchemaMain prefix={prefix} db={db} type={type} />
      <SchemaRight type={type} />
    </div>
  )
}
