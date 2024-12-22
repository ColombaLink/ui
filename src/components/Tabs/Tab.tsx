import { ReactNode, CSSProperties } from 'react'

type TabProps = {
  // leave the label prop here!
  label?: string | ReactNode
  children?: ReactNode | ReactNode[]
  style?: CSSProperties
  //  icon?: ReactNode
}

export const Tab = ({ children, style }: TabProps) => {
  return <div style={{ flexGrow: 1, ...style }}>{children}</div>
}
