import React from 'react'
import { Input, Form as FormComponent, Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Form = () => {
  return (
    <ComponentViewer
      component={FormComponent}
      propsName="FormProps"
      examples={[
        {
          props: {
            children: (
              <>
                <Input label="String" space type="text" />
                <Input label="Number" type="number" space />
                <Input
                  type="text"
                  label="With Icon Left"
                  icon={CheckIcon}
                  space
                />
                <Input label="Multiline" type="multiline" space />
                <Input type="text" label="With Background" bg space />
                <Button>Submit</Button>
              </>
            ),
          },
        },
      ]}
    />
  )
}
