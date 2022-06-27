import React, { CSSProperties, FC, ReactNode } from 'react'
import { BasedIcon, CopyIcon, DotIcon, DuplicateIcon, MoreIcon } from '~/icons'
import { Avatar } from '../Avatar'
import { Text } from '../Text'
import { Space, Color } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { Badge } from '../Badge'

type CardProps = {
  title?: string
  description?: string
  space?: Space
  style?: CSSProperties
  iconTopLeft?: FC | ReactNode
  iconTopRight?: FC | ReactNode
  badgeBottomRight?: FC | ReactNode
  badgeBottomLeft?: FC | ReactNode
  children?: FC | ReactNode
}

export const Card: FC<CardProps> = ({
  title,
  description,
  space,
  style,
  iconTopLeft,
  iconTopRight,
  badgeBottomLeft,
  badgeBottomRight,
  children,
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
        <>{iconTopLeft}</>

        <div>
          <Text weight={600}>{title}</Text>
          <Text weight={400} size="13px" color="TextSecondary">
            {description}
          </Text>
        </div>
        <div
          style={{ position: 'absolute', right: 0, top: 4, cursor: 'pointer' }}
        >
          <>{iconTopRight}</>
        </div>
      </div>

      <div>
        <>{children}</>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <>{badgeBottomLeft}</>
        <>{badgeBottomRight}</>
      </div>
    </div>
  )
}
