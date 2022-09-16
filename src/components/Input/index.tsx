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
import {
  Text,
  Button,
  Callout,
  ErrorIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '~'
import { Label } from '../Label'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space } from '~/types'
import { ColorInput } from './ColorInput'
import { styled } from 'inlines'

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
  descriptionBottom?: string
  optional?: boolean
  value?: string | number
  icon?: FC | ReactNode
  iconRight?: FC | ReactNode
  indent?: boolean
  defaultValue?: string | number
  placeholder?: string
  maxChars?: number
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
  descriptionBottom,
  disabled,
  error,
  forceSuggestion,
  ghost,
  icon,
  iconRight,
  indent,
  inputRef,
  label,
  large,
  maxChars,
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
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (maxChars && value.length > maxChars) {
      setValue(value.slice(0, maxChars))
    }
  }, [value])

  const onChange = (e) => {
    let newValue = transform ? transform(e.target.value) : e.target.value

    if (type === 'number' && typeof newValue !== 'number') {
      newValue = Number(newValue)
    }

    setValue(newValue)

    onChangeProp?.(newValue)
    const msg = error?.(newValue)

    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
    }
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
        borderLeft: indent ? `2px solid ${color('border')}` : null,
        borderColor: errorMessage
          ? color('red')
          : focused
          ? color('accent')
          : color('border'),
        paddingLeft: indent ? 12 : null,
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 12 }}
        />
        {value !== '' && indent && (
          <Button
            ghost
            onClick={() => {
              onChangeProp?.('')
              setValue('')
            }}
            style={{ height: 'fit-content' }}
          >
            Clear
          </Button>
        )}
      </div>
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
        {type === 'number' && !disabled && (
          <div
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translate3d(0,-50%,0)',
              display: 'flex',
              flexDirection: 'column',
              width: 15,
              height: 20,
            }}
          >
            <styled.div
              style={{
                border: `1px solid ${color('border')}`,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 10,
                '&:hover': {
                  backgroundColor: color('border'),
                },
              }}
              onClick={() => {
                onChange({ target: { value: +value + 1 } })
                // setValue(+value + 1)
              }}
            >
              {/* @ts-ignore */}
              <ChevronUpIcon size={9} strokeWidth={2.5} />
            </styled.div>
            <styled.div
              style={{
                border: `1px solid ${color('border')}`,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 10,
                '&:hover': {
                  backgroundColor: color('border'),
                },
              }}
              onClick={() => {
                onChange({ target: { value: +value - 1 } })
              }}
            >
              {/* @ts-ignore */}
              <ChevronDownIcon size={9} strokeWidth={2.5} />
            </styled.div>
          </div>
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

      {maxChars && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 4,
            marginTop: 8,
          }}
        >
          <Text color="text2" weight={400}>
            {value.length} characters
          </Text>
          <Text color="text2" weight={400}>
            Max {maxChars} characters
          </Text>
        </div>
      )}
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}
      {errorMessage && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <ErrorIcon color="red" size={16} />
          <Text color="red">{errorMessage}</Text>
        </div>
      )}
    </div>
  )
}
