import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const CalculatorIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.26685 0.522841C3.81978 0.342619 5.3992 0.25 7 0.25C8.6008 0.25 10.1802 0.342619 11.7332 0.522841C12.981 0.667655 13.875 1.73935 13.875 2.96416V15.25C13.875 16.6307 12.7557 17.75 11.375 17.75H2.625C1.24429 17.75 0.125 16.6307 0.125 15.25V2.96416C0.125 1.73935 1.01903 0.667655 2.26685 0.522841ZM3.25 8.375C3.25 8.02982 3.52982 7.75 3.875 7.75H3.88125C4.22643 7.75 4.50625 8.02982 4.50625 8.375V8.38125C4.50625 8.72643 4.22643 9.00625 3.88125 9.00625H3.875C3.52982 9.00625 3.25 8.72643 3.25 8.38125V8.375ZM3.875 9.625C3.52982 9.625 3.25 9.90482 3.25 10.25V10.2563C3.25 10.6014 3.52982 10.8813 3.875 10.8813H3.88125C4.22643 10.8813 4.50625 10.6014 4.50625 10.2563V10.25C4.50625 9.90482 4.22643 9.625 3.88125 9.625H3.875ZM3.25 12.125C3.25 11.7798 3.52982 11.5 3.875 11.5H3.88125C4.22643 11.5 4.50625 11.7798 4.50625 12.125V12.1313C4.50625 12.4764 4.22643 12.7563 3.88125 12.7563H3.875C3.52982 12.7563 3.25 12.4764 3.25 12.1313V12.125ZM3.875 13.375C3.52982 13.375 3.25 13.6548 3.25 14V14.0063C3.25 14.3514 3.52982 14.6313 3.875 14.6313H3.88125C4.22643 14.6313 4.50625 14.3514 4.50625 14.0063V14C4.50625 13.6548 4.22643 13.375 3.88125 13.375H3.875ZM5.3313 8.375C5.3313 8.02982 5.61112 7.75 5.9563 7.75H5.96255C6.30773 7.75 6.58755 8.02982 6.58755 8.375V8.38125C6.58755 8.72643 6.30773 9.00625 5.96255 9.00625H5.9563C5.61112 9.00625 5.3313 8.72643 5.3313 8.38125V8.375ZM5.9563 9.625C5.61112 9.625 5.3313 9.90482 5.3313 10.25V10.2563C5.3313 10.6014 5.61112 10.8813 5.9563 10.8813H5.96255C6.30773 10.8813 6.58755 10.6014 6.58755 10.2563V10.25C6.58755 9.90482 6.30773 9.625 5.96255 9.625H5.9563ZM5.3313 12.125C5.3313 11.7798 5.61112 11.5 5.9563 11.5H5.96255C6.30773 11.5 6.58755 11.7798 6.58755 12.125V12.1313C6.58755 12.4764 6.30773 12.7563 5.96255 12.7563H5.9563C5.61112 12.7563 5.3313 12.4764 5.3313 12.1313V12.125ZM5.9563 13.375C5.61112 13.375 5.3313 13.6548 5.3313 14V14.0063C5.3313 14.3514 5.61112 14.6313 5.9563 14.6313H5.96255C6.30773 14.6313 6.58755 14.3514 6.58755 14.0063V14C6.58755 13.6548 6.30773 13.375 5.96255 13.375H5.9563ZM7.4187 8.375C7.4187 8.02982 7.69852 7.75 8.0437 7.75H8.04995C8.39513 7.75 8.67495 8.02982 8.67495 8.375V8.38125C8.67495 8.72643 8.39513 9.00625 8.04995 9.00625H8.0437C7.69852 9.00625 7.4187 8.72643 7.4187 8.38125V8.375ZM8.0437 9.625C7.69852 9.625 7.4187 9.90482 7.4187 10.25V10.2563C7.4187 10.6014 7.69852 10.8813 8.0437 10.8813H8.04995C8.39513 10.8813 8.67495 10.6014 8.67495 10.2563V10.25C8.67495 9.90482 8.39513 9.625 8.04995 9.625H8.0437ZM7.4187 12.125C7.4187 11.7798 7.69852 11.5 8.0437 11.5H8.04995C8.39513 11.5 8.67495 11.7798 8.67495 12.125V12.1313C8.67495 12.4764 8.39513 12.7563 8.04995 12.7563H8.0437C7.69852 12.7563 7.4187 12.4764 7.4187 12.1313V12.125ZM8.0437 13.375C7.69852 13.375 7.4187 13.6548 7.4187 14V14.0063C7.4187 14.3514 7.69852 14.6313 8.0437 14.6313H8.04995C8.39513 14.6313 8.67495 14.3514 8.67495 14.0063V14C8.67495 13.6548 8.39513 13.375 8.04995 13.375H8.0437ZM9.5 8.375C9.5 8.02982 9.77982 7.75 10.125 7.75H10.1313C10.4764 7.75 10.7563 8.02982 10.7563 8.375V8.38125C10.7563 8.72643 10.4764 9.00625 10.1313 9.00625H10.125C9.77982 9.00625 9.5 8.72643 9.5 8.38125V8.375ZM10.125 9.625C9.77982 9.625 9.5 9.90482 9.5 10.25V10.2563C9.5 10.6014 9.77982 10.8813 10.125 10.8813H10.1313C10.4764 10.8813 10.7563 10.6014 10.7563 10.2563V10.25C10.7563 9.90482 10.4764 9.625 10.1313 9.625H10.125ZM3.25 4.625C3.25 4.27982 3.52982 4 3.875 4H10.125C10.4702 4 10.75 4.27982 10.75 4.625V5.25C10.75 5.59518 10.4702 5.875 10.125 5.875H3.875C3.52982 5.875 3.25 5.59518 3.25 5.25V4.625ZM10.75 12.125C10.75 11.7798 10.4702 11.5 10.125 11.5C9.77982 11.5 9.5 11.7798 9.5 12.125V14C9.5 14.3452 9.77982 14.625 10.125 14.625C10.4702 14.625 10.75 14.3452 10.75 14V12.125Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}