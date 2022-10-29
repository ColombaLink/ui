import React, { FC, useEffect } from 'react'
import {
  Menu,
  Text,
  Button,
  AddIcon,
  useDialog,
  Badge,
  useLocation,
  LoadingIcon,
} from '~'
import { useSchema } from '~/hooks/useSchema'
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
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>
          <LoadingIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
          Loading schema
        </span>
      </div>
    )
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
              let label = types[key].meta?.name
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
