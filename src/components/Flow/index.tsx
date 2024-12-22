import { useRef, useEffect, ComponentType, ReactNode, FC } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList } from 'react-window'
import { FooterProps } from './Footer'
import { Sequence } from './Sequence'
import { HeaderProps } from './Header'
import { getData } from './getData'
import useDragScroll from '~/hooks/useDragScroll'
import { DataEventHandler, Data, ExportData, File, Color } from '~/types'
import { color } from '~'
import { OptionsComponentProps, SequenceitemProps } from './types'

type FlowProps = {
  indicator?: boolean
  onDropData?: DataEventHandler
  onDropFile?: DataEventHandler
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex: number; targetData: Data }
    | { files: File[]; targetIndex: number; targetData: Data }
  > // i think this is an order change - if this is not there dont allow order change
  onDropSequence?: DataEventHandler<
    | { data: Data[]; targetIndex: number }
    | { files: File[]; targetIndex: number }
  > // i think this is an order change - if this is not there dont allow order change
  paddingRight?: number
  paddingLeft?: number
  sequenceSpacing?: number
  paddingTop?: number
  expandable?: boolean
  defaultIsExpanded?: boolean
  paddingBottom?: number
  width?: number
  items: Object[]
  draggable?: boolean
  Actions?: ComponentType<OptionsComponentProps>
  itemProps?: SequenceitemProps
  onClick?: DataEventHandler
  actionIcon?: string
  onAction?: DataEventHandler
  footer?: FooterProps
  stepFooter?: FooterProps
  exportData?: ExportData
  exportDataSequence?: ExportData
  onOptions?: DataEventHandler // select options
  optionsIcon?: string
  contextualMenu?: boolean
  children?: FC<OptionsComponentProps> | ReactNode
  header?: HeaderProps
  color?: Color
}

const defaultItemProps = {
  title: { path: ['title'] },
  items: { path: ['items'] },
}

export const Flow = (props: FlowProps) => {
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
              color: color(props.color) || color('text'),
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
