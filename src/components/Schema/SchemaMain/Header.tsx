import React, { FC, ReactNode } from 'react'
import { useContextMenu } from '~/hooks'
import {
  MoreIcon,
  Text,
  Button,
  AddIcon,
  useContextState,
  ContextItem,
  useDialog,
  Dialog,
  WarningIcon,
  ChevronLeftIcon,
} from '~'
import { SelectFieldTypeModal } from '../SelectFieldTypeModal'
import { useClient } from '@based/react'

const EditMenu = ({ type }) => {
  const { open } = useDialog()
  const client = useClient()
  return (
    <ContextItem
      onClick={async () => {
        open(
          <Dialog label="Delete Type" style={{ paddingTop: 20 }}>
            <div style={{}}>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  width: '100%',
                  marginBottom: 20,
                }}
              >
                <Text style={{ paddingRight: 4 }}>
                  Are you sure you want to delete the type{' '}
                </Text>
                <Text weight={700}>{type}</Text>
              </div>
              <Button
                light
                large
                color="reddish"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'row',
                  width: '100%',
                  margin: '0 auto',
                  pointerEvents: 'none',
                  height: 40,
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WarningIcon
                    color="red"
                    style={{ marginTop: 1.5, marginRight: 8 }}
                  />
                  <Text color="text">
                    Warning: Data stored in this field will be lost.
                  </Text>
                </div>
              </Button>
              <Dialog.Buttons border>
                <Dialog.Cancel />
                <Dialog.Confirm
                  color="red"
                  onConfirm={async () => {
                    await client.call('db:set-schema', {
                      schema: {
                        types: {
                          [type]: {
                            $delete: true,
                          },
                        },
                      },
                    })
                  }}
                >
                  {`Delete ${type}`}
                </Dialog.Confirm>
              </Dialog.Buttons>
            </div>
          </Dialog>
        )
      }}
    >
      Delete
    </ContextItem>
  )
}

const BackButton = () => {
  const [field, setField] = useContextState('field', [])
  return (
    <Button
      ghost
      color="text"
      style={{ marginRight: 8 }}
      icon={<ChevronLeftIcon />}
      onClick={() => {
        setField(field.slice(0, -1))
      }}
    />
  )
}

export const Header: FC<{ back?: boolean; children: ReactNode }> = ({
  back = false,
  children,
}) => {
  const [field] = useContextState<string[]>('field', [])
  const [type] = useContextState('type', '')

  const openEditMenu = useContextMenu(EditMenu, {
    type,
    field,
  })

  const openSelectField = useContextMenu(
    SelectFieldTypeModal,
    {
      type,
      field,
    },
    { width: 924, placement: 'right' }
  )

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {back ? <BackButton /> : null}
        <Text
          size="22px"
          weight="700"
          style={{
            userSelect: 'none',
            lineHeight: '32px',
            marginRight: 8,
          }}
        >
          {children}
        </Text>
        <Button
          ghost
          color="text"
          icon={
            <MoreIcon
              onClick={openEditMenu}
              style={{
                marginTop: 3,
                cursor: 'pointer',
              }}
            />
          }
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          textAlign="center"
          large
          icon={AddIcon}
          style={{ width: '100%' }}
          onClick={openSelectField}
        >
          Add Field
        </Button>
      </div>
    </div>
  )
}
