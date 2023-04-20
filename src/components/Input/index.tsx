// TODO yves en youri fix this
import React, {
  FC,
  FunctionComponent,
  RefObject,
  useState,
  useEffect,
  KeyboardEvent,
  ReactNode,
  ReactEventHandler,
  useCallback,
} from 'react'
import {
  Text,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  DateTimePicker,
  Style,
  styled,
  usePropState,
  useFocus,
  useHover,
  color,
  renderOrCreateElement,
  Space,
  Icon,
} from '~'
import { Label } from '../Label'
import { ColorInput } from './ColorInput'
import { JsonInput } from './JsonInput'
import { InputWrapper } from './InputWrapper'
import { DigestInput } from './DigestInput'
import { MarkdownInput } from './MarkdownInput'
import { PasswordInput } from './PasswordInput'
import isEmail from 'is-email'

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
    <styled.div
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      style={{
        border: inputFocus
          ? `2px solid rgba(44, 60, 234, 0.2)`
          : `2px solid transparent`,
        borderRadius: 10,
      }}
    >
      <textarea
        style={{
          ...style,
          display: 'block',
          resize: 'none',
          paddingTop: 8,
          minHeight: 84,
          paddingLeft: 12,
          // outline: inputFocus
          //   ? `3px solid rgba(44, 60, 234, 0.2)`
          //   : `3px solid transparent`,
          border: inputFocus
            ? `1.5px solid ${color('accent')}`
            : `1px solid ${color('border')}`,
        }}
        ref={resize}
        onInput={({ target }) => resize(target)}
        {...props}
      />
    </styled.div>
  )
}

type SingleProps = {
  type?: string
  inputRef?: RefObject<any>
  pattern?: string
  props?: any
  onKeyDown?: (e: any) => void
  onChange?: (e: any) => void
  style?: Style
}

export const Single: FC<SingleProps> = ({
  type,
  inputRef,
  pattern,
  style,
  ...props
}) => {
  if (type === 'color') {
    return <ColorInput inputRef={inputRef} {...props} />
  }

  return (
    <input
      {...props}
      type={type}
      ref={inputRef}
      pattern={pattern}
      style={{
        width: '100%',
        userSelect: 'text',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        ...style,
      }}
    />
  )
}

// type InputProps<T extends InputType = InputType> =

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
    <styled.div
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
        <styled.div
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
        </styled.div>
      ) : null}
      {children}
    </styled.div>
  )
}

type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'phone'
  | 'color'
  | 'markdown'
  | 'number'
  | 'date'
  | 'json'
  | 'multiline'
  | 'digest'

type OnChange<T extends InputType> = (
  value: T extends 'number' ? number : T extends 'date' ? number : string
) => void

