import React, {
  useState,
  useRef,
  useEffect,
  FC,
  TouchEventHandler,
} from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { useWindowResize } from '../../hooks/useWindowResize'
import { color } from '~/utils'

const Cursor = styled('div', {
  alignItems: 'flex-start',
  right: 0,
  top: -40,
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  left: -9,
  marginBottom: 4,
})

const CursorLabel = styled('div', {
  padding: '5px',
  color: color('text'),
  transform: 'translate3d(0px,0px,0px)',
  borderRadius: '4px',
  backgroundColor: color('background2'),
  border: `1px solid ${color('border')}`,
})

const CursorArrowContainer = styled('div', {
  paddingLeft: 2,
  width: 16,
})

const CursorArrow = styled('div', {
  marginTop: '-2px',
  border: 'unset',
  height: 0,
  width: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '6px solid $$accent',
})

const RangeContainer = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  paddingTop: '20px',
  paddingBottom: '20px',
  cursor: 'pointer',
})

const SliderContainer = styled('div', {
  width: '100%',
  transform: 'translate3d(0px,0px,0px)',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
})

const LeftPart = styled('div', {
  //   fallback color for in tally edit modal
  backgroundColor: color('accent'),
  width: '20%',
  height: '6px',
  borderRadius: '4px',
  opacity: 1,
})

const Thumb = styled('div', {
  width: 16,
  height: 16,
  marginLeft: -9,
  backgroundColor: color('lightgrey'),
  borderRadius: '8px',
  border: `4px solid ${color('accent')}`,
})

const Labels = styled('div', {
  marginTop: 4,
  display: 'flex',
  justifyContent: 'space-between',
})

type Item = { id: string; title: string; index: number }

type Items = Item[]

const preventBehavior = (e: Event) => {
  e.preventDefault()
}

const preventBodyScroll = () => {
  document.addEventListener('touchmove', preventBehavior, {
    passive: false,
  })
}

const getClosestIndex = (
  xPosArray: number[],
  newPercentage: number
): number => {
  for (let i = 0; i < xPosArray.length; i++) {
    const val = xPosArray[i]
    const next = xPosArray[i + 1]
    if (newPercentage === val) {
      return i
    } else if (newPercentage < next && newPercentage > val) {
      const valDiff = Math.abs(val - newPercentage)
      const nextDiff = Math.abs(next - newPercentage)
      if (valDiff <= nextDiff) {
        return i
      } else {
        return i + 1
      }
    }
  }
  return 0
}

type ValueSliderProps = {
  items?: Items
  max?: number
  min?: number
  alwaysShowLabel?: boolean
  Label?: FC<{
    value?: number | Item
    max?: number
    min?: number
    index?: number
  }>
  step?: number
  onStartSliding?: () => void
  onEndSliding?: () => void
  value?: number
  onChange: (value: number) => void
}

