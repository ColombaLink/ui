import React from 'react'
import * as ReactDOM from 'react-dom'

export const createNotification = (notification, targetDiv) => {
  const newDiv = document.createElement('div')
  ReactDOM.render(notification, newDiv)
  targetDiv.appendChild(newDiv)

  setTimeout(() => {
    newDiv.remove()
  }, 3000)
}
