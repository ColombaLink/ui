import React from 'react'
import { Input, Form, Button, CheckIcon } from '~'

export const Forms = () => {
  return (
    <Form>
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
    </Form>
  )
}
