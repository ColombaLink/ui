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
                <br />
                <Input label="Number" type="number" space />
                <br />
                <Input label="With Icon Left" iconLeft={CheckIcon} space />
                <br />
                <Input label="Multiline" multiline space />
                <br />
                <Input label="With Background" bg space />
                <br />
                <Button>Submit</Button>
              </>
            ),
          },
        },
      ]}
    />
  )
}
