import React, { FC } from 'react'
import { styled } from 'inlines'

type FormProps = {
  children?: React.ReactNode
  onSubmit?: React.ChangeEventHandler<HTMLInputElement>
}

export const Form: FC<FormProps> = ({ children, onSubmit, ...props }) => {
  return (
    <styled.form
      onSubmit={(e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        onSubmit?.(e.target.elements)
      }}
      {...props}
    >
      {children}
    </styled.form>
  )
}
