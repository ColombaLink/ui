import { useClient } from '@based/react'
import React, { useEffect, useState } from 'react'
import { Label, Button, AddIcon } from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { useDialog } from '~/components/Dialog'
import { FileUploadReference } from './FileUploadReference'
import { Reference } from './Reference'
import { SelectReferences } from './SelectReferences'

export const SingleReference = (props) => {
  const client = useClient()

  if (props.meta?.refTypes?.includes('file')) {
    return <FileUploadReference {...props} client={client} />
  }

  // some sort of preview state before publishing
  const [refArray, setRefArray] = useState([])
  const { label, description, value, style, onChange, space = 24 } = props

  const { open, close } = useDialog()

  useEffect(() => {
    if (props.value) {
      setRefArray(Array.from(props.value))
    }
  }, [props.value])

  const onClick = () => {
    open(
      <SelectReferences
        onChange={onChange}
        setRefArray={setRefArray}
        singleRef
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
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />

      {refArray.length > 0 ? (
        <Reference
          id={props.value || refArray[0]}
          onChange={onChange}
          setRefArray={setRefArray}
          refArray={refArray}
          singleRef
        />
      ) : null}
      <Button ghost icon={AddIcon} onClick={onClick}>
        {value || refArray?.[0] ? 'Change reference' : 'Add reference'}
      </Button>
    </InputWrapper>
  )
}
