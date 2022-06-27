import React, { FC } from 'react'
import { Color, Space } from '~/types'
import { color } from '~/utils'

type AvatarProps = {
  size?: 32 | 40 | 64 | '32px' | '40px' | '64px'
  backgroundImg?: string
  children?: React.ReactNode
  space?: Space
}

export const Avatar: FC<AvatarProps> = ({
  size,
  backgroundImg,
  children,
  space,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color('PrimaryMain'),
        backgroundImage: backgroundImg ? `url(${backgroundImg})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        //  marginBottom: space,
      }}
    >
      {children}
    </div>
  )
}
