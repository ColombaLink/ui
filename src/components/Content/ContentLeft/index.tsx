import { useSchema } from '@based/react'
import React, { FC } from 'react'
import {
  Menu,
  Text,
  Button,
  AddIcon,
  useDialog,
  capitalize,
  Badge,
  useSchemaTypes,
} from '~'
import { SystemLabel } from '~/components/Schema/SchemaLeft'
import { AddTypeModal } from '../AddTypeModal'

export const ContentLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  const { loading, types } = useSchemaTypes()

  if (loading) {
    // TODO loading state
    return <>loading...</>
  }

  return (
    <Menu
      prefix={prefix}
      style={{ paddingTop: 24, minWidth: 234 }}
      header={
        <Text size="18px" weight="700" style={{ marginBottom: 18 }}>
          Content
        </Text>
      }
      data={[
        {
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 32,
              }}
            >
              <Text size="15px" weight="600">
                Types
              </Text>
            </div>
          ),
          items: Object.keys(types)
            .sort()
            .map((key) => {
              // TODO fix type
              let label: any = capitalize(types[key].meta?.name || key, true)
              if (key === 'file' || key === 'root') {
                const children = label
                label = ({ isActive }) => (
                  <SystemLabel isActive={isActive}>{children}</SystemLabel>
                )
              }
              return {
                label,
                href: `/${key}`,
              }
            }),
        },
      ]}
    />
  )
}
