import React, { CSSProperties, FC, ReactNode } from 'react'
import { ScrollArea } from '../ScrollArea'

type PageProps = {
  children: ReactNode
  style?: CSSProperties
}

export const Page: FC<PageProps> = ({ children, style, ...props }) => {
  return (
    <ScrollArea
      style={{
        flexGrow: 1,
        width: '100%',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          width: '100%',
          padding: 32,
          // marginBottom: 1000,
        }}
      >
        {children}
      </div>
    </ScrollArea>
  )
}
