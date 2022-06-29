import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { DialogContext, DialogContextType } from './DialogContext'
import { Dialog } from './Dialog'
import { Input } from '../Input'
import { addOverlay, removeOverlay } from '../Overlay'
import { color } from '~/utils'

const Prompt = ({ type = 'prompt', onCancel, onConfirm, style, ...props }) => {
  const value = useRef<string | number>()
  const isPrompt = type === 'prompt'
  const isAlert = type === 'alert'

  return (
    <Dialog
      {...props}
      style={{
        width: 520,
        ...style,
      }}
    >
      {isPrompt ? (
        <Dialog.Body>
          <Input autoFocus onChange={(v) => (value.current = v)} />
        </Dialog.Body>
      ) : null}
      <Dialog.Buttons>
        {isAlert ? null : <Dialog.Cancel onCancel={onCancel} />}
        <Dialog.Confirm
          onConfirm={() =>
            isPrompt ? onConfirm(value.current) : onConfirm(true)
          }
        />
      </Dialog.Buttons>
    </Dialog>
  )
}

interface DialogItem {
  id: number
  children: ReactNode
}

export const DialogProvider = ({ children, fixed = true }) => {
  const dialogsRef = useRef<DialogItem[]>()
  const dialogRef = useRef<DialogContextType>()

  if (!dialogRef.current) {
    let count = 0
    const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>()
    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const dialog = (children, onClose = null) => {
      const id = count++
      // this is only used internally
      dialog._id = id

      children = (
        <div
          key={id}
          style={{
            alignItems: 'center',
            backgroundColor: color('OtherOverlay'),
            display: 'flex',
            justifyContent: 'center',
            padding: 20,
            position: fixed ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              dialogRef.current.close(id)
            }
          }}
        >
          {children}
        </div>
      )

      requestAnimationFrame(() => {
        addOverlay(children, onClose)
        update(
          dialogsRef.current.push({
            id,
            children,
          })
        )
      })

      return id
    }

    dialog._id = null

    const prompt = (type, props) => {
      return new Promise((resolve) => {
        if (typeof props === 'string') {
          props = {
            title: props,
          }
        }

        dialog.open(<Prompt {...props} type={type} onConfirm={resolve} />, () =>
          resolve(false)
        )
      })
    }

    dialog.open = dialog

    dialog.close = (id) => {
      if (typeof id === 'number') {
        const index = dialogsRef.current.findIndex(
          ({ id: dialogId }) => dialogId === id
        )
        if (index !== -1) {
          const removed = dialogsRef.current.splice(index, 1)
          const { length } = dialogsRef.current
          dialog._id = length ? dialogsRef.current[length - 1].id : null
          update(length)
          removeOverlay(removed?.[0].children)
        }
      } else {
        dialogsRef.current = []
        dialog._id = null
        update(0)
        removeAllOverlays()
      }
    }

    dialog.prompt = (props) => prompt('prompt', props)
    dialog.alert = (props) => prompt('alert', props)
    dialog.confirm = (props) => prompt('confirm', props)

    dialog.useCount = () => {
      const [state, setState] = useState(dialogsRef.current.length)

      useEffect(() => {
        listeners.add(setState)
        return () => {
          listeners.delete(setState)
        }
      }, [])

      return state
    }

    // @ts-ignore
    dialogRef.current = dialog
    dialogsRef.current = []
  }

  return (
    <DialogContext.Provider value={dialogRef.current}>
      {children}
    </DialogContext.Provider>
  )
}
function removeAllOverlays() {
  throw new Error('Function not implemented.')
}