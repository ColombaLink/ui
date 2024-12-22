import { FC, ReactNode } from 'react'
import {
  Label,
  color,
  border,
  CheckIcon,
  DashIcon,
  useHover,
  usePropState,
  Color,
  Style,
  Center,
  Row,
} from '~'

export type CheckboxProps = {
  value?: boolean
  indeterminate?: boolean
  description?: string
  style?: Style
  onChange?: (value: boolean) => void
  label?: ReactNode
  wrap?: boolean
  small?: boolean
  color?: Color
  onClick?: (e: any) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  value: valueProp,
  indeterminate,
  description,
  style,
  onChange,
  onClick,
  wrap,
  label,
  small,
  color: colorProp = 'accent',
  ...props
}) => {
  const [checked, setChecked] = usePropState(valueProp)
  const { listeners, hover } = useHover()

  const clickHandler = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <button
      onClick={(e) => {
        clickHandler()
        if (onClick) {
          onClick(e)
        }
      }}
      style={{
        display: 'flex',
        alignItems: !description ? 'center' : '',
        ...style,
      }}
      {...listeners}
    >
      <Row
        style={{
          border: ' 2px solid rgba(0,0,0,0)',
          borderRadius: 4,
          boxSizing: 'border-box',
          height: small ? 18 : 22,
          width: small ? 18 : 22,
          marginRight: 12,
          '@media (hover: hover)': {
            '&:hover': {
              border: '2px solid rgba(44,60,234,0.2)',
            },
          },
        }}
      >
        <Center
          style={{
            backgroundColor: checked
              ? color(colorProp, hover ? 'hover' : null)
              : null,
            border: border(1),
            borderRadius: 4,
            height: small ? 16 : 20,
            width: small ? 16 : 20,
            marginRight: 12,
            marginLeft: -1,
            flexShrink: 0,
          }}
          {...props}
        >
          {checked && indeterminate ? (
            <DashIcon size={small ? 10 : 14} color="accent:contrast" />
          ) : checked ? (
            <CheckIcon size={small ? 12 : 14} color="accent:contrast" />
          ) : null}
        </Center>
      </Row>
      <Label
        wrap={wrap}
        label={label}
        description={description}
        style={{ textAlign: 'left' }}
      />
    </button>
  )
}
