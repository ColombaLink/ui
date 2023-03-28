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

type EditJsonProps = {
  save?: boolean
  object: object
  label?: ReactNode
  onChange: (val: object) => void | Promise<void>
}

export const EditJsonModalBody: FC<EditJsonProps> = ({
  object,
  onChange,
  label,
  save,
}) => {
  const fromObject = useRef(object)
  const orig = useMemo(() => {
    return JSON.stringify(fromObject.current, null, 2)
  }, [fromObject.current])
  const [str, setState] = useState(orig)
  const hasChange = orig !== str
  const update = useUpdate()
  const newObject = useRef({})
  const [error, setError] = useState<Error | null>(null)
  useEffect(() => {
    try {
      newObject.current = JSON.parse(str)
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
          {label ?? 'Edit JSON'}
          <Row>
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
                setState(JSON.stringify(object, null, 2))
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
              await onChange(newObject.current)
              fromObject.current = newObject.current
              setState(JSON.stringify(newObject.current, null, 2))
              update()
            }}
          >
            Save
          </Button>
        ) : (
          <Dialog.Confirm
            disabled={!hasChange || Boolean(error)}
            keyboardShortcut="Cmd+Enter"
            onConfirm={async () => {
              await onChange(newObject.current)
            }}
          />
        )}
      </Dialog.Buttons>
    </>
  )
}

export const EditJsonModal: FC<EditJsonProps> = (props) => {
  return (
    <Dialog
      style={{
        maxWidth: '90vw',
        width: '925px',
      }}
    >
      <EditJsonModalBody {...props} />
    </Dialog>
  )
}
