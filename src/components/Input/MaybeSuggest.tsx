
import { styled } from '~'

export const MaybeSuggest = (props) =>
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
