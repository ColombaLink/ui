import { cloneElement, createElement } from 'react'

export const renderOrCreateElement = (element, props = undefined) => {
  if (element) {
    if (typeof element === 'function') {
      return createElement(element, props)
    } else if (props) {
      return cloneElement(element, props)
    }
    return element
  }
  return null
}
