import React, {
  ChangeEventHandler,
  CSSProperties,
  FC,
  FormEvent,
  ReactNode,
} from 'react'
import { styled } from 'inlines'

type SubmitResponse = {
  [key: string]: any
}

export const Form: FC<{
  style?: CSSProperties
  onSubmit?: (res: SubmitResponse) => void
}> = ({ onSubmit, ...props }) => {
  return (
    <styled.form
      onSubmit={(e) => {
        e.preventDefault()
        if (onSubmit) {
          const result = Array.from(e.target.elements).reduce(
            (res, { name, value }) => {
              if (name) {
                res[name] = value
              }
              return res
            },
            {}
          )
          onSubmit(result)
        }
      }}
      {...props}
    />
  )
}
