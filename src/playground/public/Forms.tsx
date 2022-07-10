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
                <Input label="String" />
                <br />
                <Input label="Number" type="number" />
                <br />
                <Input label="With Icon Left" iconLeft={CheckIcon} />
                <br />
                <Input label="Multiline" multiline />
                <br />
                <Input label="With Background" bg />
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
