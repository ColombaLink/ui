import React from 'react'
import { color } from '~/utils'
import { ContentEditor } from '../ContentEditor'

export const ContentModal = () => {
  return <div style={{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex'
  }}>
    <div style={{ opacity: 0.6, width: 300, flexGrow: 1, backgroundColor: color('background2') }} />
    <div style={{
      width: 1200,
      backgroundColor: color('background'),
      boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)'
    }}>
      <ContentEditor />
    </div>
  </div>
}
