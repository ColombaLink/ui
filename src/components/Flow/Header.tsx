import { FC, CSSProperties, FunctionComponent, ReactNode } from 'react'
import { color, renderOrCreateElement, Text, ExpandIcon } from '~'
import { Data, Icon } from '~/types'
import { EditableTitle } from '~/components/Input/EditableTitle'

export type HeaderProps = {
  data?: Data<any>
  autoFocusTitle?: boolean
  indicator?: string
  style?: CSSProperties
  onEditTitle?: (value: string, data?: Data<any>) => void
  label?: string
  noBorderBottom?: boolean
  isHover?: boolean
  children?: FC<{ items?: Object[]; data?: Data<any> }> | ReactNode
  outline?: boolean
  paddingRight?: number
  width?: number | string
  icon?: FunctionComponent<Icon> | ReactNode
  paddingLeft?: number
  items?: Object[]
  isExpanded?: boolean
  onExpand?: () => void
}

export const Header: FC<HeaderProps> = ({
  label,
  children,
  width,
  outline,
  items,
  data,
  style,
  onEditTitle,
  autoFocusTitle,
  paddingLeft,
  indicator,
  paddingRight,
  noBorderBottom,
  isHover,
  isExpanded,
  onExpand,
  ...props
}) => {
  return (
    <div
      style={{
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        display: 'flex',
        alignItems: 'center',
        border: outline ? `1px solid ${color('border')}` : null,
        borderBottom:
          noBorderBottom || (onExpand && !isExpanded)
            ? '1px solid transparent'
            : `1px solid ${color('border')}`,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: 48,
        width,
        justifyContent: 'space-between',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          padding: 15,
          whiteSpace: 'nowrap',
        }}
        onClick={onExpand || null}
      >
        {onExpand ? (
          <ExpandIcon
            style={{
              marginRight: 15,
              marginLeft: 1,
              transition: 'transform',
              transform: `rotate(${isExpanded ? '0deg' : '-90deg'})`,
            }}
          />
        ) : (
          <ExpandIcon
            style={{
              marginRight: 15,
              marginLeft: 1,
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {indicator ? (
            <Text weight={600} style={{ marginRight: 10 }}>
              {indicator}
            </Text>
          ) : null}
          {onEditTitle ? (
            <EditableTitle
              placeholder="Untitled"
              identifier={data && data.data.id}
              value={label}
              onChange={(value) => onEditTitle(value, data)}
              autoFocus={autoFocusTitle}
            />
          ) : (
            <Text weight={500}>{label}</Text>
          )}
        </div>
      </div>

      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingRight: 15,
          paddingLeft: 8,
        }}
      >
        {renderOrCreateElement(children, { items, data, isHover })}
      </div>
    </div>
  )
}
