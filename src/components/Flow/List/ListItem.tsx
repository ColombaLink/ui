import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text } from '../../Text'
import { useFlowHover } from '../useFlowHover'
import useMultipleEvents from '~/hooks/useMultipleEvents'
import { SettingsIcon, DragDropIcon, LoadingIcon, MoreIcon } from '~'
import { color, renderOrCreateElement } from '~/utils'
import { useDrag } from '~/hooks'
import { useDrop } from '~/hooks'
import { useSelect, useClick } from '../useFlowSelect'
import useFlowContextualMenu from '../useFlowContextualMenu'
import { getData } from '../getData'
import { EditableTitle } from '../../Input/EditableTitle'

const Img = ({ src, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        borderRadius: 4,
        border: `1px solid ${color('border')}`,
      }}
    />
  )
}

const Action = ({ icon, onClick, isHover }) => {
  const [clicky, setClicky] = useState(false)
  const ref = useRef<any>()
  useEffect(() => {
    return () => {
      clearTimeout(ref.current)
    }
  }, [])
  const ActionIcon = renderOrCreateElement(icon)
  return (
    <div
      style={{
        marginLeft: 16,
        opacity: isHover ? 0.75 : 0,
        transition: 'transform 0.15s',
        transform: clicky ? 'scale(1.3)' : 'scale(1)',
      }}
      onClick={(e) => {
        setClicky(true)
        ref.current = setTimeout(() => {
          setClicky(false)
        }, 150)
        onClick(e)
      }}
    >
      <ActionIcon />
    </div>
  )
}

const defaultitemProps = {
  title: {
    path: ['title'],
  },
}

