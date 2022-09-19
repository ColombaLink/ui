import { Sidebar } from '~/components/Sidebar'
import React from 'react'
import { AttachmentIcon, EditIcon, LayersIcon } from '~/icons'
import { SchemaEditor } from '~/components/Schema'
import { useLocation } from '~/hooks'

const Project = ({ id, style }) => {
  const [location] = useLocation()
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
      <SchemaEditor
        prefix={`/${location.split('/')[1]}`}
        style={{ flexGrow: 1 }}
      />
    </div>
  )
}

export const BasedApp = () => {
  return (
    <Project
      id="enBEFnEK"
      style={{
        border: '1px solid black',
      }}
    />
  )
}
