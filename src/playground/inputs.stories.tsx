import React from 'react'
import {
  Button,
  Checkbox as Checkbox,
  CheckIcon,
  EditIcon,
  Form,
  Input,
} from '~'

export const Checkboxes = () => {
  return (
    <>
      <Checkbox />
      <br />
      <Checkbox>With Label</Checkbox>
      <br />
      <Checkbox checked>Selected</Checkbox>
      <br />
      <Checkbox checked label="With label">
        And Description
      </Checkbox>
    </>
  )
}

export const Inputs = () => {
  return (
    <>
      <Input label="String" />
      <br />
      <Input label="Number" type="number" />
      <br />
      <Input label="With Icon Left" iconLeft={CheckIcon} />
      <br />
      <Input label="With Icon Right" iconRight={EditIcon} />
      <br />
      <Input label="Multiline" multiline />
      <br />
      <Input label="With Background" bg />
    </>
  )
}

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
