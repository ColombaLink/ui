import React, { FC } from 'react'
import { Text, Button, AddIcon, useDialog } from '~'
import { styled } from 'inlines'
import { AddTypeModal } from '../AddTypeModal'

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const NoType: FC<{ prefix: string }> = ({ prefix }) => {
  const { open } = useDialog()

  return (
    <Container>
      <Text>Create a new type</Text>
      <Button
        style={{ marginTop: 16 }}
        icon={AddIcon}
        onClick={() => {
          open(<AddTypeModal prefix={prefix} />)
        }}
      >
        Create a new type
      </Button>
    </Container>
  )
}
