import React from 'react'
import { Icon } from '~/types'
import { color } from '~/utils'

export const JsonIcon = ({
  color: colorProp = 'currentColor',
  size = 16,
  ...props
}: Icon) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 24 11"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1934 2.64804H17.8662L17.8663 8.34439H19.0301V4.51786L21.596 8.34439H22.752V2.64804H21.5773V6.3122L19.1934 2.64804ZM5.07061 6.80874V2.64804L3.8166 2.64814L3.81693 6.69753C3.81693 7.137 3.71297 7.57148 3.10069 7.57148C2.62221 7.57148 2.38838 7.27941 2.38838 6.71589V6.1907H1.25365V6.77448C1.25365 7.36481 1.41401 7.80677 1.73737 8.10412C2.06362 8.39648 2.51786 8.54079 3.1003 8.54079C3.75094 8.54079 4.24319 8.38588 4.57278 8.07015C4.90466 7.75003 5.07061 7.32862 5.07061 6.80874ZM9.98072 3.10092C9.49437 2.64024 8.81417 2.45947 8.13925 2.45947C7.91362 2.45947 7.69049 2.4772 7.4724 2.51367C6.81159 2.62497 6.13599 3.03045 5.96776 3.68436C5.8451 4.17595 5.8779 4.75315 6.2265 5.15834C6.64824 5.62271 7.29859 5.77396 7.906 5.91521C7.94477 5.92423 7.98337 5.9332 8.02171 5.94222C8.13862 5.97285 8.26041 5.99613 8.38283 6.01953C8.72256 6.08447 9.06709 6.15033 9.32528 6.3767C9.59977 6.67657 9.505 7.20674 9.13245 7.39843C8.72115 7.61505 8.21253 7.61785 7.76356 7.51656C7.33854 7.42428 6.96336 7.06989 6.97714 6.63479H5.7686C5.7686 6.63479 5.82403 7.11103 5.88306 7.27935C6.10672 7.91269 6.66191 8.28765 7.28469 8.4198C7.91041 8.55725 8.5775 8.59559 9.20289 8.44847C9.83385 8.31602 10.4356 7.91023 10.6258 7.30276C10.7642 6.78531 10.7183 6.18315 10.3645 5.74867C10.0207 5.38367 9.51039 5.24101 9.02806 5.10617C8.97617 5.09166 8.9246 5.07724 8.8736 5.06265C8.69519 5.00947 8.51131 4.97027 8.32724 4.93103C7.99563 4.86033 7.66339 4.78951 7.3614 4.63658C6.96065 4.45298 6.95344 3.858 7.31746 3.63576C7.70348 3.41634 8.19343 3.4366 8.62337 3.51639C9.02576 3.58966 9.30419 3.94903 9.31731 4.32866H10.5087C10.4926 3.87857 10.3185 3.42382 9.98072 3.10092ZM15.1616 2.57853C14.8323 2.49562 14.4896 2.45168 14.144 2.45666C13.573 2.46508 13.004 2.6044 12.5245 2.90891C11.7952 3.37896 11.439 4.21708 11.3626 5.0268C11.2806 5.92381 11.3678 6.90907 11.9667 7.64371C12.4891 8.29791 13.3818 8.55381 14.2164 8.54072C14.7015 8.54072 15.1941 8.47433 15.6338 8.28015C16.3829 7.96442 16.8558 7.24846 16.9926 6.50073C17.1556 5.58784 17.1142 4.60291 16.6744 3.76263C16.3776 3.1835 15.8112 2.74839 15.1616 2.57853ZM0 11V0H24V11L22.752 11H15.6338H6.56403H1.73737L0 11ZM12.974 4.06934C13.2492 3.68441 13.7303 3.51423 14.2068 3.51173L14.2067 3.51172C14.3671 3.51172 14.5255 3.52917 14.677 3.56595C15.2571 3.68715 15.6405 4.20238 15.7517 4.73162C15.8878 5.38056 15.9068 6.09215 15.6074 6.70772C15.371 7.21421 14.7994 7.54023 14.2169 7.51903C13.9398 7.51903 13.6574 7.4754 13.4092 7.35664C12.9035 7.13347 12.6638 6.59925 12.6067 6.09994C12.5359 5.41741 12.5493 4.65717 12.974 4.06934Z"
        fill={color(colorProp)}
      />
    </svg>
  )
}
