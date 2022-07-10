import React, {
  FC,
  ReactNode,
  CSSProperties,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { color, spaceToPx, font } from '~/utils'
import { Space } from '~/types'
import { styled } from 'inlines'

type TabsProps = {
  children: ReactNode | ReactNode[]
  style?: CSSProperties
  space?: Space
  large?: boolean
  activeTab?: number
  setActiveTab?: (index: number) => void
}

const TabWrapper: FC<{
  children: ReactNode
  activeTabState: number
  index: number
  large: boolean
  setActiveTabInternal: Dispatch<SetStateAction<number>>
  setHoverTab: Dispatch<SetStateAction<number>>
}> = ({
  large,
  children,
  index,
  activeTabState,
  setHoverTab,
  setActiveTabInternal,
}) => {
  return (
    <div
      style={{
        borderTop: '1px solid transparent',
        height: !large ? 42 - 3 : 66 - 3,
        padding: !large ? '8px 8px 12px 8px' : '12px',
        display: 'flex',
        marginRight: 16,
        cursor: 'pointer',
        // borderBottom: `3px solid transparent`,
        alignItems: 'center',
        ...(index === activeTabState
          ? font({ size: 15, weight: 600 })
          : font({ size: 15, color: 'text2' })),
      }}
      onClick={() => {
        setHoverTab(-1)
        setActiveTabInternal(index)
      }}
      onMouseEnter={useCallback((e) => {
        setHoverTab(index)
      }, [])}
      onMouseLeave={useCallback((e) => {
        setHoverTab(-1)
      }, [])}
      key={index}
    >
      {/* @ts-ignore */}
      {typeof children === 'string' ? children : children.props.title}
    </div>
  )
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
  space = 0,
  large,
  activeTab = 0,
  setActiveTab,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)
  let activeTabState: number = activeTab
  let setActiveTabInternal: (index: number) => void = setActiveTab
  if (!setActiveTab) {
    ;[activeTabState, setActiveTabInternal] = useState(activeTab)
  } else {
    useState(null)
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
          height: !large ? 42 : 66,
          marginTop: 24,
          borderBottom: `1px solid ${color('border')}`,
          marginBottom: spaceToPx(space),
          ...style,
        }}
      >
        <styled.div
          style={{
            height: !large ? 42 - 3 : 66 - 3,
            alignItems: 'center',
            display: 'flex',
            paddingBottom: !large ? 8 : 0,
          }}
          ref={elem}
        >
          {arrayChildren.map((child, index) => (
            <TabWrapper
              key={index}
              large={large}
              index={index}
              activeTabState={activeTabState}
              setHoverTab={setHoverTab}
              setActiveTabInternal={setActiveTabInternal}
            >
              {child}
            </TabWrapper>
          ))}
        </styled.div>
        <div
          style={{
            transition: !large
              ? 'width 0.2s, transform 0.15s'
              : 'width 0.25s, transform 0.2s',
            transform: `translate(${x}px, 0px)`,
            width: lineWidth,
            backgroundColor: color('text'),
            height: 3,
          }}
        ></div>
      </div>

      <div>
        {typeof children !== 'string' && children
          ? children[activeTabState]
          : null}
      </div>
    </>
  )
}
