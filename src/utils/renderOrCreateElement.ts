import { createElement } from 'react'

export const renderOrCreateElement = (element, props) => {
  if (element) {
    if (typeof element === 'function') {
      return createElement(element, props)
    }
    return element
  }
  return null
}
