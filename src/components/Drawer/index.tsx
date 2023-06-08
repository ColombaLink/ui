import React, {
  useState,
  FunctionComponent,
  ReactNode,
  FC,
  CSSProperties,
  useEffect,
} from 'react'
import { styled, Style } from 'inlines'
import useLocalStorage from '@based/use-local-storage'

import { Icon } from '~/types'
import { border, color, boxShadow, renderOrCreateElement } from '~/utils'
import { ChevronRightIcon } from '~/icons'
import { useWindowResize } from '~/hooks'

type DrawerProps = {
  open?: boolean
  autoCollapse?: boolean
  icon?: FunctionComponent<Icon> | ReactNode
  width: number
  closeWidth: number | string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
  defaultState?: boolean
  closeBreakpoint?: number
  right?: boolean
}

export const Drawer: FC<DrawerProps> = ({
  width,
  style,
  closeWidth,
  closeBreakpoint,
  children,
  defaultState,
  icon,
  right,
}) => {
  const [collapsed, setCollapsed] = useLocalStorage('collapsed')
  const [resizeState, setResizeState] = useState(false)
  const [forceOpen, setForceOpen] = useState(false)
  if (collapsed === undefined) setCollapsed(defaultState)
  const [hoverForExpansion, setHoverForExpansion] = useState(false)
  const bla = useWindowResize()
  useEffect(() => {
    console.log(bla)
    if (bla.width < (closeBreakpoint || width)) {
      console.log('BOOM')
      setResizeState(true)
    }
    if (bla.width > (closeBreakpoint || width)) {
      console.log('BOOM')
      setResizeState(false)
    }
  }, [bla])
  return (
    <styled.div
      style={{
        // border: '1px solid red',
        width: forceOpen
          ? width
          : collapsed || resizeState
          ? closeWidth
          : width,
        // minWidth: collapsed ? closeWidth : width,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: right ? 'absolute' : 'relative',
        // border: '1px solid red',
        left: right ? 'auto' : 0,
        right: right ? 0 : undefined,
        borderRight: right ? null : border(1),
        borderLeft: right ? border(1) : null,
        transition: 'width 0.24s ease-out',
        height: '100vh',

        // '@media (hover: hover)': {
        //   '&:hover': {
        //     borderRight: `2px solid ${color('accent')}`,
        //     cursor: 'pointer',
        //   },
        // },
        ...style,
      }}
      onClick={() => {}}
      onMouseOver={(e) => {
        setHoverForExpansion(true)
      }}
      onMouseLeave={() => {
        setHoverForExpansion(false)
      }}
    >
      <styled.div
        style={{
          postion: 'absolute',
          top: 0,

          // left: 0,
          // right: 0,
          display: 'flex',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </styled.div>
      <styled.div
        style={{
          position: 'absolute',
          right: right ? undefined : 0,
          left: right ? 0 : undefined,
          top: 0,
          bottom: 0,
          height: '100%',
          // width: 30,
          borderRight: right ? null : '2px solid transparent',
          borderLeft: right ? '2px solid transparent' : null,
          '@media (hover: hover)': {
            '&:hover': {
              borderRight: `2px solid ${color('accent')}`,
              // borderLeft: `2px solid ${color('accent')}`,
              cursor: 'pointer',
            },
          },
        }}
        onMouseOver={(e) => {
          // setMenuHeight(e.currentTarget.offsetHeight)
          setHoverForExpansion(true)
        }}
        onMouseLeave={() => {
          setHoverForExpansion(false)
        }}
        onClick={() => {
          setCollapsed(!collapsed)
          if (resizeState) {
            setForceOpen(true)
          }
          if (forceOpen) {
            setForceOpen(false)
          }
        }}
      >
        {true ? (
          <styled.div
            style={{
              position: 'absolute',
              top: '50%',
              width: 28,
              height: 28,
              borderRadius: 16,
              backgroundColor: color('background'),
              border: `1px solid ${color('border')}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              right: right ? undefined : -14,
              left: right ? -14 : undefined,
              cursor: 'pointer',
              boxShadow: boxShadow('small'),
              '@media (hover: hover)': {
                '&:hover': {
                  backgroundColor: color('background2'),
                },
              },
            }}
          >
            <ChevronRightIcon
              color="text"
              size="12px"
              style={{
                position: 'absolute',
                transform: !right
                  ? forceOpen
                    ? 'scaleX(-1)'
                    : collapsed || resizeState
                    ? 'scaleX(1)'
                    : 'scaleX(-1)'
                  : forceOpen
                  ? 'scaleX(1)'
                  : collapsed || resizeState
                  ? 'scaleX(-1)'
                  : 'scaleX(1)',
                marginRight: -1,
              }}
              onClick={(e) => {
                setCollapsed(!collapsed)
                if (resizeState) {
                  setForceOpen(true)
                }
                if (forceOpen) {
                  setForceOpen(false)
                }
              }}
            />
          </styled.div>
        ) : null}
      </styled.div>
      {/* )} */}
    </styled.div>
  )
}
