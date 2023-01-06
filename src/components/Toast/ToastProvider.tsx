import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { ToastContext, ToastContextType } from './ToastContext'
import { styled } from 'inlines'
import { color, boxShadow } from '~/utils'
import { Text } from '../Text'

export const ToastContainer = ({
  id,
  children,
  onClick = null,
  toast,
  first = false,
}) => {
  const [fade, setFade] = useState(first)

  const close = () => toast.close(id)

  useEffect(() => {
    if (first) {
      requestAnimationFrame(() => {
        setFade(false)
      })
    }

    const timer = setTimeout(() => {
      setFade(true)
    }, 5e3)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        opacity: fade ? 0 : 1,
        transition: `opacity 300ms`,
        cursor: 'pointer',
      }}
      onTransitionEnd={fade ? close : null}
      onClick={() => {
        close()
        onClick?.()
      }}
    >
      {children}
    </div>
  )
}

type PositionStyleProps = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

type Toast = {
  id: number
  children: ReactNode
}

export const ToastProvider = ({
  children,
  position = 'bottom-right',
  fixed = true,
}) => {
  const [length, setLength] = useState(0)
  const [toastHeightY, setToastHeightY] = useState(90)

  const [postionFlipped, setPositionFlipped] = useState(false)

  const positionRef = useRef<typeof position>()
  const positionStyleRef = useRef<PositionStyleProps>()
  const toastsRef = useRef<Toast[]>()

  const toastyRef = useRef(null)

  const toastRef = useRef<ToastContextType>()
  if (!toastRef.current) {
    let count = 0

    const listeners = new Set([setLength])

    const update = (length) => {
      listeners.forEach((fn) => fn(length))
    }

    const toast = (child) => {
      const id = count++

      update(
        toastsRef.current.unshift({
          id,
          children: (
            <ToastContainer
              id={id}
              toast={toast}
              first={!toastsRef.current.length}
            >
              {child}
            </ToastContainer>
          ),
        })
      )

      return id
    }

    toast.add = toast
    toast.close = (id?: number) => {
      if (typeof id === 'number') {
        const index = toastsRef.current.findIndex(
          ({ id: toastId }) => toastId === id
        )
        if (index !== -1) {
          toastsRef.current.splice(index, 1)
          update(toastsRef.current.length)
        }
      } else {
        toastsRef.current = []
        update(0)
      }
    }

    toast.useCount = () => {
      const [toastCount, setToastCount] = useState(length)

      useEffect(() => {
        listeners.add(setToastCount)
        return () => {
          listeners.delete(setToastCount)
        }
      }, [])

      return toastCount
    }

    toastRef.current = toast
    toastsRef.current = []
  }

  if (positionRef.current !== position) {
    positionRef.current = position

    const [y, x] = position.split('-')
    const positionStyle: PositionStyleProps = {}

    if (y === 'bottom') {
      positionStyle.bottom = 16
    } else {
      positionStyle.top = 16
    }

    if (x === 'left') {
      positionStyle.left = 16
    } else {
      positionStyle.right = 16
    }

    positionStyleRef.current = positionStyle
  }

  const CounterBadge = styled('div', {
    width: 30,
    height: 30,
    borderRadius: 15,
    border: `1px solid ${color('border')}`,
    backgroundColor: color('background'),
    position: 'absolute',
    right: -10,
    top: -10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: boxShadow('small'),
  })

  const toasts = toastsRef.current.map(({ id, children }, index) => {
    let y = index * toastHeightY

    if ('bottom' in positionStyleRef.current) {
      y *= -1
    }

    return (
      <div
        key={id}
        ref={toastyRef}
        onClick={() => {
          // close all toasts if more then 8
          postionFlipped && toastRef.current.close()
        }}
        style={{
          // TODO FIX THIS
          //     zIndex: 99999999999,
          top: postionFlipped ? 15 : '',
          position: fixed ? 'fixed' : 'absolute',
          transform: `translate3d(0,${y}px,0)`,
          transition: postionFlipped ? '' : 'transform 0.3s',
          ...positionStyleRef.current,
        }}
      >
        {children}
        {postionFlipped && (
          <CounterBadge>
            <Text typo="caption600">{length}</Text>
          </CounterBadge>
        )}
      </div>
    )
  })

  useEffect(() => {
    if (length > 8) {
      setPositionFlipped(true)
    }
    if (length === 0) {
      setPositionFlipped(false)
    }
  }, [length])

  useEffect(() => {
    // @ts-ignore
    if (toasts[0]?.ref?.current?.clientHeight) {
      // @ts-ignore
      setToastHeightY(toasts[0]?.ref?.current?.clientHeight)
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={toastRef.current}>
      {children}
      {toasts}
    </ToastContext.Provider>
  )
}
