import React from 'react'
import { RightSidebar } from '../../RightSidebar'
import { Button, Text, AddIcon, Separator, useContextMenu } from '~'
import { SelectFieldTypeModal } from '../SelectFieldTypeModal'

export const SchemaRightSidebar = ({ type }) => {
  const openSelectField = useContextMenu(
    SelectFieldTypeModal,
    {
      type,
    },
    { width: 924, placement: 'right' }
  )

  return (
    <RightSidebar style={{ minWidth: 210 }}>
      <Text space="16px" size={18} weight={700}>
        Fields
      </Text>
      <Separator />
      <Button
        textAlign="center"
        space="24px"
        icon={AddIcon}
        style={{ width: '100%' }}
        onClick={openSelectField}
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
