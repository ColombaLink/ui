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
import { Badge, Spacer } from '~'
import { Thumbnail } from '~/components/Thumbnail'
import ComponentViewer from '../ComponentViewer'

export const Cards = () => {
  return (
    <>
      <ComponentViewer
        component={Card}
        propsName="CardProps"
        examples={[
          {
            props: {
              label: 'Junior Eurovision 20222',
              description: 'Updated 30 minutes ago',
              topLeft: <Avatar icon={BasedIcon} color="red" />,
              topRight: <MoreIcon />,
              children: <Spacer space="28px" />,
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
    </>
  )
}
