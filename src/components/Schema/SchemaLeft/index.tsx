import { useSchema } from '@based/react'
import React, { FC } from 'react'
import { Menu, Text, Button, AddIcon, useDialog, capitalize, Badge } from '~'
import { AddTypeModal } from '../AddTypeModal'

export const SystemLabel = ({ isActive = false, children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {children}
      <Badge ghost={isActive}>system</Badge>
    </div>
  )
}

export const SchemaLeft: FC<{
  prefix: string
}> = ({ prefix }) => {
  const dialog = useDialog()
  const { schema, loading } = useSchema()

  if (loading) {
    // TODO loading state
    return <>loading...</>
  }

  const types = {
    root: schema.rootType,
    ...schema.types,
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
              <Button
                ghost
                icon={AddIcon}
                onClick={() => {
                  dialog.open(<AddTypeModal prefix={prefix} />)
                }}
              >
                Add
              </Button>
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
      // header={
      //   <>
      //     <Text size="18px" weight="700">
      //       Schema
      //     </Text>
      //     <div
      //       style={{
      //         marginTop: 12,
      //         marginBottom: 12,
      //         display: 'flex',
      //         justifyContent: 'space-between',
      //         alignItems: 'center',
      //       }}
      //     >
      //       <Text size="15px" weight="600" color="text2">
      //         Types
      //       </Text>
      //       <Button
      //         ghost
      //         icon={AddIcon}
      //         onClick={() => {
      //           dialog.open(<AddTypeModal prefix={prefix} />)
      //         }}
      //       >
      //         Add
      //       </Button>
      //     </div>
      //   </>
      // }
    />
  )
}
