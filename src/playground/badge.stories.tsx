import React from 'react'
import { Provider } from '~'
import { Badge } from '~/components/Badge'
import { AddIcon, CheckCircleIcon, CloseIcon, DotIcon } from '~/icons'

export const Badges = () => {
  return (
    <Provider>
      <Badge>Badge</Badge>
      <br />
      <Badge color="Orange">Light</Badge>
      <br />
      <Badge backgroundColor="PurpleDark" foregroundColor="WhiteWhite100">
        Snurpy
      </Badge>
      <br />
      <Badge ghost outline>
        Ghost Outline
      </Badge>
      <br />

      <Badge iconLeft={DotIcon}>Icon Left</Badge>
      <br />
      <Badge color="PurpleDark" iconRight={CloseIcon}>
        Icon Right
      </Badge>
      <br />

      <Badge
        outline
        outlineColor="Green"
        color="PurpleBright"
        foregroundColor="Red"
        iconRight={CheckCircleIcon({ color: 'Blue500' })}
      >
        Outline
      </Badge>
      <br />
      <Badge boxed>Boxed</Badge>
      <br />
      <Badge boxed outline ghost>
        Boxed
      </Badge>
      <br />
      <Badge outline ghost iconLeft={<DotIcon size={10} />}>
        outline ghost iconleft
      </Badge>
      <br />
      <Badge boxed outline ghost iconRight={CheckCircleIcon}>
        Boxed
      </Badge>
      <br />
      <Badge>Action</Badge>
      <br />
      <Badge color="Pink">Action Light</Badge>
      <br />
      <Badge boxed outline>
        Action Light boxed outline
      </Badge>
      <br />
    </Provider>
  )
}
