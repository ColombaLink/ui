import React from 'react'
import { Card as CardComponent } from '~/components/Card'
import { Avatar } from '~/components/Avatar'
import {
  DotIcon,
  BasedIcon,
  CopyIcon,
  MoreIcon,
  StackIcon,
  Badge,
  Spacer,
} from '~'
import { Thumbnail } from '~/components/Thumbnail'
import ComponentViewer from '../ComponentViewer'

export const Card = () => {
  return (
    <ComponentViewer
      component={CardComponent}
      propsName="CardProps"
      examples={[
        {
          props: {
            label: 'Junior Eurovision 20222',
            description: 'Updated 30 minutes ago',
            topLeft: <Avatar icon={BasedIcon} color="red" />,
            topRight: <MoreIcon />,
            children: <Spacer style={{ marginBottom: 28 }} />,
            bottomLeft: (
              <Badge icon={CopyIcon({ size: 14 })} boxed>
                main
              </Badge>
            ),
            bottomRight: (
              <Badge outline ghost icon={<DotIcon color="green" size={10} />}>
                Healthy
              </Badge>
            ),
          },
        },
        {
          props: {
            small: true,
            label: 'Card small',
            description: 'With description and topLeft',
            topLeft: <Thumbnail color="babyblue" icon={StackIcon} />,
          },
        },
      ]}
    />
  )
}
