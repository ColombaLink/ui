// TODO yves en youri fix this
import React, {
  Dispatch,
  FC,
  FunctionComponent,
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
import { Space, Icon } from '~/types'
import { ColorInput } from './ColorInput'
import { styled } from 'inlines'
import { JsonInput } from './JsonInput'
import { InputWrapper } from './InputWrapper'
import { DigestInput } from './DigestInput'
import { MarkdownInput } from './MarkdownInput'
import { PasswordInput } from './PasswordInput'

const resize = (target) => {
  if (target) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 8 + 'px'
  }
}

const Multi = ({ style, inputRef, ...props }) => {
  if (inputRef) throw new Error('UI: Cannot use inputRef on Multiline Input')
  const [inputFocus, setInputFocus] = useState(false)

  return (
    <div
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
    >
      <textarea
        style={{
          ...style,
          display: 'block',
          resize: 'none',
          paddingTop: 8,
          minHeight: 84,
          paddingLeft: 12,
          outline: inputFocus
            ? `3px solid rgba(44, 60, 234, 0.2)`
            : `3px solid transparent`,
          border: inputFocus
            ? `1.5px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
        }}
        ref={resize}
        onInput={({ target }) => resize(target)}
        {...props}
      />
    </div>
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
  passwordInput?: boolean
  markdownInput?: boolean
  digest?: boolean
  description?: string
  descriptionBottom?: string
  //  optional?: boolean
  value?: string | number
  // integer?: boolean
  icon?: FunctionComponent<Icon>
  iconRight?: FunctionComponent<Icon>
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
  type: 'text' | 'password' | 'email' | 'phone' | 'color' | 'markdown'
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
  fontSize,
  fontWeight,
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
            fontSize,
            fontWeight,
          }}
        >
          {suggestion}
        </div>
      ) : null}
      {children}
    </div>
  )
}

// TODO need to clean this whole thing up...
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
  passwordInput,
  markdownInput,
  defaultValue,
  description,
  descriptionBottom,
  digest,
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

    if (type === 'number') {
      setValue(+e.target.value)
      onChangeProp?.(+newValue)
    } else {
      setValue(newValue)
      onChangeProp?.(newValue)
    }

    // const msg = error?.(newValue)

    // if (msg) {
    //   // add error msg
    //   setErrorMessage(msg)
    // } else {
    //   // remove error msg
    //   setErrorMessage('')
    // }
  }

  useEffect(() => {
    //  check for error pas als de focus weg is
    if (!customRegex && !pattern) {
      const msg = error?.(value)

      if (msg) {
        // add error msg
        setErrorMessage(msg)
      } else {
        // remove error msg
        setErrorMessage('')
      }
    }
  }, [focused])

  useEffect(() => {
    if (customRegex && pattern) {
      if (new RegExp(pattern).test(value) || value.length < 1) {
        return setErrorMessage('')
      }
      return setErrorMessage('Does not match REGEX/pattern')
    }
  }, [value])

  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
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
        ? `3px solid transparent`
        : focused
        ? `3px solid rgba(44, 60, 234, 0.2)`
        : `3px solid transparent`,
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? 36 : large ? 48 : 36,
      paddingLeft,
      border: ghost
        ? `0px solid transparent`
        : focused
        ? `1.5px solid ${color('accent')}`
        : `1px solid ${color('border')}`,
      paddingRight,
      width: '100%',
      fontSize,
      fontWeight,
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
              style={{
                height: 'fit-content',
                marginTop: description ? 0 : -6,
              }}
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
          style={{
            position: 'relative',
            color: color('text'),
          }}
        >
          {!jsonInput && !markdownInput && !multiline
            ? renderOrCreateElement(icon, {
                style: {
                  position: 'absolute',
                  left: 12,
                  top: '50%',
                  transform: 'translate3d(0,-50%,0)',
                  pointerEvents: 'none',
                },
              })
            : null}

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
              setShowJSONClearButton={setShowJSONClearButton}
              setClearValue={setClearValue}
              clearValue={clearValue}
              disabled={disabled}
            />
          ) : markdownInput ? (
            <MarkdownInput
              {...props}
              // setErrorMessage={setErrorMessage}
              value={value}
              onChange={onChange}
              disabled={disabled}
            />
          ) : multiline ? (
            <Multi {...props} />
          ) : digest ? (
            <DigestInput
              {...props}
              disabled={!!valueProp}
              onChange={onChange}
              value={value}
            />
          ) : passwordInput ? (
            <PasswordInput
              {...props}
              icon={icon}
              large={large}
              disabled={!!valueProp}
              onChange={onChange}
              value={value}
            />
          ) : (
            <MaybeSuggest
              focused={focused}
              forceSuggestion={forceSuggestion}
              suggest={suggest}
              value={value}
              paddingLeft={paddingLeft}
              paddingRight={paddingRight}
              fontSize={fontSize}
              fontWeight={fontWeight}
              onChange={onChange}
            >
              <Single
                {...props}
                onKeyDown={(e) => {
                  // now you can remove the zero in input fields
                  if (e.key === 'Backspace' && value === 0) {
                    setValue('')
                  }
                  // for some reason pressing . in number input
                  // changed the value to one
                  if (e.key === '.' && type === 'number') {
                    e.preventDefault()
                  }
                  props.onKeyDown?.(e)
                }}
                // @ts-ignore
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
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
          {!jsonInput && !markdownInput && !multiline
            ? renderOrCreateElement(iconRight, {
                style: {
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translate3d(0,-50%,0)',
                  pointerEvents: 'none',
                },
              })
            : null}
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
