import React from 'react'
import { LinkIcon } from '~/icons'
import { Text } from '~'

// multiple refs display
export const References = ({ value }) => {
  ///  console.log('ref', value)

  return value.length > 0 ? (
    <div
      style={{
        position: 'absolute',
        left: 6,
        display: 'flex',
      }}
      // onClick={() => {
      //   console.log('Clicked a multiRef field 🔫', value)
      // }}
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
      {/* {value.slice(0, 3).map((ref, idx) => (
          <Badge style={{ marginLeft: 6 }} key={idx}>
            {ref}
          </Badge>
        ))} */}
    </div>
  ) : null
}
