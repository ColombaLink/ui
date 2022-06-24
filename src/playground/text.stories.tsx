import React from 'react'
import { Provider } from '~'
import { Text } from '~/components/Text'
import { styled } from 'inlines'

export const Typography = () => {
  return (
    <Provider>
      <styled.div
        style={{
          display: 'grid',
          gridTemplateColumns: '45% 1fr 1fr 1fr 1fr',
          gridGap: '8px',
          alignItems: 'center',
          justifySelf: 'stretch',
          maxWidth: 780,
          textAlign: 'center',
          'div > *': {
            padding: '5px 0px',
          },
          '& div': {},
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <Text weight="500">Token name</Text>
        </div>
        <div>
          <Text weight="500">Font size</Text>
        </div>
        <div>
          <Text weight="500">Theme-size</Text>
        </div>
        <div>
          <Text weight="500">Lineheight</Text>
        </div>
        <div>
          <Text weight="500">Weight</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="32">Typography.title1</Text>
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
          <Text>700</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="24">Typography.title2</Text>
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
          <Text>600</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="20">Typography.title3</Text>
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
          <Text>600</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="18">Typography.subtitle1</Text>
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="15" weight="600">
            Typography.body-semibold
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
          <Text>600</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="15">Typography.body-medium</Text>
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
          <Text>500</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="15" weight="400">
            Typography.body-regular
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="15" weight="400" italic>
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="14">Typography.caption1</Text>
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
          <Text>500</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="14" weight="400">
            Typography.subtext1
          </Text>
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="13">Typography.caption2</Text>
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
          <Text>500</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="13" weight="400">
            Typography.subtext2
          </Text>
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="12">Typography.caption3</Text>
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
          <Text>500</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="12" weight="400">
            Typography.subtext3
          </Text>
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
          <Text>400</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="11">Typography.caption4</Text>
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
          <Text>500</Text>
        </div>

        <div style={{ textAlign: 'left' }}>
          <Text size="11" weight="400">
            Typography.subtext4
          </Text>
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
          <Text>400</Text>
        </div>

        {/* ending div */}
      </styled.div>
    </Provider>
  )
}
