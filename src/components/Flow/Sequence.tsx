import React, { useCallback } from 'react'
import { Footer } from './Footer'
import { FooterBottom } from './FooterBottom'
import { Header } from './Header'
import { useFlowHover } from './useFlowHover'
import { useDrop, useDrag } from '~/hooks'
import { DragSeqLine } from './DragSeqLine'
import { LoadingIcon } from '~/icons'
import { color } from '~'
import { getData } from './getData'
import { SelectableCollection } from './useFlowSelect'
import useMultipleEvents from '~/hooks/useMultipleEvents'
import { ListItem } from './List/ListItem'

const defaultItemProps = {
  title: { path: ['title'] },
  items: { path: ['items'] },
}

export const Sequence = ({ style, data: { items, context, width }, index }) => {
  const itemData = items[index]

  if (!itemData) {
    return null
  }

  if (itemData['@@newSequence']) {
    let onClick = context.footer.onClick
    if (
      context.footer.onClick &&
      context.header &&
      context.header.onEditTitle
    ) {
      onClick = async (e, data) => {
        // allow expand in here
        // maybe add on autofocus ref

        context.autoFocusRef.current = true
        // where to put this...
        setTimeout(() => {
          context.autoFocusRef.current = false
        }, 500)
        await context.footer.onClick(e, data)
      }
    }

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
          paddingBottom: 35,
          paddingTop: index === 0 ? context.paddingTop : 0,
        }}
      >
        <Footer
          outline
          floating
          items={items}
          data={{ data: { items: items.slice(0, -1) } }}
          {...context.footer}
          onClick={onClick}
        />
      </div>
    )
  } else {
    const [hover, isHover] = useFlowHover()

    const wrappedData = {
      exportData: context.exportDataSequence,
      index,
      data: itemData,
    }

    if (context.onDrop) {
      const onDrop = context.onDrop
      context = {
        ...context,
        onDrop: useCallback(
          (e, d) => {
            return onDrop(e, { ...d, targetData: itemData })
          },
          [onDrop, itemData]
        ),
      }
    }

    const [drag, isDragging] =
      context.draggable !== false ? useDrag(wrappedData) : [{}, false]
    const [drop, isDragOver] =
      context.draggable !== false ? useDrop() : [{}, false]

    let dropSeq, isDragOverSeq, isDropLoading
    if (index === 0 && context.onDropSequence && context.draggable !== false) {
      ;[dropSeq, isDragOverSeq, isDropLoading] = useDrop(
        useCallback(
          (e, { files, data }) => {
            return context.onDropSequence(e, {
              targetIndex: 0,
              data,
              files,
              items,
            })
          },
          [index, context.onDropSequence]
        )
      )
    }

    const itemProps = context.seqItemProps || defaultItemProps

    const titleProps = itemProps.title || defaultItemProps.title
    const nestedItemProps = itemProps.items || defaultItemProps.items

    const iconName = itemProps.icon && getData(itemData, itemProps.icon.path)
    const title = titleProps.format
      ? {
          format: titleProps.format,
          value: getData(itemData, titleProps.path),
        }
      : getData(itemData, titleProps.path)

    const isExpanded =
      !context.expandable ||
      (context.expandable
        ? context.defaultIsExpanded
          ? !context.expanded[wrappedData.index]
          : context.expanded[wrappedData.index]
        : null)

    const seqItems = getData(itemData, nestedItemProps.path) || []

    const isLast = index === items.length - 2

    const useAutoFocus = context.autoFocusRef.current === true && isLast

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
        }}
        {...hover}
      >
        <div
          style={{
            paddingTop: index === 0 ? context.paddingTop : 0,
            height: style.height - 35 - 48,
          }}
        >
          {/* @ts-ignore */}
          <div
            {...useMultipleEvents(drag, dropSeq)}
            style={{
              position: 'relative',
            }}
          >
            {dropSeq ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: isDragOverSeq ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    borderTop: `2px solid ${color('accent')}`,
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
                      top: 0,
                    }}
                  >
                    <LoadingIcon size={16} color="accent" />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div
              style={{
                opacity: isDragging ? 0.5 : 1,
                height: 48,
                transition: 'opacity 0.15s, transform 0.2s',
                transform:
                  isDragOverSeq || isDropLoading
                    ? 'translate3d(0px, 20px, 0px)'
                    : 'translate3d(0px, 0px, 0px)',
              }}
            >
              <Header
                {...context.header}
                // how do i know if something is just created...
                data={wrappedData}
                items={items}
                outline
                indicator={context.indicator ? `${index + 1}.` : ''}
                label={itemData.name === 'New sequence' ? '' : title}
                isExpanded={isExpanded}
                onExpand={
                  context.expandable
                    ? useCallback(() => {
                        context.updateExpandList(index)
                      }, [index])
                    : null
                }
                icon={iconName || 'newFlow'}
                isHover={isHover}
                autoFocusTitle={useAutoFocus}
                noBorderBottom={
                  wrappedData.data &&
                  wrappedData.data.items &&
                  wrappedData.data.items.length === 0
                }
              />
            </div>
          </div>
          <div
            style={{
              transform:
                isDragOverSeq || isDropLoading
                  ? 'translate3d(0px, 20px, 0px)'
                  : 'translate3d(0px, 0px, 0px)',
              transition: 'opacity 0.15s, transform 0.2s',
              borderLeft: `1px solid ${color('border')}`,
              borderRight: `1px solid ${color('border')}`,
              borderBottom: context.stepFooter
                ? null
                : `1px solid ${color('border')}`,
              borderBottomLeftRadius: context.stepFooter ? null : '4px',
              borderBottomRightRadius: context.stepFooter ? null : '4px',
            }}
            {...drop}
          >
            {isExpanded ? (
              <SelectableCollection items={seqItems}>
                {itemData.items &&
                  itemData.items.map((_data, index) => {
                    const s = {
                      position: 'relative',
                    }
                    return (
                      <ListItem
                        key={index}
                        data={{ items: seqItems, context }}
                        index={index}
                        styleOverride={s}
                      />
                    )
                  })}
              </SelectableCollection>
            ) : null}
          </div>
        </div>
        {context.stepFooter ? (
          <FooterBottom
            index={index}
            context={context}
            seqItems={seqItems}
            isDragOver={isDragOver}
            isDragOverSeq={isDragOverSeq}
            isDropLoading={isDropLoading}
            wrappedData={wrappedData}
          />
        ) : null}
        {context.draggable !== false ? (
          <>
            <div
              style={{
                position: 'relative',
              }}
            >
              <DragSeqLine
                onDropSequence={context.onDropSequence}
                index={index}
                context={context}
                width={width}
              />
            </div>
          </>
        ) : null}
      </div>
    )
  }
}
