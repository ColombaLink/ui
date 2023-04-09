import React, { useState } from 'react'
import { Dialog, RowSpaced, CurlyBracesIcon, Button, Input } from '~'
import { EditJsonModalBody } from './EditJson'
import { useClient } from '@based/react'
import { useViews } from './hooks/useViews'

export const AddCustomViewModal = () => {
  const client = useClient()
  const views = useViews()

  const [customViewName, setCustomViewName] = useState('')
  const [customViewDescription, setCustomViewDescription] = useState('')

  console.log('views', views)
  console.log('client', client)

  const [isJSON, setJSON] = useState(false)

  return (
    <Dialog
      style={{
        maxWidth: '552px',
        width: '100%',
      }}
    >
      {isJSON ? (
        <EditJsonModalBody
          label="Create new view"
          actions={
            <Button
              color={isJSON ? 'accent' : 'text'}
              onClick={() => {
                setJSON(!isJSON)
              }}
              ghost
              icon={<CurlyBracesIcon size={12} />}
            />
          }
          object={{
            $id: 'root',
            data: {
              $all: true,
              $list: {
                $find: {
                  $traverse: 'children',
                  $filter: [],
                },
              },
            },
          }}
          onChange={({ query, label }) => {
            /*
            {
  id: type,
  query: {
    $find: {
      $traverse: 'descendants',
      $filter: [
        {
          $field: 'type',
          $operator: '=',
          $value: type,
        },
      ],
    },
  },
  label: type,
}
            */

            return client.call('based:set-views', {
              custom: [
                ...(views.custom ?? []),
                {
                  id: (~~(Math.random() * 10000000)).toString(16),
                  query,
                  label,
                },
              ],
            })
          }}
        />
      ) : (
        <>
          <Dialog.Label>
            <RowSpaced>
              Add custom view
              <Button
                color={isJSON ? 'accent' : 'text'}
                onClick={() => {
                  setJSON(!isJSON)
                }}
                ghost
                icon={<CurlyBracesIcon size={12} />}
              />
            </RowSpaced>
          </Dialog.Label>
          <Dialog.Body>
            <Input
              label="Name"
              description="Name that will be displayed in the interface"
              value={customViewName}
              onChange={(e) => setCustomViewName(e)}
              type="text"
              space
            />
            <Input
              label="Description"
              description="Displays a hint for content editors"
              value={customViewDescription}
              onChange={(e) => setCustomViewDescription(e)}
              type="text"
              space
            />
          </Dialog.Body>
          <Dialog.Buttons>
            <Dialog.Cancel />
            <Dialog.Confirm
              keyboardShortcut="Cmd+Enter"
              onConfirm={() => {
                client.call('based:set-views', {
                  custom: [
                    ...(views.custom ?? []),
                    {
                      id:
                        customViewName ||
                        (~~(Math.random() * 10000000)).toString(16),
                      query: {
                        $find: {
                          $traverse: 'descendants',
                          $filter: [
                            {
                              $field: 'type',
                              $operator: '=',
                              // TODO type??
                              //   $value: type,
                              $value: ' type',
                            },
                          ],
                        },
                      },
                      label: customViewName,
                      description: customViewDescription,
                    },
                  ],
                })
              }}
            />
          </Dialog.Buttons>
        </>
      )}
    </Dialog>
  )
}
