import React, { useCallback } from 'react'
import { useDrop } from '~/hooks'
import { LoadingIcon } from '~/icons'
import { color } from '~'

export const DragSeqLine = ({ index, width, onDropSequence, context }) => {
  if (onDropSequence) {
    const [dropSeq, isDragOverSeq, isDropLoading] = useDrop(
      useCallback(
        (e, { files, data }) => {
          if (data[0]) {
            if (data[0].index > index) {
              index = index + 1
            }
            return onDropSequence(e, {
              // todo clean
              targetIndex: index,
              data,
              files,
              items: context.items,
            })
          }
        },
        [index, onDropSequence]
      )
    )
    return (
      <div
        style={{
          top: 0,
          left: 0,
          paddingLeft: 10,
          paddingRight: 15,
          width:
            width - (context.paddingLeft || 0) - (context.paddingRight || 0),
          position: 'absolute',
          height: 35,
        }}
        {...dropSeq}
      >
        <div
          style={{
            pointerEvents: 'none',
            marginTop: 16,
            opacity: isDragOverSeq ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop: `2px solid ${color('border')}`,
          }}
        />
        {isDropLoading ? (
          <div
            style={{
              position: 'absolute',
              height: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: 16,
            }}
          >
            <LoadingIcon color="text" size={16} />
          </div>
        ) : null}
      </div>
    )
  }
  return null
}
