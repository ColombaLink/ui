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
import { color, spaceToPx, font, renderOrCreateElement } from '~/utils'
import { Space } from '~/types'
import { styled } from 'inlines'

// TODO yves clean up times
type TabsProps = {
  children: ReactNode | ReactNode[]
  style?: CSSProperties
  space?: Space
  large?: boolean
  activeTab?: number
  setActiveTab?: (index: number) => void
  sameHeight?: boolean
}

const TabWrapper: FC<{
  children: ReactNode
  activeTabState: number
  index: number
  large: boolean
  setActiveTabInternal: Dispatch<SetStateAction<number>>
  setHoverTab: Dispatch<SetStateAction<number>>
  sameHeight?: boolean
}> = ({
  large,
  children,
  index,
  sameHeight,
  activeTabState,
  setHoverTab,
  setActiveTabInternal,
}) => {
  /* @ts-ignore */
  const icon = children.props.icon

  return (
    <styled.div
      style={{
        borderTop: '1px solid transparent',
        height: !large ? 42 - 3 : 66 - 3,
        padding: !large ? '8px 12px 18px 8px' : '12px',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        ...(index === activeTabState
          ? font({ size: 15, weight: 600 })
          : font({ size: 15, color: 'text2' })),
        borderBottom:
          index === activeTabState
            ? `3px solid ${color('text')}`
            : '3px solid transparent',
        '&:hover': {
          color: index !== activeTabState && color('text'),
        },
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
      {children.props.icon && (
        <div style={{ marginRight: 10 }}>{renderOrCreateElement(icon)}</div>
      )}
      {/* @ts-ignore */}

      {typeof children === 'string' ? children : children.props.label}
    </styled.div>
  )
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
  space = 0,
  large,
  activeTab = 0,
  setActiveTab,
  sameHeight,
  ...props
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
    const t = elem?.current?.children[hoverTab > -1 ? hoverTab : activeTabState]

    if (t) {
      const { width, left } = t.getBoundingClientRect()

      setLineWidth(width)
      setX(left - t.parentElement.getBoundingClientRect().left)
    }
  }, [hoverTab, activeTab, elem, children, activeTabState])

  // same height tabs options
  const tabRef = useRef(null)
  const tabRefHeight = tabRef.current?.clientHeight

  return (
    <>
      <div
        style={{
          height: !large ? 39 : 63,
          borderBottom: `1px solid ${color('border')}`,
          marginTop: '-2px',
          marginBottom: spaceToPx(space),
          position: 'relative',
          ...style,
        }}
        {...props}
      >
        <styled.div
          style={{
            height: !large ? 42 - 3 : 66 - 3,
            alignItems: 'center',
            display: 'flex',
            gap: 16,
            //    paddingBottom: !large ? 8 : 0,
            marginBottom: -2,
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
              sameHeight={sameHeight}
            >
              {child}
            </TabWrapper>
          ))}
        </styled.div>
        <div
          style={
            {
              // transition: !large
              //   ? 'width 0.2s, transform 0.15s'
              //   : 'width 0.25s, transform 0.15s',
              // //   transform: `translate(${x}px, 0px)`,
              // width: lineWidth,
              // position: 'absolute',
              // left: x,
              // backgroundColor: color('text'),
              // height: 3,
            }
          }
        ></div>
      </div>

      <div
        ref={tabRef}
        style={{
          flex: 1,
          height: sameHeight ? tabRefHeight : '100%',
          display: 'flex',
        }}
      >
        {children[activeTabState]}
      </div>
    </>
  )
}
