import { FC, ReactNode } from 'react'
import { ScrollArea } from '../ScrollArea'
import { styled, Style } from 'inlines'

type PageProps = {
  children: ReactNode
  onDragOver?: (e: DragEvent) => void
  onDragLeave?: (e: DragEvent) => void
  onDrop?: (e: DragEvent) => void
  style?: Style
}

export const Page: FC<PageProps> = ({ children, style, ...props }) => {
  return (
    <ScrollArea
      style={{
        flexGrow: 1,
        overflowX: 'hidden',
        ...style,
      }}
      {...props}
    >
      <styled.div
        style={{
          maxWidth: '100%',
          minWidth: '100%',
          padding: 32,
        }}
      >
        {children}
      </styled.div>
    </ScrollArea>
  )
}

type AppProps = {
  style?: Style
  children: ReactNode
}

export const AppFrame: FC<AppProps> = ({ children, style }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        overflowY: 'hidden',
        ...style,
      }}
    >
      {children}
    </styled.div>
  )
}
