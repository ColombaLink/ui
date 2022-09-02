import React from 'react'
import { RightSidebar } from '../RightSidebar'
import {
  Button,
  Text,
  AddIcon,
  Separator,
  useContextMenu,
  Grid,
  Thumbnail,
  CalendarIcon,
  TextIcon,
  Card,
} from '~'
import { fieldDescriptors } from './fields'

export const SchemaRightSidebar = () => {
  return (
    <RightSidebar style={{ minWidth: 210 }}>
      <Text space="16px" size={18} weight={700}>
        Fields
      </Text>
      <Separator />
      <Button
        space="24px"
        icon={AddIcon}
        style={{ width: '100%' }}
        onClick={useContextMenu(
          AddFieldsMenu,
          {},
          { width: 932, placement: 'right' }
        )}
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

const AddFieldsMenu = () => {
  return (
    <div style={{ padding: '12px 22px' }}>
      <Text weight={600} space="8px" style={{ paddingLeft: 8 }}>
        Add field
      </Text>

      <Grid itemWidth={274} gap={16}>
        {/* map over the fields and add them as cards */}

        {fieldDescriptors.map((field, i) => (
          <Card
            key={i}
            label={field.name}
            description={field.description}
            topLeft={<Thumbnail color="lightpurple" icon={field.icon} />}
          />
        ))}
      </Grid>
    </div>
  )
}
