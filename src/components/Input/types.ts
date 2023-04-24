import {
  FunctionComponent,
  ReactNode,
  RefObject,
  ReactEventHandler,
  KeyboardEvent,
} from 'react'
import { Space, Style, Icon } from '~'

export type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'phone'
  | 'color'
  | 'markdown'
  | 'date'
  | 'json'
  | 'multiline'
  | 'digest'
  | 'editable'

export type OnChange<T extends InputType> = (
  value: T extends 'number' ? number : T extends 'date' ? number : string
) => void

// make typescript allowed props based on type/InputType
// so inputProps will be shared by all ->
// type, onChange, label, description, descriptionBottom, errorMessage, disabled, value, maxChars, autoFocus

// then different proptypes ->
//  1. which go into the InputWrapper
// 2. which are specific for eacht type

export type InputProps = {
  type: InputType // <--- this is it
  onChange?: OnChange<T>
  style?: Style
  label?: ReactNode
  pattern?: string
  description?: string
  descriptionBottom?: string
  value?: string | number
  icon?: FunctionComponent<Icon> | ReactNode
  iconRight?: FunctionComponent<Icon> | ReactNode
  indent?: boolean
  defaultValue?: string | number
  placeholder?: ReactNode
  maxChars?: number
  bg?: boolean
  ghost?: boolean
  autoFocus?: boolean
  name?: string
  space?: Space
  min?: number
  max?: number
  inputRef?: RefObject<HTMLDivElement>
  large?: boolean
  disabled?: boolean
  suggest?: (str: string) => string // show suggestion => Enter to complete
  error?: (str: string, patternMatches?: boolean) => string // show error
  transform?: (str: string) => string // transform string
  forceSuggestion?: boolean // apply suggestion on blur
  noInterrupt?: boolean // dont use external state while focused
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void
  onBlur?: ReactEventHandler
}
