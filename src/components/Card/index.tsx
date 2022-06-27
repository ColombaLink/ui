import React, { CSSProperties, FC, ReactNode } from 'react'
import { BasedIcon, CopyIcon, DotIcon, DuplicateIcon, MoreIcon } from '~/icons'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { Badge } from '../Badge'

type CardProps = {
  title?: string
  description?: string
  space?: Space
  style?: CSSProperties
  icon?: FC | ReactNode
}

export const Card: FC<CardProps> = ({
  title,
  description,
  space,
  style,
  icon,
}) => {
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
          {renderOrCreateElement(icon, {})}
        </Avatar>
        <div>
          <Text weight={600}>{title}</Text>
          <Text weight={400} size="13px" color="TextSecondary">
            {description}
          </Text>
        </div>
        <div
          style={{ position: 'absolute', right: 0, top: 4, cursor: 'pointer' }}
        >
          <MoreIcon />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Badge
          boxed
          light
          iconLeft={<CopyIcon style={{ marginRight: 8 }} />}
          style={{
            backgroundColor: color('ActionLight'),
          }}
        >
          <Text color="TextPrimary" size="13px">
            main
          </Text>
        </Badge>
        <Badge
          outline
          iconLeft={
            <DotIcon color="AccentGreen" size={10} style={{ marginRight: 8 }} />
          }
        >
          <Text color="TextPrimary" size="12px">
            Healthy
          </Text>
        </Badge>
      </div>
    </div>
  )
}
