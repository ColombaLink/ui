import React from 'react'
import { LinkIcon } from '~/icons'
import { Text } from '~'

// multiple refs display
export const References = ({ value }) => {
  return value.length > 0 ? (
    <div
      style={{
        position: 'absolute',
        left: 6,
        display: 'flex',
      }}
    >
      <div style={{ minWidth: 32, display: 'flex' }}>
        <LinkIcon
          color="accent"
          style={{
            marginRight: 4,
          }}
        />
        <Text color="accent">{value.length}</Text>
      </div>
    </div>
  ) : null
}
