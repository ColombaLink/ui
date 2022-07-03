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
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
  space = 0,
  small,
  activeTab = 0,
}) => {
  const arrayChildren: Object[] = React.Children.toArray(children)

  const [activeTabState, setActiveTab] = useState(activeTab)
  const [hoverTab, setHoverTab] = useState(-1)
  const [lineWidth, setLineWidth] = useState(0)
  const [x, setX] = useState(0)
  const elem = useRef<HTMLElement>(null)

  useEffect(() => {
    console.log(activeTabState, hoverTab)

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
          position: 'relative',
          height: '100%',
        }}
      >
        <div
          style={{
            height: small ? 42 : 66,
            marginTop: 20,
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
              paddingBottom: 3,
            }}
            ref={elem}
          >
            {arrayChildren.map((child: JSX.Element, index) => (
              <div
                style={{
                  borderTop: '1px solid transparent',
                  height: small ? 42 - 3 : 66 - 3,
                  padding: small ? '8px 24px 12px 24px' : '12px 24px',
                  display: 'flex',
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
              transition: 'width 0.2s, transform 0.15s',
              transform: `translate(${x}px, 0px)`,
              width: lineWidth,
              backgroundColor: color('TextPrimary'),
              height: 3,
            }}
          ></div>
        </div>

        <div>{children[activeTabState]}</div>
      </div>
    </>
  )
}
