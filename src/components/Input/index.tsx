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
      const [, r, g, b, a] = backgroundColor.split(/,|\(|\)| /)
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
          border: `1px solid ${color('OtherInputBorderDefault')}`,
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

const Single = (props) => {
  if (props.type === 'color') {
    return <Color {...props} />
  }
  return <input {...props} ref={props.inputRef} />
}

type InputPropsBaseLine = {
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
}

// to coorece the on change (skips having to make conversions or ts ignores)
type InputProps =
  | (InputPropsBaseLine & {
      type: 'text' | 'password' | 'email' | 'phone' | 'color'
      onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
    })
  | (InputPropsBaseLine & {
      name: 'password' | 'email' | 'name'
      onChange?: ((value: string) => void) | Dispatch<SetStateAction<string>>
    })
  | (InputPropsBaseLine & {
      type: 'number' | 'date'
      onChange?: ((value: number) => void) | Dispatch<SetStateAction<number>>
    })
  | (InputPropsBaseLine & {
      type?: string
      onChange?:
        | ((value: string | number) => void)
        | Dispatch<SetStateAction<string | number>>
    })

export const Input: FC<
  InputProps & Omit<React.HTMLProps<HTMLInputElement>, keyof InputProps>
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
  ...otherProps
}) => {
  const [value = '', setValue] = usePropState(valueProp)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()

  const onChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    // ignore so we have to write less code.. TODO: write more stuff for this
    // @ts-ignore
    onChangeProp?.(newValue)
  }

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
        ? `2px solid ${color('OtherInputBorderActive')}`
        : `1px solid ${color(
            hover ? 'OtherInputBorderHover' : 'OtherInputBorderDefault'
          )}`,
      outlineOffset: ghost ? null : focus ? -2 : -1,
      borderRadius: 4,
      cursor: disabled ? 'not-allowed' : 'text',
      minHeight: large ? 48 : 36,
      paddingLeft: ghost ? 0 : iconLeft ? 36 : 12,
      paddingRight: ghost ? 0 : iconRight ? 36 : 12,
      width: '100%',
      fontSize: ghost ? 16 : null,
      fontWeight: ghost ? 500 : null,
      backgroundColor: disabled
        ? color('GreydarkAccent')
        : bg
        ? color(hover ? 'GreylightHover' : 'Greylight')
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
                color: color('TextSecondary'),
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
          color="TextSecondary"
        >
          {description}
        </Text>
      )}
      <div
        style={{
          position: 'relative',
          color: color('TextPrimary'),
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
        {multiline ? <Multi {...props} /> : <Single {...props} />}
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
