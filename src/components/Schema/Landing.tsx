import React from 'react'
import { Text, Button, AddIcon, useDialog } from '~'
import { AddTypeModal } from './AddTypeModal'

export const Landing = () => {
  const dialog = useDialog()

  return (
    <div
      style={{
        padding: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div>
        <Text space="12px" weight={600}>
          Let's create a new type.
        </Text>
        <Button
          icon={AddIcon}
          onClick={() => {
            dialog.open(<AddTypeModal />)
          }}
        >
          Create a new type
        </Button>
      </div>
    </div>
  )
}
