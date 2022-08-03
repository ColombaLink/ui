import { Data, DataEventHandler, Weight } from '~/types'
import { CSSProperties, PropsWithChildren } from 'react'
import { Color } from '~/types'
import { AvatarProps } from '../Avatar'
import { IconProps } from '../Icon'

export type DataPath = (string | number)[]

export type ImgItemProps = {
  path: DataPath
  avatar?: boolean
  textPath?: DataPath
  color?: Color
  foregroundColor?: Color
  avatarProps?: AvatarProps
}

export type IconItemProps = IconProps & {
  path?: DataPath
  mapObject?: { [key: string]: string }
}

export type TextItemProps = {
  format?: string
  weight?: Weight
  path: DataPath
}

export type CollectionitemProps = {
  title?: TextItemProps
  info?: TextItemProps
  img?: ImgItemProps
  icon?: IconItemProps
  id?: DataPath
  inActive?: DataPath
  text?: TextItemProps
}

export type OptionsComponentProps = PropsWithChildren<{
  onClick?: DataEventHandler
  isHover: boolean
  isActive: boolean
  isDragging: boolean
  isDragOver: boolean
  isSelected: boolean
  items: Object[]
  data: Data
  onOptions?: DataEventHandler
}>

export type SequenceitemProps = {
  title?: TextItemProps
  id?: DataPath
  img?: ImgItemProps
  icon?: IconItemProps
  items?: {
    path: DataPath
    props?: CollectionitemProps
  }
}
