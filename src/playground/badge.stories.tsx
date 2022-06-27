import React from 'react'
import { Provider } from '~'
import { Badge } from '~/components/Badge'
import { AddIcon, CloseIcon, DotIcon } from '~/icons'

export const Badges = () => {
  return (
    <Provider>
      <Badge>Badge</Badge>
      <br />
      <Badge iconLeft={AddIcon}>Icon Left</Badge>
      <br />
      <Badge
        iconLeft={DotIcon({
          color: 'AccentForestgreen',
          size: 10,
          style: { marginRight: 10 },
        })}
      >
        Icon Left
      </Badge>
      <br />
      <Badge iconRight={CloseIcon}>Icon Right</Badge>
      <br />
      <Badge light>Light</Badge>
      <br />
      <Badge outline>Outline</Badge>
      <br />
      <Badge boxed>Boxed</Badge>
    </Provider>
  )
}
