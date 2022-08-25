import React from 'react'
import { Sidebar, ScreenIcon, GearsIcon, Avatar } from '~'

export const SideBar = () => {
  return (
    <>
      <Sidebar
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 48,
        }}
        data={[
          {
            icon: <ScreenIcon />,
            label: 'Shows',
            href: '/shows',
          },
          {
            icon: <GearsIcon />,
            label: 'Settings',
            href: '/settings',
          },
        ]}
        logo={<a href="?story=tally-screens">{TallyLogo}</a>}
        avatar={<Avatar size={24} label="Tally" />}
      />
    </>
  )
}

const TallyLogo = (
  <div style={{ maxWidth: 24 }}>
    <svg data-name="Layer 1" viewBox="0 0 260 260" width="100%" height="36px">
      <defs>
        <linearGradient
          id="prefix__a"
          x1="16.44"
          y1="72.28"
          x2="187.65"
          y2="233.19"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57adf5"></stop>
          <stop offset="0.17" stopColor="#60a4f5"></stop>
          <stop offset="0.46" stopColor="#788af5"></stop>
          <stop offset="0.82" stopColor="#9e61f6"></stop>
          <stop offset="0.97" stopColor="#af4ff6"></stop>
        </linearGradient>
        <linearGradient
          id="prefix__b"
          x1="154.77"
          y1="10.09"
          x2="248.36"
          y2="108.55"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57adf5"></stop>
          <stop offset="0.18" stopColor="#60a4f5"></stop>
          <stop offset="0.48" stopColor="#788af5"></stop>
          <stop offset="0.85" stopColor="#9e61f6"></stop>
          <stop offset="1" stopColor="#af4ff6"></stop>
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
