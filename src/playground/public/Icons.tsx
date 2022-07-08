import React, { FC } from 'react'
import * as icons from '../../icons'
import { Text } from '../../'
import { getRandomIconName } from '../ComponentViewer/genRandomProps'
import ComponentViewer from '../ComponentViewer'
import { IconProps } from '~/components/Icon'

const Icon: FC<IconProps & { name?: string }> = ({ name, ...props }) => {
  if (!name) {
    name = getRandomIconName()
    return React.createElement(icons[name], props)
  }

  return (
    <div
      style={{
        width: 500,
        margin: 12,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: 64 + 12 }}>
        {React.createElement(icons[name], {
          ...props,
        })}
      </div>
      {React.createElement(icons[name], { size: 20, ...props })}
      <div
        style={{
          marginLeft: 64,
        }}
      >
        <Text selectable>{name}</Text>
      </div>
    </div>
  )
}

export const Icons = () => (
  <>
    <ComponentViewer component={Icon} propsName="IconProps" />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {Object.keys(icons).map((name, index) => (
        <Icon name={name} key={index} />
      ))}
    </div>
  </>
)
