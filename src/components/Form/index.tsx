import React, { ChangeEventHandler, FC, FormEvent, ReactNode } from 'react'
import { styled } from 'inlines'

type SubmitResponse = {
  [key: string]: HTMLInputElement
}

export type FormProps = {
  children?: React.ReactNode
  onSubmit?: (res: SubmitResponse) => void
}

export const Form: FC<FormProps> = ({ children, onSubmit, ...props }) => {
  return (
    <styled.form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(e.target.elements)
      }}
      {...props}
    >
      {children}
    </styled.form>
  )
}
