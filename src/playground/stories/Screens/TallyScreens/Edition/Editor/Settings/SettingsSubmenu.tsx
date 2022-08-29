import React from 'react'
import { Button, color } from '~'

export const SettingsSubmenu = () => {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {/* Location logic */}

      <Button light style={{ color: color('accent') }}>
        General
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Sharing
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Footer
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Integration
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Video
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Comments
      </Button>
      <Button ghost style={{ color: color('text2') }}>
        Payment
      </Button>
    </div>
  )
}
