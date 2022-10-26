import React, { CSSProperties } from 'react'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon } from '~'

type ArrayListProps = {
  items?: string[] | number[]
  description?: string
  indent?: boolean
  disabled?: boolean
  style?: CSSProperties
  space?: Space
}

export const ArrayList = ({
  items,
  description,
  indent,
  disabled,
  style,
  space,
  ...props
}: ArrayListProps) => {
  console.log('props from array list', props)

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      <Label label={props?.label} space={8} />
      <Button
        ghost
        icon={AddIcon}
        space={8}
        onClick={async () => {
          // open modal om een nieuw item toe te voegen..

          const ok = await prompt('Confirm please')

          console.log(e)
        }}
      >
        Add "blha"
      </Button>
    </InputWrapper>
  )
}
