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
  style,
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
    }, 225e3)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        opacity: fade ? 0 : 1,
        transition: `opacity 300ms`,
        cursor: 'pointer',

        // borderRadius: 8,
        // boxShadow: 'rgb(0 0 0 / 12%) 0px 8px 20px',
        ...style,
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

  const [positionFlipped, setPositionFlipped] = useState(false)
  const [toastHeightsArray, setToastHeightsArray] = useState([])

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
              style={{}}
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
      //   positionStyle.bottom = 16
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

  // const littleHelperFunction = (num, arr) => {
  //   let count = 0
  //   for (let i = 0; i < num; i++) {
  //     count += arr[i]
  //   }
  //   return count
  // }

  const toasts = toastsRef.current.map(({ id, children }, index) => {
    // keep an array with all the toast heights

    // let y = index * toastHeightY

    // let y = littleHelperFunction(index, toastHeightsArray)
    // y is de som van alle toast heights in de toastHeightsArray

    // if (length > 1) {
    //   y = toastHeightsArray.reduce((acc, curr) => acc + curr, 0)
    // }

    // console.log('y', y)

    // if ('bottom' in positionStyleRef.current) {
    //   y *= -1
    // }

    return (
      <div
        key={id}
        ref={toastyRef}
        onClick={() => {
          // close all toasts if more then 8
          positionFlipped && toastRef.current.close()
        }}
        style={{
          // TODO FIX THIS
          //     zIndex: 99999999999,
          top: positionFlipped ? 15 : '',
          // position: fixed ? 'fixed' : 'absolute',
          //  transform: `translate3d(0,${y}px,0)`,
          transition: positionFlipped ? '' : 'transform 0.3s',

          position: positionFlipped ? 'absolute' : 'static',

          marginLeft: 'auto',

          ...positionStyleRef.current,
        }}
      >
        {children}
        {positionFlipped && (
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

    // if (toasts[length - 1].ref.current) {
    // toasts[length - 1].ref.current.style.background = 'red'
    // } else {
    //   toas
    // }

    // if (length > toastHeightsArray.length) {
    //   // @ts-ignore
    //   toastHeightsArray.push(toasts[length - 1]?.ref?.current?.clientHeight)
    // }
    // if (length < toastHeightsArray.length) {
    //   toastHeightsArray.shift()
    // }

    // console.log('height arr-->', toastHeightsArray)
  }, [length])

  useEffect(() => {
    console.log(toasts)
    // @ts-ignore
    // toastHeightsArray.push(
    //   toasts[toasts.length - 1]?.ref?.current?.clientHeight
    // )
    // @ts-ignore
    if (toasts[0]?.ref?.current?.clientHeight) {
      // @ts-ignore
      setToastHeightY(toasts[0]?.ref?.current?.clientHeight)
    }

    // if (positionFlipped) {
    //   toasts[length - 1].ref.current[0].style.boxShadow =
    //     '0px 8px 20px rgba(0, 0, 0, 0.12)'
    // }
  }, [toasts])

  console.log('toasts', toasts)
  // console.log('toastHeightsArray', toastHeightsArray)

  return (
    <ToastContext.Provider value={toastRef.current}>
      {children}
      <styled.div
        style={{
          //  background: 'yellow',
          // boxShadow:
          //   positionFlipped && 'rgb(0 0 0 / 12%) 0px 8px 20px !important',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'flex-start',
          position: 'absolute',
          bottom: !positionFlipped ? 16 : '',
          right: 16,
          top: positionFlipped ? 16 : '',

          // '& div ': {
          //   boxShadow: positionFlipped && 'rgb(0 0 0 / 12%) 0px 8px 20px',
          //   borderRadius: 8,
          //   // background: 'pink',
          // },

          '& div div': {
            //    boxShadow: positionFlipped && 'rgba(0,0,0,0) 0px 0px 0px ',
            height: positionFlipped && toastHeightY - 16,
            maxHeight: positionFlipped && toastHeightY,
          },
        }}
      >
        {/* <styled.div
          style={{
            boxShadow: positionFlipped && 'rgb(0 0 0 / 12%) 0px 8px 20px ',
            width: positionFlipped && 400,
            borderRadius: positionFlipped && 8,
            marginRight: positionFlipped && 16,
            marginTop: positionFlipped && 14,
            height: positionFlipped && toastHeightY - 16,
            maxHeight: toastHeightY,
            '& div ': {
              boxShadow: positionFlipped && 'rgba(0,0,0,0) 0px 0px 0px ',
              // background: 'pink',
            },
          }}
        > */}
        {toasts.reverse()}
        {/* </styled.div> */}
      </styled.div>
    </ToastContext.Provider>
  )
}
