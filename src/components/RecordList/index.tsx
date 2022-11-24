import React, { CSSProperties } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Space } from '~/types'
import { EditIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'

type RecordListProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  schema?: any
  style?: CSSProperties
  space?: Space
  onClick?: () => void
}

export const RecordList = ({
  label,
  description,
  schema,
  onClick,
  ...props
}: RecordListProps) => {
  console.log('What is inside object props-->', props)

  return (
    <InputWrapper indent space descriptionBottom={description}>
      <Text space={12} weight={600}>
        <div style={{ display: 'flex' }}>
          {label} <Badge style={{ marginLeft: 8 }}>{schema.values.type}</Badge>
        </div>
      </Text>
      <InputWrapper indent space={8}>
        if there is something in here
      </InputWrapper>
      <Button ghost icon={EditIcon} onClick={onClick}>
        Edit Record
      </Button>
    </InputWrapper>
  )
}
