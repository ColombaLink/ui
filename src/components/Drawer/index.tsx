import React, { CSSProperties, ReactNode } from 'react'
import { Text } from '../Text'
import { CloseIcon, MoreIcon } from '~/icons'
import { color } from '~/utils'
export type DrawerProps = {
  label?: string
  children?: ReactNode | ReactNode[]
  isRendered?: boolean
  sidebar?: boolean
  sidebarElem?: ReactNode | ReactNode[]
  noBoxShadow?: boolean
  width?: string | number
  height?: string | number
  closeFunc?: any
  style?: CSSProperties
  fullscreen?: boolean
}

export const Drawer = ({
  label,
  children,
  isRendered,
  sidebar,
  sidebarElem,
  noBoxShadow,
  width,
  height,
  closeFunc,
  style,
  fullscreen,
}: DrawerProps) => {
  if (!isRendered) return null
  else
    return (
      <div>
        <div
          style={
            fullscreen
              ? {
                  position: 'absolute',
                  right: 0,
                  left: 0,
                  bottom: 0,
                  top: 0,
                  margin: 'auto',
                  minHeight: '300px',
                  height: 'calc(100vh)',
                  width: 'calc(100vw )',
                  backgroundColor: noBoxShadow ? '' : 'rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                }
              : {
                  // marginTop: '20px',
                  paddingTop: '20px',
                  display: 'flex',
                  // backgroundColor: noBoxShadow ? '' : 'rgba(0, 0, 0, 0.12)',
                }
          }
        >
          <div
            style={{
              margin: 'auto',
              height: height ?? 'calc(100% - 20px)',
              width: width ?? 'calc(100% - 20px)',
              flexDirection: 'column',
              backgroundColor: color('background'),
              boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.24)',
              zIndex: '10',
              overflow: 'auto',
              ...style,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '7.5%',
                alignItems: 'center',
                width: '100%',
                borderBottom: `1px solid ${color('accent:border')}`,
                // borderBottom: '1px solid red',
              }}
            >
              <div style={{ width: '92.5%', marginLeft: '20px' }}>
                <Text weight={600} size={18}>
                  {label}
                </Text>
              </div>
              <div
                style={{
                  width: '7.5%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <MoreIcon style={{ cursor: 'pointer' }} size={24} />
                <CloseIcon
                  size={24}
                  onClick={closeFunc}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '92.5%',
              }}
            >
              <div
                style={{ width: sidebar ? '76%' : '100%', marginTop: '20px' }}
              >
                {children}
              </div>
              {sidebar && (
                <div
                  style={{
                    width: '26%',
                    backgroundColor: color('background2'),
                    borderLeft: `1px solid ${color('accent:border')}`,
                  }}
                >
                  {sidebarElem}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}
