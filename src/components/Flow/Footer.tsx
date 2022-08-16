import React, {
  FC,
  useCallback,
  useState,
  CSSProperties,
  ReactNode,
} from 'react'
import { Text, LoadingIcon, AddIcon } from '~'
import { color, renderOrCreateElement, stringToIcon } from '~/utils'
import {
  Data,
  Children,
  MultiDataEventHandler,
  DataEventHandler,
} from '~/types'
import { useFlowHover } from './useFlowHover'

export type FooterProps<T = any> = {
  label?: string
  floating?: boolean
  outline?: boolean
  data?: Data<T>
  paddingRight?: number
  style?: CSSProperties
  width?: number
  icon?: ReactNode
  paddingLeft?: number
  items?: Object[]
  onClick: MultiDataEventHandler<Object> | DataEventHandler<Data<T>>
}

export const Footer: FC<FooterProps> = ({
  width,
  outline,
  paddingRight,
  icon = 'AddIcon',
  data,
  floating,
  paddingLeft,
  label = { en: 'Add item' },
  onClick,
  items,
  style,
}) => {
  const Icon = stringToIcon(icon)
  const [hover, isHover, isActive] = useFlowHover()
  const [loading, setLoading] = useState(false)
  return (
    <div
      style={{
        cursor: 'pointer',
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        padding: 15,
        display: 'flex',
        alignItems: 'center',
        border: outline ? `1px solid ${color('border')}` : null,
        borderTop: `1px solid ${color('border')}`,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        borderTopLeftRadius: floating ? 4 : null,
        borderTopRightRadius: floating ? 4 : null,
        height: 48,
        width,
        backgroundColor: isActive ? color('background') : null,
        justifyContent: 'space-between',
        ...style,
      }}
      onClick={useCallback(
        (e) => {
          setLoading(true)
          // @ts-ignore
          const p = onClick(e, data || items)
          if (p instanceof Promise) {
            p.then((v) => {
              setLoading(false)
            })
          } else {
            setLoading(false)
          }
        },
        [data, items, onClick]
      )}
      {...hover}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {Icon
          ? renderOrCreateElement(Icon, {
              color: isHover ? color('text') : color('text2'),
              style: { marginRight: 15 },
              size: 14,
            })
          : //   <Icon style={{ marginRight: 15, marginLeft: 1 }} color="text" />
            null}
        <Text
          style={{ color: isHover ? color('text') : color('text2') }}
          weight={600}
          size={14}
        >
          {label}
        </Text>
      </div>
      {loading ? <LoadingIcon color="text" /> : null}
    </div>
  )
}
