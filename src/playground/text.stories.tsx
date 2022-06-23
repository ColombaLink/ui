import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'

export const Typography = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '50% 1fr 1fr 1fr',
        maxWidth: 780,
      }}
    >
      <div>
        <Text>Token name</Text>
      </div>
      <div>
        <Text>Font size</Text>
      </div>
      <div>
        <Text>Theme-size</Text>
      </div>
      <div>
        <Text>Lineheight</Text>
      </div>

      <div>
        <Text size="xxl">Typography.title1</Text>
      </div>
      <div>
        <Text>Token name</Text>
      </div>

      <Text size="xl">Typography.title2</Text>
    </div>
  )
}
