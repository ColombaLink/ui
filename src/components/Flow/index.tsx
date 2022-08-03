import React, { useRef, useEffect } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import { Footer } from './Footer'
import { FooterBottom } from './FooterBottom'
import { Sequence } from './Sequence'
import { Header } from './Header'
import { wait } from '@saulx/utils'
import { AddIcon } from '~'
import { getData } from './getData'
import useDragScroll from '~/hooks/useDragScroll'

// flow props types

type FlowProps = {}

//header flow component

const defaultItemProps = {
  title: { path: ['title'] },
  items: { path: ['items'] },
}

export const Flow: FlowProps = (props) => {
  const { items = [], footer, paddingTop = 0, paddingBottom = 0 } = props
  const autoFocusRef = useRef()
  const itemsWithNew = footer
    ? [
        ...items,
        {
          '@@newSequence': true,
        },
      ]
    : items

  const listRef = useRef<any>()

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  }, [items])

  const expandedRef = useRef({ cnt: (~~(1000 * Math.random())).toString(16) })

  const updateExpandList = (action) => {
    expandedRef.current[action] = !expandedRef.current[action]
    listRef.current.resetAfterIndex(action)
  }

  const expanded = expandedRef.current
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <VariableSizeList
            ref={listRef}
            width={props.width || width}
            style={{
              paddingTop,
              paddingBottom,
              overflowX: 'hidden',
            }}
            itemCount={itemsWithNew.length}
            height={height}
            itemData={{
              items: itemsWithNew,
              context: {
                autoFocusRef,
                showIndex: true,
                ...props,
                updateExpandList,
                expanded,
                seqItemProps: props.itemProps,
                itemProps: props.itemProps
                  ? props.itemProps.items
                    ? props.itemProps.items.props
                    : undefined
                  : undefined,
              },
              width,
            }}
            itemSize={(index) => {
              let x = 48 + 35
              if (index === 0 && paddingTop) {
                x += paddingTop
              }

              const data = itemsWithNew[index]

              if (index === itemsWithNew.length - 1) {
                x += paddingBottom
              }

              if (data['@@newSequence']) {
                return x
              }

              if (props.stepFooter) {
                x += 48
              }

              if (props.sequenceSpacing) {
                x += props.sequenceSpacing
              }

              const selectItems =
                (props.itemProps && props.itemProps.items) ||
                defaultItemProps.items

              const items = getData(data, selectItems.path)

              if (
                !props.expandable ||
                (props.defaultIsExpanded ? !expanded[index] : expanded[index])
              ) {
                return (items ? items.length : 0) * 48 + x
              }
              return x
            }}
            {...useDragScroll(true)}
          >
            {Sequence}
          </VariableSizeList>
        )
      }}
    </AutoSizer>
  )
}
