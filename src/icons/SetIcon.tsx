import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const SetIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 18" fill="none" {...props}>
      <path
        d="M20 8.95395V10.1936C19.2524 10.1936 18.729 10.3589 18.43 10.6895C18.1354 11.0153 17.988 11.549 17.988 12.2904V14.0897C17.988 14.8878 17.8935 15.5419 17.7044 16.0519C17.5197 16.562 17.247 16.9587 16.8864 17.242C16.5258 17.5254 16.0861 17.7214 15.5672 17.83C15.0482 17.9433 14.459 18 13.7993 18V16.0378C14.3182 16.0378 14.7162 15.9599 14.9933 15.804C15.2703 15.6482 15.4594 15.412 15.5606 15.0956C15.6661 14.7792 15.7189 14.3754 15.7189 13.8843V11.5608C15.7189 11.2019 15.776 10.8642 15.8904 10.5478C16.0047 10.2314 16.2136 9.95514 16.517 9.71901C16.8205 9.47816 17.2514 9.29162 17.8099 9.15939C18.3728 9.02243 19.1028 8.95395 20 8.95395ZM13.7993 0C14.459 0 15.0482 0.0566703 15.5672 0.170011C16.0861 0.27863 16.5258 0.474616 16.8864 0.757968C17.247 1.04132 17.5197 1.43802 17.7044 1.94805C17.8935 2.45809 17.988 3.11216 17.988 3.91027V5.71665C17.988 6.45809 18.1354 6.9941 18.43 7.32467C18.729 7.65053 19.2524 7.81346 20 7.81346V9.05313C19.1028 9.05313 18.3728 8.98701 17.8099 8.85478C17.2514 8.71783 16.8205 8.53129 16.517 8.29516C16.2136 8.05431 16.0047 7.77568 15.8904 7.45927C15.776 7.14286 15.7189 6.80283 15.7189 6.4392V4.1157C15.7189 3.62456 15.6661 3.22078 15.5606 2.90437C15.4594 2.58796 15.2703 2.35419 14.9933 2.20307C14.7162 2.04723 14.3182 1.9693 13.7993 1.9693V0ZM20 7.81346V10.1936H17.9089V7.81346H20Z"
        fill={color(colorProp)}
      />
      <path
        d="M0 9.05313V7.81346C0.747595 7.81346 1.26871 7.65053 1.56335 7.32467C1.86239 6.9941 2.01191 6.45809 2.01191 5.71665V3.91027C2.01191 3.11216 2.10426 2.45809 2.28896 1.94805C2.47806 1.43802 2.75291 1.04132 3.11351 0.757968C3.47412 0.474616 3.91388 0.27863 4.4328 0.170011C4.95172 0.0566703 5.541 0 6.20064 0V1.9693C5.68172 1.9693 5.28374 2.04723 5.00669 2.20307C4.72964 2.35419 4.53834 2.58796 4.4328 2.90437C4.33165 3.22078 4.28108 3.62456 4.28108 4.1157V6.4392C4.28108 6.80283 4.22391 7.14286 4.10957 7.45927C3.99524 7.77568 3.78635 8.05431 3.48291 8.29516C3.17948 8.53129 2.74631 8.71783 2.18342 8.85478C1.62492 8.98701 0.897114 9.05313 0 9.05313ZM6.20064 18C5.541 18 4.95172 17.9433 4.4328 17.83C3.91388 17.7214 3.47412 17.5254 3.11351 17.242C2.75291 16.9587 2.47806 16.562 2.28896 16.0519C2.10426 15.5419 2.01191 14.8878 2.01191 14.0897V12.2904C2.01191 11.549 1.86239 11.0153 1.56335 10.6895C1.26871 10.3589 0.747595 10.1936 0 10.1936V8.95395C0.897114 8.95395 1.62492 9.02243 2.18342 9.15939C2.74631 9.29162 3.17948 9.47816 3.48291 9.71901C3.78635 9.95514 3.99524 10.2314 4.10957 10.5478C4.22391 10.8642 4.28108 11.2019 4.28108 11.5608V13.8843C4.28108 14.3754 4.33165 14.7792 4.4328 15.0956C4.53834 15.412 4.72964 15.6482 5.00669 15.804C5.28374 15.9599 5.68172 16.0378 6.20064 16.0378V18ZM0 10.1936V7.81346H2.09107V10.1936H0Z"
        fill={color(colorProp)}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5518 10.0814L8.42375 11.8405C8.1244 12.2594 7.36579 13.0765 6.72619 12.9942C6.0866 12.912 5.97781 12.4117 6.00336 12.1718C6.02527 11.9738 6.17202 11.5778 6.58382 11.5778C6.90936 11.5778 7.08159 11.7468 7.21408 11.8769C7.29108 11.9525 7.35466 12.0149 7.42712 12.0233C7.62426 12.0461 7.83235 11.909 8.07329 11.5778C8.10757 11.5306 8.14696 11.4782 8.19113 11.4194C8.45737 11.0647 8.89746 10.4786 9.44229 9.43026C9.51819 9.28421 9.60432 9.12802 9.69734 8.96599C9.49065 8.08767 9.2918 7.25071 9.16847 6.73439C9.08086 6.38789 8.73039 5.69718 8.02947 5.70632H7.33949V5.3979L9.49703 5.00952L9.8913 5.45502C10.0154 5.65302 10.29 6.16781 10.3951 6.64301C10.4236 6.77161 10.4981 7.08942 10.5987 7.51374C10.8913 7.0678 11.1618 6.6739 11.337 6.42602C11.4903 6.22041 11.8583 5.75663 12.1036 5.54645C12.1088 5.54198 12.1141 5.53748 12.1194 5.53294C12.4249 5.27104 12.8475 4.90871 13.4288 5.021C13.9019 5.11238 14.0056 5.50076 13.9983 5.68353C14.0166 5.90437 13.8939 6.40519 13.2755 6.33464C13.1084 6.31557 12.9674 6.26858 12.8379 6.22541C12.4242 6.08752 12.1273 5.98857 11.4684 6.9629C11.2121 7.3419 10.9635 7.72023 10.7334 8.07977C11.0046 9.21754 11.3696 10.7363 11.5889 11.6463C11.6619 11.9166 11.9459 12.2951 12.4979 11.6463C13.0499 10.9974 13.1294 10.7895 13.1002 10.7667L13.3959 10.938C13.2718 11.197 12.8615 11.8679 12.2131 12.4801C11.4027 13.2455 10.6908 13.3026 10.3184 11.6463C10.1937 11.0912 10.0171 10.3297 9.83502 9.55239C9.7148 9.76371 9.6184 9.94338 9.5518 10.0814Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}