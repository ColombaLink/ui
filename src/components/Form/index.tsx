import { CSSProperties, FC } from 'react'
import { styled } from 'inlines'

type FormProps = {
  style?: CSSProperties
  onSubmit?: (res: SubmitResponse) => void
}

type SubmitResponse = {
  [key: string]: any
}

export const Form: FC<FormProps> = ({ onSubmit, ...props }) => {
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
