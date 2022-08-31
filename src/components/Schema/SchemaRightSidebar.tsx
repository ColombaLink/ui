import React from 'react'
import { RightSidebar } from '../RightSidebar'
import { Button, Text, AddIcon } from '~'

export const SchemaRightSidebar = () => {
  return (
    <RightSidebar style={{ minWidth: 210 }}>
      <Text space="24px" size={18} weight={700}>
        Fields
      </Text>
      <Button
        space="24px"
        icon={AddIcon}
        style={{ width: '100%' }}
        onClick={() => {}}
      >
        Add Field
      </Button>
      <Text space="12px" size={14} weight={600}>
        Documentation
      </Text>
      <Text size={12} color="text2" wrap>
        Read more about schema types in our guide to schema editing.
      </Text>
    </RightSidebar>
  )
}
