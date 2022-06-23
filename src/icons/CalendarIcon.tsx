import React from 'react'
import { Color } from '~/types'
import { color } from '~/utils'

type CalendarIconProps = React.SVGProps<SVGSVGElement> & {
  color?: Color | string

  size?: number
}

export const CalendarIcon = ({
  color: colorProp = 'currentColor',

  size = 20,
  ...props
}: CalendarIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M3.83593 18H16.1731C18.0607 18 19 17.0961 19 15.3058V4.69419C19 2.90386 18.0607 2 16.1731 2H3.83593C1.94832 2 1 2.89517 1 4.69419V15.3058C1 17.1048 1.94832 18 3.83593 18ZM3.70045 16.6008C2.89664 16.6008 2.45409 16.1923 2.45409 15.384V7.18848C2.45409 6.38892 2.89664 5.97175 3.70045 5.97175H16.2905C17.0943 5.97175 17.5459 6.38892 17.5459 7.18848V15.384C17.5459 16.1923 17.0943 16.6008 16.2905 16.6008H3.70045ZM8.23432 9.0918H8.76719C9.08329 9.0918 9.19167 9.00489 9.19167 8.70071V8.18794C9.19167 7.88376 9.08329 7.78816 8.76719 7.78816H8.23432C7.91821 7.78816 7.80983 7.88376 7.80983 8.18794V8.70071C7.80983 9.00489 7.91821 9.0918 8.23432 9.0918ZM11.2418 9.0918H11.7657C12.0818 9.0918 12.1902 9.00489 12.1902 8.70071V8.18794C12.1902 7.88376 12.0818 7.78816 11.7657 7.78816H11.2418C10.9167 7.78816 10.8174 7.88376 10.8174 8.18794V8.70071C10.8174 9.00489 10.9167 9.0918 11.2418 9.0918ZM14.2403 9.0918H14.7732C15.0893 9.0918 15.1887 9.00489 15.1887 8.70071V8.18794C15.1887 7.88376 15.0893 7.78816 14.7732 7.78816H14.2403C13.9242 7.78816 13.8159 7.88376 13.8159 8.18794V8.70071C13.8159 9.00489 13.9242 9.0918 14.2403 9.0918ZM5.23583 11.9337H5.76869C6.0848 11.9337 6.18414 11.8468 6.18414 11.5426V11.0299C6.18414 10.7257 6.0848 10.6388 5.76869 10.6388H5.23583C4.91972 10.6388 4.81134 10.7257 4.81134 11.0299V11.5426C4.81134 11.8468 4.91972 11.9337 5.23583 11.9337ZM8.23432 11.9337H8.76719C9.08329 11.9337 9.19167 11.8468 9.19167 11.5426V11.0299C9.19167 10.7257 9.08329 10.6388 8.76719 10.6388H8.23432C7.91821 10.6388 7.80983 10.7257 7.80983 11.0299V11.5426C7.80983 11.8468 7.91821 11.9337 8.23432 11.9337ZM11.2418 11.9337H11.7657C12.0818 11.9337 12.1902 11.8468 12.1902 11.5426V11.0299C12.1902 10.7257 12.0818 10.6388 11.7657 10.6388H11.2418C10.9167 10.6388 10.8174 10.7257 10.8174 11.0299V11.5426C10.8174 11.8468 10.9167 11.9337 11.2418 11.9337ZM14.2403 11.9337H14.7732C15.0893 11.9337 15.1887 11.8468 15.1887 11.5426V11.0299C15.1887 10.7257 15.0893 10.6388 14.7732 10.6388H14.2403C13.9242 10.6388 13.8159 10.7257 13.8159 11.0299V11.5426C13.8159 11.8468 13.9242 11.9337 14.2403 11.9337ZM5.23583 14.7844H5.76869C6.0848 14.7844 6.18414 14.6888 6.18414 14.3846V13.8718C6.18414 13.5676 6.0848 13.4807 5.76869 13.4807H5.23583C4.91972 13.4807 4.81134 13.5676 4.81134 13.8718V14.3846C4.81134 14.6888 4.91972 14.7844 5.23583 14.7844ZM8.23432 14.7844H8.76719C9.08329 14.7844 9.19167 14.6888 9.19167 14.3846V13.8718C9.19167 13.5676 9.08329 13.4807 8.76719 13.4807H8.23432C7.91821 13.4807 7.80983 13.5676 7.80983 13.8718V14.3846C7.80983 14.6888 7.91821 14.7844 8.23432 14.7844ZM11.2418 14.7844H11.7657C12.0818 14.7844 12.1902 14.6888 12.1902 14.3846V13.8718C12.1902 13.5676 12.0818 13.4807 11.7657 13.4807H11.2418C10.9167 13.4807 10.8174 13.5676 10.8174 13.8718V14.3846C10.8174 14.6888 10.9167 14.7844 11.2418 14.7844Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
