import React, { CSSProperties, FC } from 'react'
import { ContentMain } from './ContentMain'
import { ContentLeft } from './ContentLeft'
import { ContentModal } from './ContentModal'
import { useRoute } from 'kabouter'

export const Content: FC<{
  // eslint-disable-next-line
  db?: string
  prefix?: string
  style?: CSSProperties
}> = ({ prefix = '', style }) => {
  const route = useRoute()
  const [, type, id, field] = route.location.substring(prefix.length).split('/')

  // TODO: pass and use db

  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
    >
      <ContentLeft />
      <ContentMain view={type} />
      <ContentModal id={id} field={field} />
    </div>
  )
}
