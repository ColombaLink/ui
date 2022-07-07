import React, {
  ReactNode,
  FC,
  CSSProperties,
  ReactChildren,
  useRef,
  useEffect,
  useState,
} from 'react'
import { styled } from 'inlines'
import { useWindowResize } from '../../hooks/useWindowResize'

type MasonryGridProps = {
  children: ReactNode | ReactChildren
  columns?: number
  gap?: number
  style?: CSSProperties
}

export const MasonryGrid: FC<MasonryGridProps> = ({
  children,
  columns = 3,
  gap = 10,
  style,
}) => {
  const styledRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState<undefined | number>()
  const { width, height } = useWindowResize()

  useEffect(() => {
    if (styledRef?.current.clientWidth > 200) {
      setContainerWidth(styledRef?.current?.clientWidth)
      // console.log('containerWidth', containerWidth)
    }
  }, [width, height])

  return (
    <div
      ref={styledRef}
      style={{ padding: 10, position: 'relative', display: 'block' }}
    >
      <styled.div
        style={{
          columnGap: gap,
          columnCount:
            containerWidth < 400 ? 1 : containerWidth < 600 ? 2 : columns,
          ...style,
          '& div': {
            display: 'inline-block',
            width: '100%',
            marginBottom: `calc(${gap}px /2)`,
            height: 'auto',
          },

          '& div > img': {
            width: '100%',
          },
        }}
      >
        {children}
      </styled.div>
    </div>
  )
}
