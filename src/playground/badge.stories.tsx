import React from 'react'
import { Provider } from '~'
import { Badge } from '~/components/Badge'
import { AddIcon, CloseIcon, DotIcon } from '~/icons'

export const Badges = () => {
  return (
    <Provider>
      <Badge>Badge</Badge>
      <br />
      <Badge light>Light</Badge>
      <br />
      <Badge ghost>Ghost</Badge>
      <br />
      <Badge ghost outline>
        Ghost Outline
      </Badge>
      <br />

      <Badge iconLeft={<DotIcon color="AccentGreenForest" size={10} />}>
        Icon Left
      </Badge>
      <br />
      <Badge iconRight={<CloseIcon color="Background0dp" />}>Icon Right</Badge>
      <br />

      <Badge outline>Outline</Badge>
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
      <Badge
        boxed
        outline
        ghost
        iconRight={<DotIcon size={10} color="AccentPurpleBright" />}
      >
        Boxed
      </Badge>
      <br />
      <Badge action>Action</Badge>
      <br />
      <Badge action light>
        Action Light
      </Badge>
      <br />
      <Badge action light boxed outline>
        Action Light boxed outline
      </Badge>
      <br />
    </Provider>
  )
}
