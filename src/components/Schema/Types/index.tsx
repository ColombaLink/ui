import { useSchema } from '@based/react'
import React, { FC } from 'react'
import {
  Menu,
  Text,
  Button,
  AddIcon,
  Separator,
  useDialog,
  capitalize,
  Badge,
} from '~'
import { AddTypeModal } from '../AddTypeModal'

const SystemLabel = ({ isActive = false, children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {children}
      <Badge ghost={isActive}>system</Badge>
    </div>
  )
}

export const Types: FC<{
  hrefPrefix: string
}> = ({ hrefPrefix }) => {
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
      prefix={hrefPrefix}
      style={{ paddingTop: 24, minWidth: 234 }}
      data={Object.keys(types)
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
        })}
      header={
        <>
          <Text size="18px" weight="700">
            Schema
          </Text>
          <div
            style={{
              marginTop: 12,
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text size="15px" weight="600" color="text2">
              Types
            </Text>
            <Button
              ghost
              icon={AddIcon}
              onClick={() => {
                dialog.open(<AddTypeModal hrefPrefix={hrefPrefix} />)
              }}
            >
              Add
            </Button>
          </div>
        </>
      }
    ></Menu>
  )
}
