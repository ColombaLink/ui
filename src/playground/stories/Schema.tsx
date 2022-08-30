import React from 'react'
import { Page, Text, Button, AddIcon, MoreIcon, EditIcon } from '~'
import { SchemaMenu } from '~/components/Schema/SchemaMenu'
import { SchemaEditor } from '~/components/Schema'
import { RightSidebar } from '~/components/RightSidebar'

export const Schema = () => {
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <SchemaMenu
        style={{ minWidth: 210 }}
        data={{
          Schema: {
            Category: '/category',
            Project: '/project',
            Thing: '/thing',
            Ticket: '/ticket',
          },
        }}
      />
      <Page>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Text weight={700} size={18}>
              Blah
            </Text>
            <MoreIcon color="text2" />
          </div>

          <Button light icon={EditIcon}>
            Edit content
          </Button>
        </div>
        <SchemaEditor />
      </Page>

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
    </div>
  )
}
