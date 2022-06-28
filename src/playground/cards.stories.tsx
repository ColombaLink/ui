import React from 'react'
import { Card } from '~/components/Card'
import { Provider } from '~'
import { Avatar } from '~/components/Avatar'
import { Badge } from '~/components/Badge'
import { DotIcon, BasedIcon, CopyIcon, MoreIcon } from '~'
import { color } from '~/utils'
import { Text } from '~/components/Text'

export const Cards = () => {
  return (
    <Provider>
      <Card
        title="Junior Eurovision 20222"
        description="Updated 30 minutes ago"
        TopLeft={<Avatar icon={BasedIcon} color="AccentBrightpurple" />}
        TopRight={<MoreIcon />}
        BottomLeft={
          <Badge iconLeft={CopyIcon({ size: 14 })} boxed action light>
            main
          </Badge>
        }
        BottomRight={
          <Badge
            outline
            ghost
            iconLeft={<DotIcon color="AccentGreen" size={10} />}
          >
            Healthy
          </Badge>
        }
        space
      ></Card>

      <Card
        title="Tally "
        description="Updated 6 days ago"
        TopLeft={<Avatar color="AccentGreen" icon={BasedIcon} />}
        TopRight={<MoreIcon />}
        BottomLeft={
          <Badge iconLeft={CopyIcon({ size: 14 })} boxed action light>
            main
          </Badge>
        }
        BottomRight={
          <Badge
            outline
            ghost
            iconLeft={DotIcon({ size: 10, color: 'AccentDarkpurple' })}
          >
            Deploying
          </Badge>
        }
        space
      ></Card>
    </Provider>
  )
}
