import React, { useEffect, useRef, useState } from 'react'
import { Input } from '~/components/Input'
export const FilterInput = ({
  inputRef,
  clearRef,
  fields,
  setOptions,
  onDelete,
  onSubmit,
}) => {
  const options = useRef([])
  const [value, setValue] = useState('')

  useEffect(() => {
    clearRef.current = () => setValue('')
  }, [])

  useEffect(() => {
    setOptions(options.current.join(','))
  }, [value])

  return (
    <Input
      inputRef={inputRef}
      style={{
        flexGrow: 1,
        height: 30,
        // maxWidth: 'calc(100% - 4px)',
        // border: '1px solid red',
        lineHeight: '1.6',
        // alignSelf: 'flex-end',
      }}
      onBlur={() => {
        setValue('')
      }}
      ghost
      placeholder="Type to search and filter"
      value={value}
      onChange={setValue}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (!e.currentTarget.value) {
            onDelete()
          }
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          if (!e.shiftKey) {
            onSubmit(options.current[0])
            e.preventDefault()
          }
        }
      }}
      suggest={(value) => {
        if (value) {
          const lowerCased = value.toLowerCase()

          options.current = fields.filter((field) =>
            field.toLowerCase().startsWith(lowerCased)
          )

          return options.current[0]
            ? `${value}${options.current[0].substring(value.length)}`
            : null
        }
        options.current = []
        return null
      }}
    />
  )
}
