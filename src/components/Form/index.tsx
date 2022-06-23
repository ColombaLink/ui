import React, { FC } from 'react'
import { styled } from 'inlines'

export const Form: FC = ({ children, onSubmit, ...props }) => {
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
