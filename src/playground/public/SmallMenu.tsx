import React from 'react'
import { Avatar } from '~/components/Avatar'
import { MenuSmall } from '~/components/MenuSmall'
import { ScreenIcon, GearsIcon, SettingsIcon } from '~/icons'

export const SmallMenu = () => {
  const TallyLogoSmall = (
    <div style={{ maxWidth: 24 }}>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 260 260"
        width="100%"
        height="36px"
      >
        <defs>
          <linearGradient
            id="prefix__a"
            x1="16.44"
            y1="72.28"
            x2="187.65"
            y2="233.19"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#57adf5"></stop>
            <stop offset="0.17" stop-color="#60a4f5"></stop>
            <stop offset="0.46" stop-color="#788af5"></stop>
            <stop offset="0.82" stop-color="#9e61f6"></stop>
            <stop offset="0.97" stop-color="#af4ff6"></stop>
          </linearGradient>
          <linearGradient
            id="prefix__b"
            x1="154.77"
            y1="10.09"
            x2="248.36"
            y2="108.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#57adf5"></stop>
            <stop offset="0.18" stop-color="#60a4f5"></stop>
            <stop offset="0.48" stop-color="#788af5"></stop>
            <stop offset="0.85" stop-color="#9e61f6"></stop>
            <stop offset="1" stop-color="#af4ff6"></stop>
          </linearGradient>
        </defs>
        <path
          d="M239.77 213.28c10.67-10.67-23.9-62.53-77.21-115.84C126 60.88 90.12 33.13 67.74 22.75c-10.25-4.76-17.66-5.88-21-2.53a136.51 136.51 0 00193.03 193.06z"
          fill="url(#prefix__a)"
        ></path>
        <path
          d="M246.73 130a4.35 4.35 0 001-1.59 90.52 90.52 0 00-115.9-116.2h-.09l-.32.11h-.06a4.2 4.2 0 00-1.38.91c-7.06 7.07 13.34 38.93 45.58 71.16s64.11 52.67 71.17 45.61z"
          fill="url(#prefix__b)"
        ></path>
      </svg>
    </div>
  )

  return (
    <div>
      <MenuSmall
        logo={TallyLogoSmall}
        avatar={<Avatar size={24} color="accent" label="T" />}
        data={[
          {
            icon: <ScreenIcon />,
            label: 'Shows',
            href: '?story=tally-screens',
            isActive: true,
          },
          {
            icon: <GearsIcon />,
            label: 'Settings',
            href: '?story=tally-screens',
          },
        ]}
      />

      {/* <Sidebar
        data={[
          {
            href: '?story=tally-screens',
            icon: <ScreenIcon />,
          },
          {
            href: '?story=tally-screens',
            icon: <SettingsIcon />,
          },
          {
            href: '?story=tally-screens',
            icon: <GearsIcon />,
          },
        ]}
      /> */}
    </div>
  )
}
