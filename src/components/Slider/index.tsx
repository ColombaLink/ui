// TODO optimize later
import {
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
import { Color } from '~/types'

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
  paddingLeft: 8,
  cursor: 'pointer',
  overFlowX: 'hidden',
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

type SliderProps = {
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
  color?: Color
  showMinMaxNumber?: boolean
}

export const Slider: FC<SliderProps> = ({
  items,
  onChange,
  max,
  alwaysShowLabel = false,
  step = 1,
  min = 0,
  value,
  onEndSliding,
  Label,
  onStartSliding,
  color: colorProp = 'accent',
  showMinMaxNumber,
  ...props
}) => {
  if (step && max === undefined) {
    max = 10
  }

  if (step !== 1 && !items) {
    items = []
    let counter = 0
    for (let i = min; i <= max; i += step) {
      items.push({ id: `blah${i}`, index: counter, title: i.toString() })
      counter++
    }
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
        onChange(Math.trunc(newValue))
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

      setValue(Math.round(x / percentage))
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
      setValue(Math.round(correctedMouseXPos / percentage), true)
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
            Math.floor((percentageX * max) / 100)
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
          <LeftPart
            ref={refLeftPart}
            style={{
              width: `${percentageX}%`,
              backgroundColor: color(colorProp),
            }}
          />
          <Thumb ref={refThumb} style={{ borderColor: color(colorProp) }} />
        </SliderContainer>
      </RangeContainer>

      {items && showMinMaxNumber ? (
        <Labels>
          <Text>{items[0]?.title}</Text>
          <Text>{items[items.length - 1]?.title}</Text>
        </Labels>
      ) : null}
    </div>
  )
}
