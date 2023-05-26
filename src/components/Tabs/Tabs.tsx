import React, {
  FC,
  ReactNode,
  CSSProperties,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  ReactElement,
} from 'react'
import { color, font, renderOrCreateElement } from '~/utils'
import { styled } from 'inlines'
import { Text } from '../Text'

type TabsProps = {
  children: ReactNode
  style?: CSSProperties
  large?: boolean
  activeTab?: number
  setActiveTab?: (index: number) => void
  sameHeight?: boolean
}

const TabWrapper: FC<{
  children: ReactNode | ReactNode[] | ReactElement | Symbol | Object | any
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
  const icon = children?.props?.icon

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
        '@media (hover: hover)': {
          '&:hover': {
            color: index !== activeTabState && color('text'),
          },
        },
      }}
      onClick={() => {
        setHoverTab(-1)
        setActiveTabInternal(index)
      }}
      onMouseEnter={useCallback(() => {
        setHoverTab(index)
      }, [])}
      onMouseLeave={useCallback(() => {
        setHoverTab(-1)
      }, [])}
      key={index}
    >
      <div style={{ marginRight: 10 }}>{renderOrCreateElement(icon)}</div>

      {typeof children === 'string' ? (
        <Text
          typography={index === activeTabState ? 'subtext600' : 'subtext500'}
        >
          {children}
        </Text>
      ) : (
        <Text
          typography={index === activeTabState ? 'subtext600' : 'subtext500'}
        >
          {children.props.label as string}
        </Text>
      )}
    </styled.div>
  )
}

export const Tabs: FC<TabsProps> = ({
  children,
  style,
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
  const [, setHoverTab] = useState(-1)
  const elem = useRef<HTMLElement>(null)

  const tabRef = useRef(null)
  const tabRefHeight = tabRef.current?.clientHeight

  return (
    <>
      <div
        style={{
          height: !large ? 39 : 63,
          borderBottom: `1px solid ${color('border')}`,
          marginTop: '-2px',
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
            >
              {child}
            </TabWrapper>
          ))}
        </styled.div>
      </div>

      <div
        ref={tabRef}
        style={{
          flex: 1,
          height: sameHeight ? tabRefHeight : null,
          display: 'flex',
        }}
      >
        {children[activeTabState]}
      </div>
    </>
  )
}
