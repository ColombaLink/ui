export const boxShadow = (size: 'small' | 'medium' | 'large') => {
  let shadowSize: string
  let shadowColor: string

  if (size === 'small') {
    shadowSize = '0px 2px 4px'
    shadowColor = 'rgba(156, 156, 156, 0.08)'
  }
  if (size === 'medium') {
    shadowSize = '0px 1px 4px'
    shadowColor = 'rgba(156, 156, 156, 0.08)'
  }
  if (size === 'large') {
    shadowSize = '0px 12px 24px'
    shadowColor = 'rgba(0, 0, 0, 0.08)'
  }

  return ` ${shadowSize} ${shadowColor}`
}
