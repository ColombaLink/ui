import React from 'react'
import { border, color } from '~/utils'
import { styled } from 'inlines'

export const Pill = ({ children }) => {
  if (!Array.isArray(children)) {
    children = [children]
  }
  return (
    <div
      style={{
        height: 30,
        display: 'flex',
        borderRadius: 4,
        backgroundColor: color('lighttext'),
      }}
    >
      {children.map((child, index) => {
        return (
          <styled.label
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              borderLeft: index ? border(1) : null,
              cursor: index ? 'pointer' : null,
              '&:hover': index
                ? {
                    backgroundColor: color('lighttext:hover'),
                    borderLeft: '1px solid transparent',
                  }
                : null,
            }}
          >
            {child}
          </styled.label>
        )
      })}
    </div>
  )
}
