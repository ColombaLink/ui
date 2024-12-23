import * as ui from '~'

import ComponentViewer from '../ComponentViewer'

export const ColorPicker = () => {
  return (
    <>
      <ComponentViewer
        component={ui.ColorPicker}
        propsName="ColorPickerProps"
        examples={[
          {
            props: {
              value: 'rgba(0,0,0,1)',
            },
          },
        ]}
      />
    </>
  )
}
