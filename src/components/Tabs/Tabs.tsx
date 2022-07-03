import React, {
  FC,
  ReactNode,
  CSSProperties,
  useRef,
  useEffect,
  useState,
  ReactChild,
  useCallback,
} from 'react'
import { color, spaceToPx, font } from '~/utils'
import { Space } from '~/types'
import { styled } from 'inlines'

type TabsProps = {
  children?: FC | ReactNode | ReactChild
  style?: CSSProperties
  space?: Space
  small?: boolean
  activeTab?: number
  setActiveTab?: (index: number) => void
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
  space = 0,
  small,
  activeTab = 0,
  setActiveTab,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)

  let activeTabState: number = activeTab
  let setActiveTabInternal: (index: number) => void = setActiveTab

  if (!setActiveTab) {
    ;[activeTabState, setActiveTabInternal] = useState(activeTab)
  }
  const [hoverTab, setHoverTab] = useState(-1)
  const [lineWidth, setLineWidth] = useState(0)
  const [x, setX] = useState(0)
  const elem = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = elem.current.children[hoverTab > -1 ? hoverTab : activeTabState]
    if (t) {
      const { width, left } = t.getBoundingClientRect()
      setLineWidth(width)
      setX(left - t.parentElement.getBoundingClientRect().left)
    }
  }, [activeTabState, hoverTab, elem, children])

  return (
    <>
      <div
        style={{
          height: small ? 42 : 66,
          marginTop: 24,
          borderBottom: `1px solid ${color('OtherDivider')}`,
          marginBottom: spaceToPx(space),
          ...style,
        }}
      >
        <styled.div
          style={{
            height: small ? 42 - 3 : 66 - 3,
            alignItems: 'center',
            display: 'flex',
            paddingBottom: small ? 8 : 0,
          }}
          ref={elem}
        >
          {arrayChildren.map((child: JSX.Element, index) => (
            <div
              style={{
                borderTop: '1px solid transparent',
                height: small ? 42 - 3 : 66 - 3,
                padding: small ? '8px 8px 12px 8px' : '12px',
                display: 'flex',
                marginRight: 16,
                cursor: 'pointer',
                // borderBottom: `3px solid transparent`,
                alignItems: 'center',
                ...(index === activeTabState
                  ? font(15, 'TextPrimary', 600)
                  : font(15, 'TextSecondary')),
              }}
              onClick={() => {
                setHoverTab(-1)
                setActiveTab(index)
              }}
              onMouseEnter={useCallback((e) => {
                setHoverTab(index)
              }, [])}
              onMouseLeave={useCallback((e) => {
                setHoverTab(-1)
              }, [])}
              key={index}
            >
              {/*@ts-ignore */}
              {child.props.title}
            </div>
          ))}
        </styled.div>
        <div
          style={{
            transition: small
              ? 'width 0.2s, transform 0.15s'
              : 'width 0.25s, transform 0.2s',
            transform: `translate(${x}px, 0px)`,
            width: lineWidth,
            backgroundColor: color('TextPrimary'),
            height: 3,
          }}
        ></div>
      </div>

      <div>{children[activeTabState]}</div>
    </>
  )
}
