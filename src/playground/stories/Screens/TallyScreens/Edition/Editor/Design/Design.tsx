import React from 'react'
import { EditionSidebar } from '../../EditionSidebar'
import { EditorTopBar } from '../../EditorTopBar'
import {
  Page,
  UploadIcon,
  Input,
  color,
  ColorPicker,
  Select,
  ValueSlider,
  Spacer,
  Text,
} from '~'

export const Design = () => {
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 48,
        height: '100vh',
        width: '100%',
      }}
    >
      <EditionSidebar />
      <EditorTopBar />

      <div
        style={{ display: 'flex', height: 'calc(100% - 66px)', flexGrow: 1 }}
      >
        <div
          style={{
            width: '44%',
            minWidth: 340,
            maxWidth: 500,
            height: '100%',
            padding: 32,
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Input label="Background color" colorInput space />
          <Input
            label="Background image"
            icon={<UploadIcon />}
            space
            placeholder="Upload file"
          />
          <Input
            label="Background image for mobile"
            icon={<UploadIcon />}
            space
            placeholder="Upload file"
          />
          <Input label="Card color" colorInput space />
          <Input label="Border radius" placeholder="card radius" space="8px" />
          <Input placeholder="answer border-radius" space="8px" />
          <Input placeholder="button border-radius" space />
          <Input label="Accent color" colorInput space />
          <Input label="Text color" colorInput space />
          <Input label="Button text color" colorInput space />
          <Input label="Button background color" colorInput space />
          <Input
            label="Logo"
            icon={<UploadIcon />}
            space
            placeholder="Upload logo"
          />
          <Input label="Logo height - desktop" space />
          <Input label="Logo height - mobile" space />
          <Input
            label="Favicon"
            icon={<UploadIcon />}
            space
            placeholder="Upload favicon"
          />
          <Select
            value="yes"
            onChange={() => console.log('Snurp')}
            placeholder="Font"
            label="Font"
            options={['yes', 'no', 'for sure']}
          />
          <Spacer space="32px" />
          <Text>Title scale</Text>
          <ValueSlider
            min={10}
            max={64}
            value={24}
            onValueChange={(value) => console.log(value)}
          />
        </div>
        <div
          style={{
            width: '66%',
            height: 'auto',
            backgroundColor: color('background2'),
          }}
        ></div>
      </div>
    </div>
  )
}
