import React from 'react'
import { EditionSidebar } from '../../EditionSidebar'
import { EditorTopBar } from '../../EditorTopBar'
import { Page, UploadIcon, Input, color, ColorPicker } from '~'

export const Design = () => {
  return (
    <div style={{ position: 'relative', paddingLeft: 48 }}>
      <EditionSidebar />
      <EditorTopBar />

      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '44%',
            minWidth: 340,
            maxWidth: 500,
            height: '100vh',
            padding: 32,
          }}
        >
          <Input label="Background image" icon={<UploadIcon />} space />
          <Input
            label="Background image for mobile"
            icon={<UploadIcon />}
            space
          />
          <Input label="Border radius" placeholder="card radius" space="8px" />
          <Input placeholder="answer border-radius" space="8px" />
          <Input placeholder="button border-radius" space />
        </div>
        <div
          style={{
            width: '66%',
            height: '100vh',
            backgroundColor: color('background2'),
          }}
        ></div>
      </div>
    </div>
  )
}
