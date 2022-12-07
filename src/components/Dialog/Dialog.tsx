import { styled } from 'inlines'
import React, {
  forwardRef,
  ElementRef,
  ComponentProps,
  ReactNode,
  Fragment,
  useRef,
  useState,
  useEffect,
} from 'react'
import { useDialog } from './useDialog'
import { Text } from '../Text'
import { useHotkeys } from '~/hooks'
import { Button } from '../Button'
import { ScrollArea } from '../ScrollArea'
import { color } from '~/utils'

const Container = styled('div', {
  width: 632,
  maxHeight: 'calc(100vh - 30px)',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)',
  backgroundColor: color('background2dp'),
})

const ScrollBody = styled('div', {
  paddingTop: '16px',
  paddingLeft: '32px',
  paddingRight: '32px',
  paddingBottom: '0px',
  width: '100%',
  '&>:last-child': {
    paddingBottom: 'var(--dialogPadding) !important',
  },
})

const StyledButtons = styled('div', {
  position: 'sticky',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingTop: 'var(--dialogPadding)',
  backgroundColor: color('background2dp'),
  paddingBottom: 'var(--dialogPadding)',
})

const ButtonsWithBorder = styled(StyledButtons, {
  borderTop: `1px solid ${color('border')}`,
  marginTop: 48,
  paddingTop: 24,
  paddingLeft: 24,
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  paddingRight: 24,
  marginLeft: 'calc(-1 * var(--dialogPadding))',
  marginRight: 'calc(-1 * var(--dialogPadding))',
})

const ButtonSpacer = styled('div', {
  width: 16,
})

const BodySpacer = styled('div', {
  height: 24,
  '&:first-child': {
    display: 'none',
  },
})

const Label = (props) => {
  return (
    <Text weight={600} size="18px" {...props} style={{ marginBottom: 24 }} />
  )
}

const Body = ({ children }) => {
  if (typeof children === 'string') {
    return <div>{children}</div>
  } else if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => (
          <Body key={index}>{child}</Body>
        ))}
      </>
    )
  } else {
    return (
      <>
        <BodySpacer />
        {children}
      </>
    )
  }
}

const Buttons = ({ children, border = null }) => {
  if (Array.isArray(children)) {
    children = children.map((child, index) => {
      return index ? (
        <Fragment key={index}>
          <ButtonSpacer />
          {child}
        </Fragment>
      ) : (
        child
      )
    })
  }
  return border ? (
    <ButtonsWithBorder>{children}</ButtonsWithBorder>
  ) : (
    <StyledButtons>{children}</StyledButtons>
  )
}

const Confirm = ({ children = 'OK', onConfirm, ...props }) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)
  const onClick = onConfirm
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onConfirm()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  return (
    <Button large onClick={onClick} {...props} actionKeys={['Enter']}>
      {children}
    </Button>
  )
}

const Cancel = ({
  children = 'Cancel (Esc)',
  onCancel = null,
  style = null,
  ...props
}) => {
  const dialog = useDialog()
  const { current: myId } = useRef(dialog._id)

  const onClick = onCancel
    ? async () => {
        if (!props.disabled && myId === dialog._id) {
          await onCancel()
          dialog.close(myId)
        }
      }
    : () => {
        if (!props.disabled && myId === dialog._id) {
          dialog.close(myId)
        }
      }

  useHotkeys([['escape', onClick]])

  return (
    <Button
      large
      onClick={onClick}
      outline
      color="text"
      light
      style={{
        borderColor: color('border'),
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export interface DialogProps extends ComponentProps<typeof Container> {
  children?: ReactNode
  label?: string
  padding?: number
  pure?: boolean
}

export const Dialog = Object.assign(
  forwardRef<ElementRef<typeof Container>, DialogProps>(
    (
      { children, label, padding = 24, style, pure, ...props },
      forwardedRef
    ) => {
      if (typeof children === 'string') {
        if (!label) {
          label = children
          children = null
        } else {
          children = <Body>{children}</Body>
        }
      }

      const [go, setgo] = useState(false)
      useEffect(() => {
        const x = requestAnimationFrame(() => {
          setgo(true)
        })
        return () => {
          cancelAnimationFrame(x)
        }
      }, [])

      return (
        <Container
          style={{
            transition: 'transform 0.15s, opacity 0.15s',
            opacity: go ? 1 : 0,
            transform: go ? 'scale(1)' : 'scale(0.9)',
            ...style,
          }}
          ref={forwardedRef}
          {...props}
        >
          {label && (
            <div
              style={{
                // borderBottom: `1px solid ${color('border')}`,
                padding: '24px 32px 8px 32px',
              }}
            >
              {Array.isArray(label) ? (
                label?.map((item, idx) =>
                  idx === 0 ? (
                    <Text key={idx} weight={600} size="18px" space="24px">
                      {item}
                    </Text>
                  ) : (
                    <div key={idx}>{item}</div>
                  )
                )
              ) : (
                <Text weight={600} size="18px" space="24px">
                  {label}
                </Text>
              )}
            </div>
          )}
          {pure ? (
            children
          ) : (
            <ScrollArea>
              <ScrollBody
                style={{
                  '--dialogPadding': `${padding}px`,
                }}
              >
                {children}
              </ScrollBody>
            </ScrollArea>
          )}
        </Container>
      )
    }
  ),
  {
    Label,
    Body,
    Buttons,
    Confirm,
    Cancel,
  }
)