const ListItem = ({
  index,
  data: { items, context },
  style: itemStyle = undefined,
  styleOverride,
}) => {
  let {
    onClick,
    activeId,
    onOptions,
    children,
    actionIcon,
    itemProps,
    onAction,
    Actions,
    optionsIcon,
    contextualMenu,
    onDrop,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    exportData,
    draggable = true,
    showIndex,
    isActive: isActiveFn,
  } = context

  if (!itemProps) {
    itemProps = defaultitemProps
  }

  const style = {
    height: 48,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
  }

  const x = Object.assign(style, itemStyle)
  x.top = `${parseFloat(x.top) + paddingTop}px`

  const ref = useRef<any>()

  const itemData = items[index]

  const titleProps = itemProps.title || defaultitemProps.title
  let iconDef = itemProps.icon && getData(itemData, itemProps.icon.path)
  if (itemProps.icon && itemProps.icon.mapObject) {
    iconDef = itemProps.icon.mapObject[iconDef] || iconDef
  }
  const img = itemProps.img && getData(itemData, itemProps.img.path)
  const title = titleProps.format
    ? {
        format: titleProps.format,
        value: getData(itemData, titleProps.path),
      }
    : getData(itemData, titleProps.path)
  const info =
    itemProps.info &&
    (itemProps.info.format
      ? {
          format: itemProps.info.format,
          value: getData(itemData, itemProps.info.path),
        }
      : getData(itemData, itemProps.info.path))
  const id = itemProps.id ? getData(itemData, itemProps.id) : index

  const inActive = itemProps.inActive
    ? getData(itemData, itemProps.inActive)
    : false

  const wrappedData = {
    index,
    data: itemData,
    exportData,
  }

  const isNew = itemData.isNew

  let iconName, iconProps
  if (iconDef && typeof iconDef === 'object') {
    iconName = iconDef.name
    iconProps = iconDef
  } else if (iconDef) {
    iconName = iconDef
    iconProps = itemProps.icon
  }

  console.log(iconName)

  const isActive = isActiveFn ? isActiveFn(wrappedData) : activeId === id

  const [hover, isHover] = useFlowHover()
  const [drop, isDragOver, isDropLoading] = useDrop(
    useCallback(
      (e, { files, data }) => {
        if (onDrop) {
          if (data && data.length) {
            return onDrop(e, {
              targetIndex: index,
              data,
            })
          } else if (files) {
            return onDrop(e, { files, targetIndex: index })
          }
        }
      },
      [index, items]
    ),
    { readFiles: true }
  )

  const [drag, isDragging] = draggable ? useDrag(wrappedData, ref) : [{}, false]
  // @ts-ignore
  const [select, isSelected] = useSelect(wrappedData)

  if (onDrop) {
    useEffect(() => {
      if (isDragOver || isDropLoading) {
        if (!ref.current || !ref.current.dragLayerActive) {
          const el = ref.current
          const p = el.parentNode
          const holder = p.parentNode
          let foundP = false
          holder.isDrop = el
          for (let i = 0; i < holder.children.length; i++) {
            const c = holder.children[i]
            if (c === p) {
              foundP = true
            }
            if (!foundP) {
              c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
            } else {
              c.children[1].style.transform = 'translate3d(0px, 40px, 0px)'
            }
          }
          ref.current.dragLayerActive = true
        }
      } else if (ref.current && ref.current.dragLayerActive) {
        ref.current.dragLayerActive = false
        const el = ref.current
        const p = el.parentNode
        const holder = p.parentNode
        if (holder.isDrop === el) {
          for (let i = 0; i < holder.children.length; i++) {
            const c = holder.children[i]
            c.children[1].style.transform = 'translate3d(0px, 0px, 0px)'
          }
          holder.isDrop = false
        }
      }
    }, [isDragOver, onDrop, isDropLoading])
  }

  const Icon = iconName ? iconName : null

  const OptionsIcon = optionsIcon ? 'options icon' : <MoreIcon />

  return (
    <div style={styleOverride || x} {...drop}>
      {onDrop ? (
        <div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 23,
              pointerEvents: 'none',
              opacity: isDragOver ? 1 : 0,
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
                left: 15,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                top: 23,
              }}
            >
              <LoadingIcon color="accent" />
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        ref={ref}
        style={{
          height: 48 + (itemProps.info ? 15 : 0),
          opacity: inActive || isDragging ? 0.5 : 1,
          alignItems: 'center',
          display: 'flex',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
          borderLeft: isActive ? `2px solid ${color('accent')} ` : null,
          borderBottom:
            index !== items.length - 1 ? `1px solid ${color('border')}` : null,
          padding: 15,
          backgroundColor: isSelected
            ? color('background2dp')
            : isHover
            ? color('background')
            : null,
        }}
        {...useMultipleEvents(
          drag,
          // @ts-ignore
          select,
          hover,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, wrappedData)
                  },
                  [onClick, wrappedData]
                ),
              }
            : undefined,
          contextualMenu
            ? useFlowContextualMenu(
                useCallback(
                  (e) => {
                    onOptions(e, wrappedData)
                  },
                  [onOptions, wrappedData]
                )
              )
            : undefined
        )}
      >
        {img ? (
          <Img src={img} size={24 + (itemProps.info ? 15 : 0)} />
        ) : Icon ? (
          <>
            {Icon}

            {/* <Icon {...iconProps} /> */}
          </>
        ) : null}
        <div
          style={{
            overflow: 'hidden',
            marginLeft: 15,
          }}
        >
          {typeof itemData.onEditableTitleChange === 'function' ? (
            <div style={{ display: 'flex' }}>
              {showIndex ? (
                <Text style={{ margin: '1px 0px' }}>{index + 1}.</Text>
              ) : null}
              <EditableTitle
                onChange={itemData.onEditableTitleChange}
                onBlur={itemData.onEditableTitleBlur}
                placeholder={itemData.editableTitlePlaceholder}
                placeholderAsDefault={
                  itemData.editableTitlePlaceholderAsDefault
                }
                horizontalPaddding={2}
                value={title}
                autoFocus={isNew}
              />
            </div>
          ) : (
            <Text>{showIndex ? `${index + 1}. ${title}` : title}</Text>
          )}
          {info ? (
            <Text
              weight={400}
              color="text"
              style={{
                marginTop: -4,
              }}
            >
              {info}
            </Text>
          ) : null}
        </div>
        {Actions ? (
          <Actions
            isHover={isHover}
            isDragging={isDragging}
            isDragOver={isDragOver}
            isSelected={isSelected}
            isActive={isActive}
            onOptions={onOptions}
            onClick={onClick}
            data={wrappedData}
            items={items}
          />
        ) : actionIcon ? (
          <Action
            isHover={isHover}
            icon={actionIcon}
            onClick={useCallback(
              (e) => {
                e.stopPropagation()
                if (onAction) {
                  onAction(e, wrappedData)
                }
              },
              [itemData]
            )}
          />
        ) : null}
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {onOptions || children || !draggable ? null : (
            <DragDropIcon
              style={{
                opacity: isHover ? 0.4 : 0,
                transition: 'opacity 0.15s',
                cursor: 'grab',
              }}
              color="text"
            />
          )}
          {onOptions ? (
            <MoreIcon
              color="text"
              onClick={useCallback(
                (e) => {
                  e.stopPropagation()
                  onOptions(e, wrappedData)
                },
                [wrappedData]
              )}
              style={{
                width: 35,
                paddingLeft: 7.5,
              }}
            />
          ) : null}
          {children
            ? renderOrCreateElement(children, {
                isHover,
                isDragging,
                isDragOver,
                isSelected,
                isActive,
                onOptions,
                onClick,
                data: wrappedData,
                items,
              })
            : null}
        </div>
      </div>
    </div>
  )
}

export { ListItem }
