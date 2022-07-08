import React, { FC } from 'react'
import * as icons from '../../icons'
import { Text, copyToClipboard, color } from '../../'
import { getRandomIconName } from '../ComponentViewer/genRandomProps'
import ComponentViewer from '../ComponentViewer'
import { IconProps } from '~/components/Icon'
import { styled } from 'inlines'

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
      <styled.div
        onClick={() => {
          copyToClipboard(name)
        }}
        style={{
          cursor: 'pointer',
          marginLeft: 64,
          ':hover': {
            opacity: 0.7,
            // color: color('BlueBaby'),
          },
        }}
      >
        <Text color="inherit">{name}</Text>
      </styled.div>
    </div>
  )
}

const codeExample = `import { BasedIcon } from '@based/ui'
<BasedIcon color="PrimaryMain" size={32}/>`

export const Icons = () => (
  <>
    <ComponentViewer
      component={Icon}
      propsName="IconProps"
      examples={[
        {
          code: codeExample,
        },
      ]}
    />
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
