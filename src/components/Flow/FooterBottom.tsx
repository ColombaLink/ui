import React, { FC, useCallback } from 'react'
import { useDrop } from '~/hooks'
import { Footer } from './Footer'
import { color } from '~'

type FooterBottomProps = {
  context: any
  seqItems: any
  isDragOver: any
  isDragOverSeq: any
  isDropLoading: any
  index: any
  wrappedData: any
}

export const FooterBottom: FC<FooterBottomProps> = ({
  context,
  seqItems,
  isDragOver,
  isDragOverSeq,
  isDropLoading,
  index,
  wrappedData,
}) => {
  const [drop, isFooterDragOver, isFooterLoading] = useDrop(
    useCallback(
      (e, { files, data }) => {
        const index = wrappedData.data.items.length
        if (data && data.length) {
          return context.onDrop(e, {
            targetIndex: index,
            data,
          })
        } else if (files) {
          return context.onDrop(e, { files, targetIndex: index })
        }
      },
      [context.onDrop, seqItems, wrappedData]
    ),
    { readFiles: true }
  )

  const footer = { ...context.stepFooter }

  if (context.expandable) {
    if (context.stepFooter.onClick) {
      footer.onClick = (...args) => {
        if (context.expanded[index]) {
          context.updateExpandList(index)
        }
        context.stepFooter.onClick(...args)
      }
    }
  }

  return (
    <div {...drop} style={{ position: 'relative' }}>
      <div
        style={{
          top: 0,
          paddingTop: 15,
          left: 0,
          right: 0,
          position: 'absolute',
          borderBottom: isFooterDragOver ? '2px solid blue' : null,
          borderLeft: `1px solid ${color('border')}`,
          borderRight: `1px solid ${color('border')}`,
        }}
      />
      <Footer
        outline
        items={seqItems}
        {...footer}
        style={{
          transition: 'opacity 0.15s, transform 0.2s',
          opacity: isDragOver || isFooterDragOver ? 0 : 1,
          transform:
            isDragOverSeq ||
            isDropLoading ||
            isFooterDragOver ||
            isFooterLoading
              ? 'translate3d(0px,20px,0px)'
              : isDragOver
              ? 'translate3d(0px, 40px, 0px)'
              : 'translate3d(0px, 0px, 0px)',
        }}
      />
    </div>
  )
}
