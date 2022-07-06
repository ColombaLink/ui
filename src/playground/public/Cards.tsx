import React from 'react'
import { Card } from '~/components/Card'
import { Avatar } from '~/components/Avatar'
import {
  DotIcon,
  BasedIcon,
  CopyIcon,
  MoreIcon,
  CalendarIcon,
  StackIcon,
} from '~'
import { Badge } from '~'
import { Thumbnail } from '~/components/Thumbnail'

export const Cards = () => {
  return (
    <>
      <Card
        title="Junior Eurovision 20222"
        description="Updated 30 minutes ago"
        topLeft={<Avatar icon={BasedIcon} color="PurpleBright" />}
        topRight={<MoreIcon />}
        bottomLeft={
          <Badge iconLeft={CopyIcon({ size: 14 })} boxed>
            main
          </Badge>
        }
        bottomRight={
          <Badge outline ghost iconLeft={<DotIcon color="Green" size={10} />}>
            Healthy
          </Badge>
        }
        space
      ></Card>
      <Card
        title="Tally "
        description="Updated 6 days ago"
        topLeft={<Avatar color="Green" icon={BasedIcon} />}
        topRight={<MoreIcon />}
        bottomLeft={
          <Badge iconLeft={CopyIcon({ size: 14 })} boxed>
            main
          </Badge>
        }
        bottomRight={
          <Badge
            outline
            ghost
            iconLeft={DotIcon({ size: 10, color: 'PurpleDark' })}
          >
            Deploying
          </Badge>
        }
        space
      ></Card>
      <Card
        small
        title="Card small"
        description="With description and topLeft"
        topLeft={<Thumbnail color="PurpleDark" icon={StackIcon} />}
        space
      ></Card>
      <Card
        small
        title="Date time"
        description="Date with time"
        topLeft={<Thumbnail color="Pink" icon={CalendarIcon} />}
      ></Card>
    </>
  )
}