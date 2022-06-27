import React, { CSSProperties, FC } from 'react'
import { BasedIcon, CopyIcon, DotIcon, DuplicateIcon, MoreIcon } from '~/icons'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'
import { Badge } from '../Badge'

type CardProps = {
  title?: string
  description?: string
  space?: Space
  style?: CSSProperties
}

export const Card: FC<CardProps> = ({ title, description, space, style }) => {
  return (
    <div
      style={{
        borderRadius: 8,
        padding: 16,
        backgroundColor: color('Background2dp'),
        border: `1px solid ${color('OtherDivider')}`,
        maxWidth: 302,
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <div style={{ display: 'flex', position: 'relative', marginBottom: 44 }}>
        <Avatar
          size="36px"
          backgroundColor="AccentGreenLight"
          style={{ marginRight: 12 }}
        >
          <BasedIcon color="AccentGreen" size={20} />
        </Avatar>
        <div>
          <Text weight={600}>{title}</Text>
          <Text weight={400} size="13px" color="TextSecondary">
            {description}
          </Text>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 4 }}>
          <MoreIcon />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Badge
          light
          iconLeft={CopyIcon({ size: 16, style: { marginRight: 8 } })}
        >
          main
        </Badge>
        <Badge
          outline
          iconLeft={DotIcon({
            color: 'AccentGreen',
            size: 10,
            style: { marginRight: 8 },
          })}
        >
          Healthy
        </Badge>
      </div>
    </div>
  )
}
