import React, { useState, useEffect } from 'react'
import { Space } from '~/types'
import { usePropState, Label, Button, AddIcon } from '~'
import { InputWrapper } from '../Input/InputWrapper'

type SetListProps = {
  description?: string
  disabled?: boolean
  space?: Space
  indent?: boolean
  onChange?(items: {}): void
}

export const SetList = ({
  description,
  onChange,
  disabled,
  indent,
  space,
  ...props
}: SetListProps) => {
  console.log('Set props ---> ', props)
  console.log('onChange ---> ', onChange)

  const [set, setSet] = usePropState(props?.value)

  const testSetje = new Set()
  testSetje.add(1)
  testSetje.add(2)

  console.log('testSetje ---> ', testSetje)

  //   useEffect(() => {
  //     onChange(testSetje)
  //   }, [set])

  const addItemHandler = () => {
    // maak nieuw setje
    setSet(new Set())
    console.log(set)
  }

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      <Label label={props?.label} space={12} />
      testje
      <Button ghost icon={AddIcon} onClick={() => onChange(testSetje)}>
        Add Item test
      </Button>
    </InputWrapper>
  )
}
