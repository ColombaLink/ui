import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'

export const Typography = () => {
  return (
    <Provider>
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
          <Text size="xxxl" weight={700}>
            Typography.title1
          </Text>
        </div>
        <div>
          <Text>32px</Text>
        </div>
        <div>
          <Text>xxxl</Text>
        </div>
        <div>
          <Text>32</Text>
        </div>

        <div>
          <Text size="xxl" weight={600}>
            Typography.title2
          </Text>
        </div>
        <div>
          <Text>24px</Text>
        </div>
        <div>
          <Text>xxl</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="xl">Typography.title3</Text>
        </div>
        <div>
          <Text>20px</Text>
        </div>
        <div>
          <Text>xl</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="lg">Typography.subtitle1</Text>
        </div>
        <div>
          <Text>18px</Text>
        </div>
        <div>
          <Text>lg</Text>
        </div>
        <div>
          <Text>32</Text>
        </div>

        <div>
          <Text size="md">Typography.body-semibold</Text>
        </div>
        <div>
          <Text>15px</Text>
        </div>
        <div>
          <Text>md | default</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="md">Typography.body-medium</Text>
        </div>
        <div>
          <Text>15px</Text>
        </div>
        <div>
          <Text>md | default</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="md">Typography.body-regular</Text>
        </div>
        <div>
          <Text>15px</Text>
        </div>
        <div>
          <Text>md | default</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="md" italic>
            Typography.body-regular-italic
          </Text>
        </div>
        <div>
          <Text>15px</Text>
        </div>
        <div>
          <Text>md | default</Text>
        </div>
        <div>
          <Text>24</Text>
        </div>

        <div>
          <Text size="sm">Typography.caption1</Text>
        </div>
        <div>
          <Text>14px</Text>
        </div>
        <div>
          <Text>sm</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="sm">Typography.subtext1</Text>
        </div>
        <div>
          <Text>14px</Text>
        </div>
        <div>
          <Text>sm</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xs">Typography.caption2</Text>
        </div>
        <div>
          <Text>13px</Text>
        </div>
        <div>
          <Text>xs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xs">Typography.subtext2</Text>
        </div>
        <div>
          <Text>13px</Text>
        </div>
        <div>
          <Text>xs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xxs">Typography.caption3</Text>
        </div>
        <div>
          <Text>12px</Text>
        </div>
        <div>
          <Text>xxs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xxs">Typography.subtext3</Text>
        </div>
        <div>
          <Text>12px</Text>
        </div>
        <div>
          <Text>xxs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xxxs">Typography.caption4</Text>
        </div>
        <div>
          <Text>11px</Text>
        </div>
        <div>
          <Text>xxxs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        <div>
          <Text size="xxxs">Typography.subtext4</Text>
        </div>
        <div>
          <Text>11px</Text>
        </div>
        <div>
          <Text>xxxs</Text>
        </div>
        <div>
          <Text>16</Text>
        </div>

        {/* ending div */}
      </div>
    </Provider>
  )
}