export const Input = <T extends InputType>({
  autoFocus,
  bg,
  pattern,
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
  name,
  noInterrupt,
  onChange: onChangeProp,
  placeholder = 'Type something here',
  space,
  style,
  suggest,
  transform,
  type, // remove default
  value: valueProp,
  ...otherProps
}: {
  type: T // <--- this is it
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
}) => {
  const [focused, setFocused] = useState(false)
  const [value = '', setValue] = usePropState(valueProp, noInterrupt && focused)
  const { listeners: focusListeners, focus } = useFocus()
  const { listeners: hoverListeners, hover } = useHover()
  const [errorMessage, setErrorMessage] = useState('')
  const [clearValue, setClearValue] = useState(false)
  const [showJSONClearButton, setShowJSONClearButton] = useState(false)
  if (maxChars === -1) {
    maxChars = null
  }
  useEffect(() => {
    if (maxChars && value.length > maxChars) {
      setValue(value.slice(0, maxChars))
    }
  }, [value])

  const onChange = useCallback(
    (e: { target: { value: string } }) => {
      const newValue = transform ? transform(e.target.value) : e.target.value
      if (type === 'number') {
        setValue(+e.target.value)
        // @ts-ignore
        onChangeProp?.(+newValue)
      } else {
        setValue(newValue)
        // @ts-ignore
        onChangeProp?.(newValue)
      }
    },
    [onChangeProp]
  )

  const paddingLeft = ghost && icon ? 36 : ghost ? 0 : icon ? 36 : 12
  const paddingRight = ghost ? 0 : iconRight ? 36 : 12
  const fontSize = 14
  const fontWeight = 400
  const props = {
    // consoleFunc,
    name,
    type,
    value,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    autoFocus,
    style: {
      outlineRadius: '8',
      outlineOffset: ghost ? null : focus ? -1 : -1,
      borderRadius: 8,
      boxShadow: ghost ? null : `0px 1px 4px ${color('background2')}`,
      cursor: disabled ? 'not-allowed' : 'text',
      color: disabled ? color('text2:hover') : 'inherit',
      minHeight: ghost ? '' : large ? 48 : 36,
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

  useEffect(() => {
    //  check for when blurred
    if (!pattern) {
      const msg = error?.(value)
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [focused])

  useEffect(() => {
    if (type === 'email') {
      if (!isEmail(value) && value.length > 0) {
        setErrorMessage(`Please enter a valid email-address`)
      } else {
        setErrorMessage('')
      }
    }

    if (pattern) {
      const v = typeof value === 'number' ? String(value) : value
      const reOk = v === '' || new RegExp(pattern).test(v)
      const msg = error
        ? error(value, reOk)
        : reOk
        ? ''
        : 'Does not match pattern'
      if (msg) {
        setErrorMessage(msg)
      } else {
        setErrorMessage('')
      }
    }
  }, [value])

  return (
    <InputWrapper
      style={style}
      indent={indent}
      space={space}
      descriptionBottom={descriptionBottom}
      errorMessage={errorMessage}
      disabled={disabled}
    >
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 6, marginLeft: 4 }}
        />
        {value !== '' && indent && type !== 'json' && (
          <Button
            ghost
            onClick={() => {
              // @ts-ignore
              onChangeProp?.('')
              setValue('')
            }}
            disabled={disabled}
            style={{
              height: 'fit-content',
              marginTop: description ? 0 : -6,
              marginBottom: description ? 0 : 6,
            }}
          >
            Clear
          </Button>
        )}
      </styled.div>
      {/* JSON Input CLEAR BUTTON */}
      {indent && type === 'json' && showJSONClearButton && (
        <Button
          ghost
          onClick={() => {
            setShowJSONClearButton(false)
            setValue('')
            // @ts-ignore
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

      <styled.div
        style={{
          position: 'relative',
          color: color('text'),
          border: ghost
            ? `2px solid transparent`
            : focused
            ? `2px solid rgba(44, 60, 234, 0.2)`
            : `2px solid transparent`,
          borderRadius: 10,
        }}
      >
        {type !== 'json' && type !== 'markdown' && type !== 'multiline'
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

        {type === 'color' ? (
          <ColorInput
            onChange={(e) => {
              onChangeProp?.(e.target.value)
            }}
            disabled={disabled}
            value={value}
            style={{ width: '100%' }}
          />
        ) : type === 'json' ? (
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
        ) : type === 'markdown' ? (
          <MarkdownInput
            {...props}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
        ) : type === 'multiline' ? (
          <Multi {...props} />
        ) : type === 'digest' ? (
          <DigestInput
            {...props}
            disabled={!!valueProp}
            onChange={onChange}
            value={value}
          />
        ) : type === 'password' ? (
          <PasswordInput
            {...props}
            large={large}
            disabled={!!valueProp}
            onChange={onChange}
            value={value}
          />
        ) : type === 'date' ? (
          <DateTimePicker />
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
              type="text"
              {...props}
              // safari fix maybe it breaks smth
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
              style={props.style}
              // @ts-ignore
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </MaybeSuggest>
        )}
        {type === 'number' && !disabled && (
          <styled.div
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
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: color('border'),
                  },
                },
              }}
              onClick={() => {
                onChange({ target: { value: String(+value + 1) } })
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
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: color('border'),
                  },
                },
              }}
              onClick={() => {
                onChange({ target: { value: String(+value - 1) } })
              }}
            >
              <ChevronDownIcon size={9} strokeWidth={2.5} />
            </styled.div>
          </styled.div>
        )}
        {type !== 'json' && type !== 'markdown' && type !== 'multiline'
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
      </styled.div>

      {maxChars && (
        <styled.div
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
        </styled.div>
      )}
    </InputWrapper>
  )
}
