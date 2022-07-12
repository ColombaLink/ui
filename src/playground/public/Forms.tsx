import React from 'react'
import { Input, Form, Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Forms = () => {
  return (
    <ComponentViewer
      component={Form}
      examples={[
        {
          props: {
            children: (
              <>
                <Input label="String" space />
                <Input label="Number" type="number" space />
                <Input label="With Icon Left" icon={CheckIcon} space />
                <Input label="Multiline" multiline space />
                <Input label="With Background" bg space />
                <Button>Submit</Button>
              </>
            ),
          },
        },
      ]}
    />
  )
}
