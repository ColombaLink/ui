import { Sidebar } from '~/components/Sidebar'
import React from 'react'
import { AttachmentIcon, EditIcon, LayersIcon } from '~/icons'
import { Schema } from '~/components/Schema'
import { Content } from '~/components/Content'
import { useLocation } from '~/hooks'

const Project = ({ style }) => {
  const [location] = useLocation()
  const prefix = `/${location.split('/')[1]}`

  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
    >
      <Sidebar
        data={[
          {
            icon: LayersIcon,
            label: 'Schema',
            href: '/schema',
          },
          {
            icon: EditIcon,
            label: 'Content',
            href: '/content',
          },
          {
            icon: AttachmentIcon,
            label: 'Files',
            href: '/files',
          },
        ]}
      />
      {location.startsWith('/content') ? (
        <Content prefix={prefix} style={{ flexGrow: 1 }} />
      ) : location.startsWith('/files') ? (
        'files'
      ) : (
        <Schema prefix={prefix} style={{ flexGrow: 1 }} />
      )}
    </div>
  )
}

export const BasedApp = () => {
  return (
    <Project
      // id="enBEFnEK"
      style={{
        position: 'relative',
        border: '1px solid black',
        overflow: 'hidden',
      }}
    />
  )
}
