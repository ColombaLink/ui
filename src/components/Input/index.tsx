// TODO yves en youri fix this
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  CSSProperties,
  RefObject,
  useState,
  useEffect,
} from 'react'
import { Text, Button, ChevronDownIcon, ChevronUpIcon } from '~'
import { Label } from '../Label'
import { color, renderOrCreateElement } from '~/utils'
import { usePropState, useFocus, useHover } from '~/hooks'
import { Space } from '~/types'
import { ColorInput } from './ColorInput'
import { styled } from 'inlines'
import { JsonInput } from './JsonInput'
import { CustomRegexInput } from './CustomRegexInput'
import { InputWrapper } from './InputWrapper'

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

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
}

const Single: FC<SingleProps> = ({ type, inputRef, pattern, ...props }) => {
  if (type === 'color') {
    return <ColorInput inputRef={inputRef} {...props} />
  }
  return <input {...props} type={type} ref={inputRef} pattern={pattern} />
}

type InputProps = {
  style?: CSSProperties
  label?: string
  colorInput?: boolean
  customRegex?: boolean
  pattern?: string
  jsonInput?: boolean
  description?: string
  descriptionBottom?: string
  optional?: boolean
  value?: string | number
  integer?: boolean
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
  customRegex,
  pattern,
  jsonInput,
  defaultValue,
  description,
  descriptionBottom,
  disabled,
  error,
  // forceSuggestion,
  ghost,
  icon,
  iconRight,
  indent,
  inputRef,
  integer,
  label,
  large,
  maxChars,
  multiline,
  name,
  noInterrupt,
  onChange: onChangeProp,
  // optional,
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

  // to clear json value
  const [clearValue, setClearValue] = useState(false)
  const [showJSONClearButton, setShowJSONClearButton] = useState(false)

  useEffect(() => {
    if (maxChars && value.length > maxChars) {
      setValue(value.slice(0, maxChars))
    }
  }, [value])

  const onChange = (e) => {
    const newValue = transform ? transform(e.target.value) : e.target.value

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

  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
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
      fontSize: ghost ? 15 : null,
      fontWeight: ghost ? 400 : null,
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
    <InputWrapper
      style={style}
      indent={indent}
      focus={focused}
      space={space}
      descriptionBottom={descriptionBottom}
      errorMessage={errorMessage}
      disabled={disabled}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label
            label={label}
            description={description}
            style={{ marginBottom: 12 }}
          />
          {value !== '' && indent && !jsonInput && (
            <Button
              ghost
              onClick={() => {
                onChangeProp?.('')
                setValue('')
              }}
              disabled={disabled}
              style={{ height: 'fit-content' }}
            >
              Clear
            </Button>
          )}
          {/* JSON Input CLEAR BUTTON */}
          {indent && jsonInput && showJSONClearButton && (
            <Button
              ghost
              onClick={() => {
                setShowJSONClearButton(false)
                setValue('')
                onChangeProp?.('')
                setClearValue(true)
                setErrorMessage('')
              }}
              style={{ height: 'fit-content' }}
              disabled={disabled}
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
              disabled={disabled}
              value={colorValue}
              style={{ width: '100%' }}
            />
          ) : jsonInput ? (
            <JsonInput
              {...props}
              setErrorMessage={setErrorMessage}
              value={value}
              onChange={onChange}
              clearValue={clearValue}
              setClearValue={setClearValue}
              setShowJSONClearButton={setShowJSONClearButton}
              disabled={disabled}
            />
          ) : multiline ? (
            <Multi {...props} />
          ) : customRegex ? (
            <CustomRegexInput
              pattern={pattern}
              setErrorMessage={setErrorMessage}
              value={value}
              onChange={onChange}
            />
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
              <Single
                {...props}
                onKeyDown={(e) => {
                  if (integer && (e.key === ',' || e.key === '.')) {
                    e.preventDefault()
                  }
                }}
              />
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
      </div>
    </InputWrapper>
  )
}
