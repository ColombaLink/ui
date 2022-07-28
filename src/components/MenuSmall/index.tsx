import React, { FC, ReactNode, CSSProperties } from 'react'
import { color } from '~/utils'
import { Logo } from '~/components/Logo'
import { Avatar } from '~/components/Avatar'
import { styled } from 'inlines'
import { Button } from '../Button'
import { Link } from '../Link'

type MenuSmallProps = {
  data: [
    {
      icon: ReactNode
      label: string
      href: string
    }
  ]
  logo?: ReactNode
  avatar?: ReactNode
  style?: CSSProperties
}

export const MenuSmall: FC<MenuSmallProps> = ({
  data,
  logo,
  avatar,
  style,
  ...props
}) => {
  // tooltip

  console.log(data.map((item, idx) => item))

  return (
    <div
      style={{
        width: 48,
        minWidth: 48,
        height: '100%',
        display: 'flex',
        minHeight: 600,
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: `1px solid ${color('border')}`,
        backgroundColor: color('background2'),
        ...style,
      }}
      {...props}
    >
      <div style={{ padding: 8, paddingBottom: 40 }}>
        {logo ? logo : <Logo />}
      </div>

      <div style={{ flexGrow: 1, padding: 8 }}>
        {data.map((item, idx) => (
          <Link key={idx} href={item.href}>
            <Button
              color="text"
              ghost
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 8,
              }}
              icon={item.icon}
              onClick={() => console.log('clickie' + item.href + item.label)}
            />
          </Link>
        ))}

        <Link href="?story=tally-screens">blha</Link>
      </div>

      <styled.div
        style={{
          flexGrow: 0,
          marginBottom: 8,
          width: '100%',
          padding: '8px ',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: color('border'),
          },
        }}
      >
        {avatar ? avatar : <Avatar size="24px" label="YB" />}
      </styled.div>
    </div>
  )
}
