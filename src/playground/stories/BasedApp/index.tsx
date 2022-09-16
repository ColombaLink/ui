import { Sidebar } from '~/components/Sidebar'
import React from 'react'
import { AttachmentIcon, EditIcon, LayersIcon } from '~/icons'

const Project = ({ id, style }) => {
  return (
    <div style={style}>
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
