import React from 'react'
import { Type } from './Type'
import { Types } from './Types'
import { useLocation } from '~'
import { SchemaRightSidebar } from './SchemaRightSidebar'

export const SchemaEditor = ({
  hrefPrefix = '/any-prefix',
  db = 'default',
  style,
}) => {
  const [location] = useLocation()
  const type = location.substring(hrefPrefix.length).split('/')[1]

  return (
    <div style={{ display: 'flex', ...style }}>
      <Types hrefPrefix={hrefPrefix} />
      <Type hrefPrefix={hrefPrefix} db={db} type={type} />
      <SchemaRightSidebar type={type} />
    </div>
  )
}
