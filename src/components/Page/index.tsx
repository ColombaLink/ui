import React, { CSSProperties, FC, ReactNode } from 'react'
import { ScrollArea } from '../ScrollArea'

type PageProps = {
  children: ReactNode
  style?: CSSProperties
}

export const Page: FC<PageProps> = ({ children, style }) => {
  return (
    <ScrollArea
      style={{
        display: 'flex',
        justifyContent: 'center',
        ...style,
      }}
    >
      <div
        style={{
          marginTop: 80,
          width: 800,
        }}
      >
        {children}
      </div>
    </ScrollArea>
  )
}
