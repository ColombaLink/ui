import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Dialog,
  Code,
  ScheduleIcon,
  Row,
  DuplicateIcon,
  Button,
  copyToClipboard,
  border,
  RedoIcon,
  useUpdate,
  RowSpaced,
} from '~'
import { View } from './types'
import { useClient } from '@based/react'
import { useViews } from './hooks/useViews'

type EditViewProps = {
  save?: boolean
  view: View
  changeObjectInPlace?: boolean
  label?: ReactNode
  actions?: ReactNode
  onChange: (val: View) => void | Promise<void>
}

export const EditViewModalBody: FC<EditViewProps> = ({
  view,
  onChange,
  label,
  actions,
  changeObjectInPlace,
  save,
}) => {
  const fromObject = useRef<View>(view)
  const orig = useMemo(() => {
    return JSON.stringify(fromObject.current, null, 2)
  }, [fromObject.current])
  const [str, setState] = useState<string>(orig)
  const hasChange = orig !== str
  const update = useUpdate()
  const newObject = useRef<any>({})
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    try {
      newObject.current = JSON.parse(str)
      if (changeObjectInPlace) {
        Object.assign(view, newObject.current)
      }
      setError(null)
    } catch (err) {
      setError(err)
      newObject.current = {}
    }
  }, [str])
  return (
    <>
      <Dialog.Label style={{ marginBottom: 16 }}>
        <RowSpaced>
          {label ?? 'Edit view'}
          <Row>
            {actions ?? null}
            <Button
              icon={ScheduleIcon}
              ghost
              clickAnimation
              onClick={() => {
                setState(JSON.stringify(newObject.current, null, 2))
              }}
            />
            <Button
              icon={RedoIcon}
              ghost
              clickAnimation
              onClick={() => {
                setState(orig)
              }}
            />
            <Button
              icon={DuplicateIcon}
              ghost
              clickAnimation
              onClick={() => {
                copyToClipboard(str)
              }}
            />
          </Row>
        </RowSpaced>
      </Dialog.Label>
      <Dialog.Body>
        <Code
          style={{
            border: border(1, error ? 'red' : hasChange ? 'accent' : 'border'),
          }}
          value={str}
          onChange={setState}
        />
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel />
        {save ? (
          <Button
            disabled={!hasChange || Boolean(error)}
            keyboardShortcut="Cmd+S"
            displayShortcut
            onClick={async () => {
              await onChange(view)
              fromObject.current = newObject.current
              setState(JSON.stringify(newObject.current, null, 2))
              update()
            }}
          >
            Save
          </Button>
        ) : (
          <Dialog.Confirm
            disabled={Boolean(error)}
            keyboardShortcut="Cmd+Enter"
            onConfirm={async () => {
              await onChange(view)
            }}
          />
        )}
      </Dialog.Buttons>
    </>
  )
}

export const EditViewModal: FC<EditViewProps> = (props) => {
  return (
    <Dialog
      style={{
        maxWidth: '90vw',
        width: '925px',
      }}
    >
      <EditViewModalBody {...props} />
    </Dialog>
  )
}

export const AddViewModal = () => {
  const views = useViews()
  const client = useClient()
  return (
    <EditViewModal
      label="Create new view"
      view={{
        types: [],
        addQuery: {
          parents: ['$target'],
        },
        fields: [{ field: 'name' }, { field: 'id' }],
        id: 'new-view-' + (~~(Math.random() * 10000000)).toString(16),
        label: 'New view',
        query: {
          $id: '$target',
          data: {
            $all: true,
            $list: {
              $find: {
                $traverse: 'children',
                $filter: [],
              },
            },
          },
        },
      }}
      onChange={({ query, label }) => {
        return client.call('based:set-views', {
          custom: [
            ...(views.custom ?? []),
            {
              id: query,
              label,
            },
          ],
        })
      }}
    />
  )
}
