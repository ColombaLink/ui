import React from 'react'
import { Dialog } from '~/components/Dialog'
import { Text } from '~'
import ComponentViewer from '../ComponentViewer'

const codeExample = `<Dialog>
    <Text weight={600} space>
      Create a new organisation
    </Text>
    <Text weight={400} wrap space>
      This is your organization’s name within Based. For example, you can
      use the name of your company or department.
    </Text>
  </Dialog>`

export const Dialogs = () => {
  return (
    <div>
      <ComponentViewer
        component={Dialog}
        propsName="DialogProps"
        examples={[
          {
            code: codeExample,
          },
        ]}
      />

      <Dialog>
        <Text weight={600} space>
          Create a new organisation
        </Text>
        <Text weight={400} wrap space>
          This is your organization’s name within Based. For example, you can
          use the name of your company or department.
        </Text>
      </Dialog>
    </div>
  )
}
