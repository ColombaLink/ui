// TODO what to do here?
import React, {
  CSSProperties,
  FC,
  useRef,
  useState,
  Ref,
  useEffect,
} from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SortableFixedSizeList, ChildrenProps } from 'react-window-sortable'
import { Space } from '~/types'
import { styled } from 'inlines'
import { DragDropIcon } from '~/icons'
import { ListItem } from './ListItem'
import { Checkbox } from '../Checkbox'

type CustomListProps = {
  items?: any[]
  draggable?: boolean
  itemSize?: number
  itemSpace?: Space
  style?: CSSProperties
  autoScrollDistance?: number
  maxItemWidth?: number
  client?: any
  schema?: any
  db?: any
  name?: string
  fieldData?: any
  showSystemFields?: boolean
}

export const CustomList: FC<CustomListProps> = ({
  items,
  draggable,
  itemSpace = 0,
  itemSize = 56 + +itemSpace,
  autoScrollDistance = 64,
  maxItemWidth,
  client,
  schema,
  db,
  name,
  fieldData,
  style,
}) => {
  const [data, setData] = useState(items)
  const [fieldState, setFieldState] = useState(fieldData)

  const [showSystemFields, setShowSystemFields] = useState(false)
  const systemFieldNames = ['id', 'type', 'children', 'parents']

  console.log('data --->', data)
  console.log('fieldState', fieldState)

  useEffect(() => {
    setFieldState(fieldData)
    setData(items)
  }, [schema])

  useEffect(() => {
    if (!showSystemFields) {
      setData(
        items.filter((item) => !systemFieldNames.includes(item.props.fieldName))
      )
      setFieldState(
        fieldData.filter((item) => !systemFieldNames.includes(item[0]))
      )
    } else if (showSystemFields) {
      setData(items)
      setFieldState(fieldData)
    }
  }, [showSystemFields, schema])

  const listRef = useRef<any>()

  const DragDropper = styled('div', {
    cursor: 'pointer',
    opacity: 0.6,
    '&:hover': {
      opacity: 1,
    },
  })

  const move = (arr: any[], from: number, to: number) => {
    arr.splice(to, 0, arr.splice(from, 1)[0])
  }

  // copy tempDiv to indicate dragging element
  const addDivToCursor = (e) => {
    let parentElWidth = e.target.parentElement.clientWidth
    let tempDivTest = e.target.parentNode
    let tempCopiedDiv = tempDivTest.cloneNode(true)

    tempCopiedDiv.setAttribute('id', 'tempCopiedDivId')
    tempCopiedDiv.style.width = parentElWidth ? parentElWidth + 'px' : '360px'

    document.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', movingMouse)

      function movingMouse(e) {
        if (tempCopiedDiv) {
          document.body.appendChild(tempCopiedDiv)
          tempCopiedDiv.style.position = 'absolute'
          tempCopiedDiv.style.left = `${e.clientX}px`
          tempCopiedDiv.style.top = `${e.clientY}px`
        }
      }

      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', movingMouse)
        tempCopiedDiv = null
        document.getElementById('tempCopiedDivId')?.remove()
      })
    })
  }

  return (
    <>
      <div style={{ width: maxItemWidth || '100%', margin: '0 auto' }}>
        <Checkbox
          space="16px"
          description="Show system fields"
          onChange={(v) => {
            setShowSystemFields(v)
          }}
        />
      </div>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <SortableFixedSizeList
              autoScrollWhenDistanceLessThan={autoScrollDistance}
              ref={listRef}
              height={height}
              width={width}
              itemCount={data.length}
              itemSize={itemSize}
              itemData={data}
              // @ts-ignore
              onSortOrderChanged={({ originalIndex, newIndex }) => {
                move(data, originalIndex, newIndex)
                move(fieldState, originalIndex, newIndex)

                setData(data.slice(0))
                setFieldState(fieldData.slice(0))

                for (let i = 0; i < fieldState.length; i++) {
                  fieldState[i][1].meta.index = i
                }
                const fieldStateObject = Object.fromEntries(fieldState)

                client
                  .updateSchema({
                    schema: { types: { [name]: { fields: fieldStateObject } } },
                    db,
                  })
                  .catch((e) => console.error('error updating schema', e))
              }}
              style={style}
            >
              {React.forwardRef(
                (
                  { data, index, style, onSortMouseDown }: ChildrenProps,
                  ref: Ref<any>
                ) => (
                  <div ref={ref}>
                    <ListItem
                      style={{
                        paddingLeft: draggable ? 0 : 16,
                        maxWidth: maxItemWidth || '100%',
                        transform: maxItemWidth ? 'translateX(-50%)' : 'none',
                        ...style,
                        left: maxItemWidth ? '50%' : 0,
                      }}
                      itemSize={itemSize}
                      space={itemSpace}
                    >
                      {draggable && (
                        <DragDropper
                          onMouseDown={(e) => {
                            onSortMouseDown(e)
                            addDivToCursor(e)
                          }}
                          style={{ marginLeft: 16, marginRight: 16 }}
                        >
                          <DragDropIcon style={{ pointerEvents: 'none' }} />
                        </DragDropper>
                      )}
                      {data[index]}
                    </ListItem>
                  </div>
                )
              )}
            </SortableFixedSizeList>
          )
        }}
      </AutoSizer>
    </>
  )
}
