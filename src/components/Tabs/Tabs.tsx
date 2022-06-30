import React, { FC, ReactNode, CSSProperties, useState } from 'react'
import { color, font } from '~/utils'
import { styled } from 'inlines'
import { Text } from '../Text'

type TabsProps = {
  children?: FC | ReactNode
  style?: CSSProperties
  isActive?: boolean
}

export const Tabs: FC<TabsProps> = ({ children, style, isActive }) => {
  const [activeTab, setActiveTab] = useState(null)

  const arrayChildren = React.Children.toArray(children)

  console.log(arrayChildren)

  const activeTabHandler = (index: number) => {
    console.log('On click =>', index)
    console.log('dat is: ', arrayChildren[index].props.title)
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          height: '100%',
          marginLeft: 32,
        }}
      >
        <div
          //href={href}
          style={{
            height: 66,
            marginTop: 20,
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {arrayChildren.map((child, index) => (
            <styled.div
              style={{
                height: 66,
                borderRadius: 4,
                padding: '12px 24px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'yellow',
                '&:hover': {
                  backgroundColor: color('PrimaryLightHover'),
                },
                borderBottom: `3px solid ${
                  isActive ? color('TextPrimary') : 'transparent'
                }`,
                ...(isActive
                  ? font(15, 'TextPrimary', 600)
                  : font(15, 'TextSecondary')),
              }}
            >
              <div key={index} onClick={(child) => activeTabHandler(index)}>
                {child.props.title}
              </div>
            </styled.div>
          ))}
        </div>

        <div>
          {/* filter the active id */}
          {arrayChildren
            .filter((child) => child.props.isActive)
            .map(
              (filteredTab) => (
                console.log(filteredTab),
                (
                  <div key={filteredTab.props.title}>
                    {filteredTab.props.children}
                  </div>
                )
              )
            )}
        </div>
      </div>
    </>
  )
}
