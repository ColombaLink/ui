import React from 'react'
import { ReferenceIcon } from '~/icons'
import { Badge } from '~'
import { getImageSrcFromId } from '~/utils/getImageSrcFromId'

// single ref display
export const Reference = ({ value }) => {
  // console.log('value', value)

  const afbThumb = getImageSrcFromId(value)

  // console.log(afbThumb, 'afbThumb')

  return value.length > 0 ? (
    <div style={{ display: 'flex', verticalAlign: 'center' }}>
      {!afbThumb ? (
        <div style={{ minWidth: 20, paddingTop: 4 }}>
          <ReferenceIcon
            color="accent"
            style={{
              marginRight: 6,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            width: 34,
            height: 34,
            marginRight: 12,
          }}
        />
      )}

      <Badge style={{ maxHeight: 24, marginTop: afbThumb ? 5 : 0 }}>
        {value}
      </Badge>
    </div>
  ) : null
}
