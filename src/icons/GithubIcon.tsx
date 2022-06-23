import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type GithubIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color

  size?: number
}

export const GithubIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: GithubIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M6.68952 15.6863C6.68952 15.7668 6.59677 15.8313 6.47984 15.8313C6.34677 15.8434 6.25403 15.7789 6.25403 15.6863C6.25403 15.6057 6.34677 15.5413 6.46371 15.5413C6.58468 15.5292 6.68952 15.5936 6.68952 15.6863ZM5.43548 15.505C5.40726 15.5856 5.4879 15.6782 5.60887 15.7024C5.71371 15.7427 5.83468 15.7024 5.85887 15.6218C5.88306 15.5413 5.80645 15.4486 5.68548 15.4124C5.58065 15.3842 5.46371 15.4244 5.43548 15.505ZM7.21774 15.4365C7.10081 15.4647 7.02016 15.5413 7.03226 15.6339C7.04435 15.7145 7.14919 15.7668 7.27016 15.7386C7.3871 15.7105 7.46774 15.6339 7.45564 15.5533C7.44355 15.4768 7.33468 15.4244 7.21774 15.4365ZM9.87097 0C4.27823 0 0 4.24182 0 9.8291C0 14.2965 2.81452 18.1194 6.83468 19.4648C7.35081 19.5575 7.53226 19.2393 7.53226 18.9774C7.53226 18.7277 7.52016 17.35 7.52016 16.504C7.52016 16.504 4.69758 17.1083 4.10484 15.3036C4.10484 15.3036 3.64516 14.1313 2.98387 13.8292C2.98387 13.8292 2.06048 13.1968 3.04839 13.2089C3.04839 13.2089 4.05242 13.2894 4.60484 14.2482C5.4879 15.8031 6.96774 15.356 7.54435 15.0901C7.6371 14.4456 7.89919 13.9984 8.18952 13.7325C5.93548 13.4828 3.66129 13.1565 3.66129 9.28125C3.66129 8.17346 3.96774 7.61755 4.6129 6.90857C4.50806 6.64673 4.16532 5.56714 4.71774 4.17334C5.56048 3.9115 7.5 5.26099 7.5 5.26099C8.30645 5.0354 9.17339 4.91858 10.0323 4.91858C10.8911 4.91858 11.7581 5.0354 12.5645 5.26099C12.5645 5.26099 14.504 3.90747 15.3468 4.17334C15.8992 5.57117 15.5565 6.64673 15.4516 6.90857C16.0968 7.62158 16.4919 8.17749 16.4919 9.28125C16.4919 13.1686 14.1169 13.4788 11.8629 13.7325C12.2339 14.0508 12.5484 14.655 12.5484 15.6017C12.5484 16.9592 12.5363 18.639 12.5363 18.9694C12.5363 19.2312 12.7218 19.5494 13.2339 19.4568C17.2661 18.1194 20 14.2965 20 9.8291C20 4.24182 15.4637 0 9.87097 0ZM3.91935 13.8937C3.86694 13.934 3.87903 14.0266 3.94758 14.1031C4.0121 14.1676 4.10484 14.1958 4.15726 14.1434C4.20968 14.1031 4.19758 14.0105 4.12903 13.934C4.06452 13.8695 3.97177 13.8413 3.91935 13.8937ZM3.48387 13.5674C3.45565 13.6198 3.49597 13.6842 3.57661 13.7245C3.64113 13.7648 3.72177 13.7527 3.75 13.6963C3.77823 13.6439 3.7379 13.5795 3.65726 13.5392C3.57661 13.515 3.5121 13.5271 3.48387 13.5674ZM4.79032 15.0015C4.72581 15.0538 4.75 15.1747 4.84274 15.2512C4.93548 15.3439 5.05242 15.356 5.10484 15.2915C5.15726 15.2391 5.13306 15.1183 5.05242 15.0417C4.96371 14.9491 4.84274 14.937 4.79032 15.0015ZM4.33065 14.4093C4.26613 14.4496 4.26613 14.5543 4.33065 14.647C4.39516 14.7396 4.50403 14.7799 4.55645 14.7396C4.62097 14.6873 4.62097 14.5825 4.55645 14.4899C4.5 14.3972 4.39516 14.3569 4.33065 14.4093Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
