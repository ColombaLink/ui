import React, {
  FC,
  ReactNode,
  CSSProperties,
  useState,
  ReactChild,
} from 'react'
import { color, spaceToPx, font } from '~/utils'
import { styled } from 'inlines'
import { Space } from '~/types'

type TabsProps = {
  children?: FC | ReactNode | ReactChild
  style?: CSSProperties
  space?: Space
  small?: boolean
}

export const Tabs: FC<TabsProps> = ({ children, style, space = 0, small }) => {
  const arrayChildren: Object[] = React.Children.toArray(children)

  const [activeTab, setActiveTab] = useState(0)

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
            alignItems: 'center',
            display: 'flex',
            borderBottom: `1px solid ${color('OtherDivider')}`,
            marginBottom: spaceToPx(space),
            ...style,
          }}
        >
          {arrayChildren.map((child: JSX.Element, index) => (
            <styled.div
              style={{
                borderTop: '1px solid transparent',

                height: small ? 42 : 66,
                // borderTopRightRadius: 4,
                // borderTopLeftRadius: 4,
                padding: small ? '8px 24px 12px 24px' : '12px 24px',
                display: 'flex',
                alignItems: 'center',

                '&:hover': {
                  borderTop: '1px solid ' + color('OtherInputBorderDefault'),
                  backgroundColor: color('PrimaryLightHover', 0.1),
                  cursor: 'pointer',
                },
                borderBottom: `3px solid ${
                  index === activeTab ? color('TextPrimary') : 'transparent'
                }`,
                ...(index === activeTab
                  ? font(15, 'TextPrimary', 600)
                  : font(15, 'TextSecondary')),
              }}
              onClick={() => setActiveTab(index)}
              key={index}
            >
              {/*@ts-ignore */}
              {child.props.title}
            </styled.div>
          ))}
        </div>

        <div>{children[activeTab]}</div>
      </div>
    </>
  )
}
