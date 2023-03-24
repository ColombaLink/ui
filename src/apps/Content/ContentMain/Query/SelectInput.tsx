import React, { useEffect, useRef } from 'react'
import { useSelect } from '~/hooks'
import { Text } from '~/components/Text'

export const SelectInput = ({
  options,
  onSubmit,
  nextInputRef = undefined,
  value,
  onOverlay,
}) => {
  const ref = useRef()
  const [currentValue, open] = useSelect(
    options,
    value,
    {
      variant: 'over',
      filterable: true,
      placement: 'left',
    },
    () => {
      onOverlay(true)
      return () => {
        onOverlay(false)
        nextInputRef?.current.focus()
      }
    }
  )

  useEffect(() => {
    if (currentValue !== value) {
      onSubmit(currentValue)
    }
  }, [currentValue, value])

  useEffect(() => {
    if (!value) {
      // @ts-ignore
      open({ currentTarget: ref.current })
    }
  }, [])

  const selected = options.find((v) => v === value || v.value === value)

  return (
    <button
      ref={ref}
      onClick={(e) => {
        open(e)
      }}
    >
      <Text>{selected.label || selected.value || selected}</Text>
    </button>
  )
}
