import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  CSSProperties,
  RefObject,
  useState,
  useEffect,
  useRef,
} from 'react'
import { Text } from '../Text'
import { Label } from '../Label'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space } from '~/types'
import { ColorInput } from './ColorInput'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

const Multi = ({ style, inputRef, ...props }) => {
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  return (
    <textarea
      style={{
        ...style,
        display: 'block',
        resize: 'none',
        paddingTop: 8,
      }}
      ref={resize}
      onInput={({ target }) => resize(target)}
      {...props}
    />
  )
}

const Single = ({ type, inputRef, ...props }) => {
  if (type === 'color') {
    // @ts-ignore
    return <ColorInput inputRef={inputRef} {...props} />
  }
  return <input {...props} type={type} ref={inputRef} />
}

type InputProps = {
  style?: CSSProperties
  label?: string
  colorInput?: boolean
  description?: string
  optional?: boolean
  value?: string | number
  icon?: FC | ReactNode
  iconRight?: FC | ReactNode
  defaultValue?: string | number
  placeholder?: string
  multiline?: boolean
  bg?: boolean
  ghost?: boolean
  autoFocus?: boolean
  name?: string
  space?: Space
  inputRef?: RefObject<HTMLDivElement>
  large?: boolean
  disabled?: boolean
  suggest?: (str: string) => string // show suggestion => Enter to complete
  error?: (str: string) => string // show error
  transform?: (str: string) => string // transform string
  forceSuggestion?: boolean // apply suggestion on blur
  noInterrupt?: boolean // dont use external state while focused
  onChange?:
    | ((value: string | number) => void)
    | Dispatch<SetStateAction<string | number>>
}

// to coorece the on change (skips having to make conversions or ts ignores)
type InputTypeString = {
  type: 'text' | 'password' | 'email' | 'phone' | 'color'
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
}
type InputNameString = {
  name: 'password' | 'email' | 'name'
  onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
}
type InputTypeNumber = {
  type: 'number' | 'date'
  onChange?: ((value: number) => void) | Dispatch<SetStateAction<number>>
}
type InputTypeOther = {
  type?: string
  onChange?:
    | ((value: string | number) => void)
    | Dispatch<SetStateAction<string | number>>
}
type InputPropsChange = InputProps &
  (InputTypeString | InputNameString | InputTypeNumber | InputTypeOther)

const MaybeSuggest = (props) =>
  props.suggest ? <Suggestor {...props} /> : props.children

const Suggestor = ({
  suggest,
  value,
  children,
  paddingLeft,
  paddingRight,
  onChange,
  forceSuggestion,
  focused,
}) => {
  const suggestion = suggest(value)
  const showSuggestion = focused && value && suggestion && suggestion !== value

  return (
    <div
      style={{
        position: 'relative',
      }}
      onKeyDown={
        showSuggestion
          ? (e) => {
              if (e.key === 'Enter') {
                onChange({ target: { value: suggestion } })
              }
            }
          : null
      }
      onBlur={() => {
        if (forceSuggestion) {
          onChange({ target: { value: suggestion } })
        }
      }}
    >
      {showSuggestion ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: paddingLeft,
            right: paddingRight,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        >
          {suggestion}
        </div>
      ) : null}
      {children}
    </div>
  )
}

export const Input: FC<
  InputPropsChange &
    Omit<React.HTMLProps<HTMLInputElement>, keyof InputPropsChange>
> = ({
  autoFocus,
  bg,
  colorInput,
  defaultValue,
  description,
  disabled,
  forceSuggestion,
  ghost,
  icon,
  iconRight,
  inputRef,
  label,
  large,
  multiline,
  name,
  noInterrupt,
  onChange: onChangeProp,
  optional,
  placeholder = 'Type something here',
  space,
  style,
  suggest,
  transform,
  error,
  type,
  value: valueProp,
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  // TODO Why is there always a color value!?
  const [colorValue, setColorValue] = useState('rgba(255,255,255,1)')

  const onChange = (e) => {
    let newValue = transform ? transform(e.target.value) : e.target.value
    setValue(newValue)
    if (type === 'number' && typeof newValue !== 'number') {
      newValue = Number(newValue)
    }

    onChangeProp?.(newValue)
    // const msg = error?.(newValue)
    // if (msg) {

    // }
  }

  const paddingLeft = ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const props = {
    name,
    type,
    value,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    autoFocus,
    style: {
      margin: 0,
      outline: ghost
        ? null
        : focus
        ? `2px solid ${color('border:active')}`
        : `1px solid ${color(hover ? 'border:hover' : 'border')}`,
      outlineOffset: ghost ? null : focus ? -2 : -1,
      borderRadius: 4,
      cursor: disabled ? 'not-allowed' : 'text',
      minHeight: ghost ? null : large ? 48 : 36,
      paddingLeft,
      paddingRight,
      width: '100%',
      fontSize: ghost ? 16 : null,
      fontWeight: ghost ? 500 : null,
      backgroundColor: bg
        ? color(hover && !disabled ? 'border' : 'border')
        : 'inherit',
    },
    inputRef,
    ...focusListeners,
    ...hoverListeners,
    ...otherProps,
  }

  return (
    <div
      style={{
        width: ghost ? 300 : '100%',
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'relative',
          color: color('text'),
        }}
      >
        {renderOrCreateElement(icon, {
          style: {
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translate3d(0,-50%,0)',
            pointerEvents: 'none',
          },
        })}
        {colorInput ? (
          <ColorInput
            onChange={(e) => {
              setColorValue(e.target.value)
            }}
            value={colorValue}
            style={{ width: '100%' }}
          />
        ) : multiline ? (
          <Multi {...props} />
        ) : (
          <MaybeSuggest
            focused={focused}
            forceSuggestion
            suggest={suggest}
            value={value}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            onChange={onChange}
          >
            <Single {...props} />
          </MaybeSuggest>
        )}
        {renderOrCreateElement(iconRight, {
          style: {
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translate3d(0,-50%,0)',
            pointerEvents: 'none',
          },
        })}
      </div>
      {/* <ErrorMessage /> */}
    </div>
  )
}
