import React, { CSSProperties, FC } from 'react'
import { ContentMain } from './ContentMain'
import { ContentLeft } from './ContentLeft'
// import { SchemaRight } from './ContentRight'
import { useLocation } from '~'

export const Content: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const [location] = useLocation()
  const type = location.substring(prefix.length).split('/')[1]

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)', ...style }}>
      {/* <ContentLeft prefix={prefix} /> */}
      <ContentMain prefix={prefix} db={db} type={type} />
      {/* <SchemaRight type={type} /> */}
    </div>
  )
}
