import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const ListIcon = ({
  color: colorProp = 'currentColor',
  size = 20,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M1.89453 6.55811H3.36426C3.89404 6.55811 4.33838 6.12231 4.33838 5.58398C4.33838 5.04565 3.89404 4.60986 3.36426 4.60986H1.89453C1.36475 4.60986 0.928955 5.04565 0.928955 5.58398C0.928955 6.12231 1.36475 6.55811 1.89453 6.55811ZM6.97876 6.4043H17.7625C18.2239 6.4043 18.5913 6.04541 18.5913 5.58398C18.5913 5.12256 18.2324 4.76367 17.7625 4.76367H6.97876C6.51733 4.76367 6.15845 5.12256 6.15845 5.58398C6.15845 6.04541 6.51733 6.4043 6.97876 6.4043ZM1.89453 11.8132H3.36426C3.89404 11.8132 4.33838 11.3774 4.33838 10.8391C4.33838 10.3008 3.89404 9.86499 3.36426 9.86499H1.89453C1.36475 9.86499 0.928955 10.3008 0.928955 10.8391C0.928955 11.3774 1.36475 11.8132 1.89453 11.8132ZM6.97876 11.6594H17.7625C18.2239 11.6594 18.5913 11.3005 18.5913 10.8391C18.5913 10.3777 18.2324 10.0188 17.7625 10.0188H6.97876C6.51733 10.0188 6.15845 10.3777 6.15845 10.8391C6.15845 11.3005 6.51733 11.6594 6.97876 11.6594ZM1.89453 17.0684H3.36426C3.89404 17.0684 4.33838 16.6326 4.33838 16.0942C4.33838 15.5559 3.89404 15.1201 3.36426 15.1201H1.89453C1.36475 15.1201 0.928955 15.5559 0.928955 16.0942C0.928955 16.6326 1.36475 17.0684 1.89453 17.0684ZM6.97876 16.9146H17.7625C18.2239 16.9146 18.5913 16.5557 18.5913 16.0942C18.5913 15.6328 18.2324 15.2739 17.7625 15.2739H6.97876C6.51733 15.2739 6.15845 15.6328 6.15845 16.0942C6.15845 16.5557 6.51733 16.9146 6.97876 16.9146Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
