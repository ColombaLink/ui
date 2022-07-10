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
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space } from '~/types'

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

const Color = ({
  inputRef,
  name,
  placeholder,
  defaultValue,
  value = defaultValue,
  disabled,
  style,
  onChange,
  ...props
}) => {
  const [colorState, setColor] = useState(value)
  const valueRef = useRef<string>()
  const ref = useRef()

  useEffect(() => {
    if (onChange && colorState !== value) {
      const { backgroundColor } = getComputedStyle(ref.current)
      const [, r, g, b, a] = backgroundColor.split(/, |,|\(|\)/)
      const value = `rgba(${r || 0},${g || 0},${b || 0},${a || 1})`
      if (valueRef.current !== value) {
        valueRef.current = value
        onChange({ target: { value } })
      }
    }
  }, [colorState, onChange])

  return (
    <>
      <input
        {...props}
        type="text"
        ref={inputRef}
        value={colorState}
        onChange={(e) => setColor(e.target.value)}
        placeholder={placeholder}
        style={{
          ...style,
          paddingLeft: 36,
        }}
      />
      <label
        ref={ref}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translate3d(0,-50%,0)',
          backgroundColor: colorState,
          height: 20,
          width: 20,
          borderRadius: 4,
          marginRight: 8,
          marginLeft: -4,
          border: `1px solid ${color('border')}`,
        }}
      >
        <input
          type="color"
          name={name}
          disabled={disabled}
          value={colorState}
          onChange={(e) => setColor(e.target.value)}
          style={{ visibility: 'hidden' }}
        />
      </label>
    </>
  )
}

const Single = ({ type, inputRef, ...props }) => {
  if (type === 'color') {
    return <Color inputRef={inputRef} {...props} />
  }
  return <input {...props} type={type} ref={inputRef} />
}

type InputProps = {
  style?: CSSProperties
  label?: string
  description?: string
  optional?: boolean
  value?: string | number
  iconLeft?: FC | ReactNode
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
  transform?: (str: string) => string // transform string
  forceSuggestion?: boolean // apply suggestion on blur
  noInterrupt?: boolean // dont use external state while focused
  onChange?:
    | ((value: string | number) => void)
    | Dispatch<SetStateAction<string | number>>
}

// to coorece the on change (skips having to make conversions or ts ignores)
type InputPropsChange =
  | (InputProps & {
      type: 'text' | 'password' | 'email' | 'phone' | 'color'
      onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
    })
  | (InputProps & {
      name: 'password' | 'email' | 'name'
      onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
    })
  | (InputProps & {
      type: 'number' | 'date'
      onChange?: ((value: number) => void) | Dispatch<SetStateAction<number>>
    })
  | (InputProps & {
      type?: string
      onChange?:
        | ((value: string | number) => void)
        | Dispatch<SetStateAction<string | number>>
    })

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
  style,
  onChange: onChangeProp,
  label,
  description,
  optional,
  ghost,
  value: valueProp,
  defaultValue,
  type,
  placeholder = 'Type something here',
  iconLeft,
  iconRight,
  multiline,
  bg,
  autoFocus,
  name,
  space,
  inputRef,
  large,
  disabled,
  suggest,
  transform,
  forceSuggestion,
  noInterrupt,
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()

  const onChange = (e) => {
    const newValue = transform ? transform(e.target.value) : e.target.value
    setValue(newValue)
    if (type === 'number' && typeof newValue !== 'number') return
    // ignore so we have to write less code.. TODO: write more stuff for this
    // @ts-ignore
    onChangeProp?.(newValue)
  }

  const paddingLeft = ghost ? 0 : iconLeft ? 36 : 12
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
      minHeight: large ? 48 : 36,
      paddingLeft,
      paddingRight,
      width: '100%',
      fontSize: ghost ? 16 : null,
      fontWeight: ghost ? 500 : null,
      backgroundColor: bg
        ? color(hover && !disabled ? 'lightgrey:hover' : 'lightgrey')
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
      {label && (
        <Text style={{ marginBottom: 8 }}>
          {label}
          {optional && (
            <span
              style={{
                fontWeight: 400,
                color: color('text2'),
              }}
            >
              {' '}
              (optional)
            </span>
          )}
        </Text>
      )}
      {description && (
        <Text
          weight={400}
          style={{ marginBottom: 12, marginTop: -2 }}
          color="text2"
        >
          {description}
        </Text>
      )}
      <div
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          position: 'relative',
          color: color('text'),
        }}
      >
        {renderOrCreateElement(iconLeft, {
          style: {
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translate3d(0,-50%,0)',
            pointerEvents: 'none',
          },
        })}
        {multiline ? (
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
    </div>
  )
}
