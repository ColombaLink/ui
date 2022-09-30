import React, { CSSProperties, FC } from 'react'
import { ContentMain } from './ContentMain'
import { ContentLeft } from './ContentLeft'
import { useLocation } from '~'
import { ContentModal } from './ContentModal'

export const Content: FC<{
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ db = 'default', prefix = '', style }) => {
  const [location] = useLocation()
  const type = location.substring(prefix.length).split('/')[1]

  console.log(window.location.search.substring(1).split('&'))

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 120px)',
        ...style,
      }}
    >
      <ContentLeft prefix={prefix} />
      <ContentMain prefix={prefix} db={db} type={type} />
      {/* <ContentModal /> */}
    </div>
  )
}
