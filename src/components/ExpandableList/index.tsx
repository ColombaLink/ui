import { useState, ReactNode, FC, isValidElement } from 'react'
import {
  Text,
  Style,
  ExpandIcon,
  ScrollArea,
  border,
  styled,
  RowSpaced,
  Row,
} from '~'

type ListItem =
  | ReactNode
  | {
    label: ReactNode
    value?: any
    items?: ListItem[]
  }

type ExpandableListProps = {
  style?: Style
  data?: ListItem[]
  maxHeight?: number
  topRight?: FC | ReactNode
  topLeft?: FC | ReactNode
}

type ExpandableListItemProps = {
  style?: Style
  index?: number | string
  item?: any
  total?: number
}

const StyledUl = styled('ul', {
  listStyleType: 'none',
  paddingInlineStart: '20px',
  '& .percentage-class': {
    display: 'none',
  },
  '& > li': {
    position: 'relative',
  },
  '& > li:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    width: '200%',
    left: '-100%',
    borderTop: border(1),
  },
})

const ExpandableListItem = ({
  item,
  index,
  style,
  total,
}: ExpandableListItemProps) => {
  let children = null

  if (
    typeof item === 'string' ||
    typeof item === 'number' ||
    isValidElement(item)
  ) {
    item = {
      label: item,
    }
  }

  const [expanded, setExpanded] = useState(false)

  if (item.items && item.items.length > 0 && expanded) {
    children = (
      <StyledUl>
        {item.items.map((child, i) => (
          <ExpandableListItem
            key={`${index}-${i}`}
            item={child}
            index={`${index}-${i}`}
          />
        ))}
      </StyledUl>
    )
  }

  return (
    <li
      onClick={(e) => {
        e.stopPropagation()
        setExpanded(!expanded)
      }}
      style={{ cursor: 'pointer' }}
    >
      <RowSpaced
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Row
          style={{
            height: 54,
            ...style,
          }}
        >
          {item.items && item.items.length ? (
            <ExpandIcon
              style={{
                marginRight: 12,
                transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
              }}
            />
          ) : (
            <styled.div style={{ width: 32 }} />
          )}
          <Text>{item.label}</Text>
        </Row>
        <Row style={{ paddingRight: 8 }}>
          <Text style={{ marginRight: 4 }}>{item.value}</Text>
          {typeof item.value === 'number' && (
            <span className="percentage-class">
              <Text color="accent">
                ({`${((item.value / total) * 100).toFixed(2)}%`})
              </Text>
            </span>
          )}
        </Row>
      </RowSpaced>

      {children}
    </li>
  )
}

export const ExpandableList: FC<ExpandableListProps> = ({
  data,
  maxHeight,
  topLeft,
  topRight,
  style,
}) => {
  const getTotalFromData = (data) => {
    let total = 0
    for (let i = 0; i < data.length; i++) {
      total += data[i].value
    }
    return total
  }
  const totalValue = getTotalFromData(data)

  const nested = (
    <StyledUl
      style={{
        paddingInlineStart: '0px',
        '& .percentage-class': {
          display: 'inline-block',
        },
      }}
    >
      {data.map((item, index) => (
        <ExpandableListItem
          key={index}
          item={item}
          index={index}
          total={totalValue}
        />
      ))}
    </StyledUl>
  )

  const body = (
    <>
      {topRight || topLeft ? (
        <RowSpaced
          style={{
            height: 54,
            padding: '0px 8px 0px 3px',
          }}
        >
          {typeof topLeft === 'string' ? (
            <Text weight={600}>{topLeft}</Text>
          ) : (
            <div>{typeof topLeft === 'function' ? topLeft({}) : topLeft}</div>
          )}
          {typeof topRight === 'string' ? (
            <Text weight={600}>{topRight}</Text>
          ) : (
            <div>
              {typeof topRight === 'function' ? topRight({}) : topRight}
            </div>
          )}
        </RowSpaced>
      ) : null}
      {maxHeight ? (
        <ScrollArea
          style={{
            maxHeight,
          }}
        >
          {nested}
        </ScrollArea>
      ) : (
        nested
      )}
    </>
  )

  return (
    <styled.div
      style={{
        overflowX: 'hidden',
        ...style,
      }}
    >
      {body}
    </styled.div>
  )
}