export const ValueSlider: FC<ValueSliderProps> = ({
  items,
  onChange,
  max,
  alwaysShowLabel = false,
  step,
  min = 0,
  value,
  onEndSliding,
  Label,
  onStartSliding,
  ...props
}) => {
  if (step && max === undefined) {
    max = 10
  }

  const [containerWidth, setContainerWidth] = useState(0)
  //  const [leftContainerSide, setLeftContainerSide] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [index, setIndex] = useState(value || 0)
  const [percentageX, setPercentageX] = useState(0)

  // get some containers variables  // could make shorter
  const refRangeContainer = useRef(null)
  const refLeftPart = useRef(null)
  const refThumb = useRef(null)
  const refCursor = useRef(null)

  const windowSize = useWindowResize()

  // change on window resize
  useEffect(() => {
    setContainerWidth(
      refRangeContainer.current?.getBoundingClientRect().width || 0
    )
  }, [windowSize])

  // split number of items
  const splitUpRange = items ? 100 / (items.length - 1) : max - min
  const xPosArray = []

  if (items) {
    for (let i = 0; i < items.length; i++) {
      xPosArray.push(items[i].index * splitUpRange)
    }
  }

  // make percentages
  const percentage = containerWidth / 100

  useEffect(() => {
    if (max) {
      if (value !== undefined && !isUpdating) {
        setPercentageX((value / max) * 100)
      }
    } else if (value !== undefined && !isUpdating) {
      setPercentageX(xPosArray[index])
    }
  }, [isUpdating, value, max])

  useEffect(() => {
    if (xPosArray.length) {
      setIndex(getClosestIndex(xPosArray, percentageX))
    }
  }, [xPosArray, percentageX])

  const setValue = (newPercentage: number, snap?: boolean) => {
    if (xPosArray.length) {
      if (snap) {
        refLeftPart.current.style.transition = 'width 0.4s ease'
        if (refCursor.current) {
          refCursor.current.style.transition =
            'transform 0.4s ease, opacity 0.2s'
        }
      }
      const index = getClosestIndex(xPosArray, newPercentage)
      setPercentageX(snap ? xPosArray[index] : newPercentage)
      if (value !== index) {
        onChange(index)
      }
    } else {
      setPercentageX(newPercentage)
      const newValue = (newPercentage * (max - min)) / 100 + min
      if (value !== newValue) {
        onChange(newValue)
      }
    }
  }

  const moveHandler = (x: number) => {
    refRangeContainer.current.style.cursor = 'grabbing'
    refThumb.current.style.cursor = 'grabbing'
    refLeftPart.current.style.transition = 'width 0s'
    if (refCursor.current) {
      refCursor.current.style.transition = 'transform 0s, opacity 0.2s'
    }

    if (x > 0 && x < containerWidth) {
      refRangeContainer.current.style.cursor = 'pointer'

      setValue(Math.ceil(x / percentage))
    }
  }

  const mouseMoveHandler = (e) => {
    moveHandler(
      e.clientX - refRangeContainer.current?.getBoundingClientRect().left
    )
  }

  const mouseUpHandler = () => {
    refRangeContainer.current.style.cursor = 'pointer'
    refThumb.current.style.cursor = 'pointer'
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)

    setContainerWidth(
      refRangeContainer.current?.getBoundingClientRect().width || 0
    )

    setIsUpdating(false)
    if (onEndSliding) {
      onEndSliding()
    }
  }

  const onMouseDownHandler = () => {
    setIsUpdating(true)

    if (onStartSliding) {
      onStartSliding()
    }
    refRangeContainer.current.style.cursor = 'grabbing'
    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
  }

  const onTouchStart = () => {
    preventBodyScroll()
    setIsUpdating(true)
    if (onStartSliding) {
      onStartSliding()
    }
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    document.removeEventListener('touchmove', preventBehavior)
    setIsUpdating(false)
    if (onEndSliding) {
      onEndSliding()
    }
    onClickSnap(e)
  }

  // Touch functions
  const onTouchMoveHandler: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    moveHandler(
      e.touches[0].clientX -
        refRangeContainer.current?.getBoundingClientRect().left
    )
  }

  const onClickSnap = (e) => {
    const correctedMouseXPos =
      e.clientX - refRangeContainer.current?.getBoundingClientRect().left
    if (correctedMouseXPos > 0 && correctedMouseXPos < containerWidth) {
      setValue(Math.ceil(correctedMouseXPos / percentage), true)
    }
  }

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        marginTop: alwaysShowLabel ? 48 : 0,
      }}
      {...props}
    >
      <Cursor
        ref={refCursor}
        style={{
          transform: `translate3d(${percentageX}%,0,0)`,
          opacity: alwaysShowLabel || isUpdating ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <CursorLabel
          style={{
            transform: `translate3d(-${percentageX}%,0,0)`,
          }}
        >
          {Label ? (
            <Label
              index={index}
              value={items ? items[index] : (percentageX * max) / 100}
              max={max}
              min={min}
            />
          ) : items ? (
            items[index]?.title
          ) : (
            Math.round((percentageX * max) / 100)
          )}
        </CursorLabel>
        <CursorArrowContainer
          style={{ transform: `translate3d(-${percentageX}%,0,0)` }}
        >
          <CursorArrow />
        </CursorArrowContainer>
      </Cursor>

      <RangeContainer
        onMouseDown={onMouseDownHandler}
        onClick={onClickSnap}
        ref={refRangeContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEnd}
      >
        <SliderContainer>
          <div
            style={{
              backgroundColor: color('background2'),
              zIndex: -1,
              width: '100%',
              height: '6px',
              position: 'absolute',
              borderRadius: '4px',
            }}
          />
          <LeftPart ref={refLeftPart} style={{ width: `${percentageX}%` }} />
          <Thumb ref={refThumb} />
        </SliderContainer>
      </RangeContainer>

      {items ? (
        <Labels>
          <Text>{items[0]?.title}</Text>
          <Text>{items[items.length - 1]?.title}</Text>
        </Labels>
      ) : null}
    </div>
  )
}

// import React, { FC, useState, useEffect, useRef } from 'react'
// import { styled } from 'inlines'
// import { color } from '~/utils'

// type ValueSliderProps = {}

// type TrackProps = {}

// type ThumbProps = {
//   value: number
// }

// type LabelProps = {
//   value: number
// }

// export const ValueSlider: FC<ValueSliderProps> = () => {
//   return (
//     <div>
//       <Track />
//     </div>
//   )
// }

// export const Track: FC<TrackProps> = () => {
//   const [value, setValue] = useState(40)
//   const [trackWidth, setTrackWidth] = useState(0)

//   const trackRef = useRef()

//   useEffect(() => {
//     setTrackWidth(trackRef.current.offsetWidth)
//   }, [])

//   const toPercentages = (num) => {
//     return num / (trackWidth / 100)
//   }

//   return (
//     <styled.div
//       ref={trackRef}
//       onClick={(e) => {
//         setValue(Math.floor(toPercentages(e.clientX - e.target.offsetLeft)))
//       }}
//       style={{
//         width: '100%',
//         height: 6,
//         backgroundColor: color('lightgrey:active'),
//         position: 'relative',
//         display: 'flex',
//         alignItems: 'center',
//         borderRadius: 3,
//         '&:before': {
//           content: '""',
//           position: 'absolute',
//           left: '0px',
//           width: `${value}%`,
//           height: '6px',
//           backgroundColor: color('accent'),
//           borderRadius: '3px',
//         },
//       }}
//     >
//       <Label value={value} />
//       <Thumb value={value} />
//     </styled.div>
//   )
// }

// export const Thumb: FC<ThumbProps> = ({ value }) => {
//   return (
//     <styled.div
//       draggable
//       style={{
//         position: 'absolute',
//         left: `calc(${value}% - 8px)`,
//         cursor: 'pointer',
//         width: 16,
//         height: 16,
//         backgroundColor: color('lightgrey'),
//         border: `4px solid ${color('accent')}`,
//         borderRadius: '8px',
//       }}
//     ></styled.div>
//   )
// }

// export const Label: FC<LabelProps> = ({ value }) => {
//   return (
//     <styled.div
//       style={{
//         position: 'absolute',
//         left: `${value}%`,
//         transform: 'translateX(-50%)',
//         top: '-50px',
//         textAlign: 'center',
//         display: 'block',
//         backgroundColor: color('lightgrey'),
//         padding: '5px',
//         borderRadius: '4px',
//         border: `1px solid ${color('border')}`,
//       }}
//     >
//       label {value}%
//     </styled.div>
//   )
// }
