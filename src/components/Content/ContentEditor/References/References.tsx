import { useClient } from '@based/react'
import React, { useEffect, useState } from 'react'
import { Label, Button, AddIcon, EditIcon } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { useDialog } from '~/components/Dialog'
import { FileUploadReference } from './FileUploadReference'
import { SelectReferences } from './SelectReferences'
import { Reference } from './Reference'

export const References = (props) => {
  const client = useClient()

  const { label, description, value, style, onChange, space = 24 } = props
  const [refArray, setRefArray] = useState([])

  useEffect(() => {
    if (props.value) {
      setRefArray(Array.from(props.value))
    }
  }, [props.value])

  if (props.meta?.refTypes?.includes('files')) {
    return <FileUploadReference {...props} multiple client={client} />
  }

  const { open, close } = useDialog()

  const onClick = () => {
    open(
      <SelectReferences
        onChange={onChange}
        setRefArray={setRefArray}
        close={close}
      />
    )
  }

  return (
    <InputWrapper
      indent
      style={style}
      descriptionBottom={description}
      space={space}
    >
      <Label label={label} style={{ marginBottom: 12 }} />
      {refArray?.map((id) => (
        <Reference
          key={id}
          id={id}
          onChange={onChange}
          setRefArray={setRefArray}
          refArray={refArray}
        />
      ))}
      <Button
        ghost
        icon={value?.length > 0 ? EditIcon : AddIcon}
        onClick={onClick}
      >
        {value?.length > 0 ? 'Change References' : 'Add References'}
      </Button>
    </InputWrapper>
  )
}
