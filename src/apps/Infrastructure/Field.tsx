import React, { FC, useMemo, ReactNode } from 'react'
import {
  Input,
  Label,
  RowSpaced,
  border,
  Text,
  styled,
  Style,
  Accept,
  RowEnd,
} from '~'

export const Empty = styled('div', {
  minWidth: 350,
  width: 350,
})

export const Settings: FC<{ children: ReactNode; style?: Style }> = ({
  children,
  style,
}) => {
  return (
    <RowSpaced
      style={{
        ...style,
        borderTop: border(1),
        marginLeft: -8,
        marginRight: -8,
        marginTop: 16,
        paddingTop: 8,
        flexWrap: 'wrap',
      }}
    >
      {children}
      <RowEnd
        style={{
          borderTop: border(1),
          width: '100%',
          marginTop: 16,
          paddingTop: 16,
          marginRight: 8,
        }}
      >
        <Text color="text2">Apply changes</Text>
        <Accept
          onCancel={() => {
            //   setMin(config.min)
            //   setMax(config.max)
          }}
          onAccept={async () => {}}
        />
      </RowEnd>
    </RowSpaced>
  )
}

export const Field: FC<{
  type?: 'number' | 'text'
  field: string
  style?: Style
  value?: any
  width?: number
  onChange: (field: string, value: any) => void
  label?: string
  description?: string
}> = ({
  width = 140,
  value,
  style,
  type = 'text',
  onChange,
  field,
  label,
  description,
}) => {
  if (!label) {
    label = useMemo(
      () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
      [field]
    )
  }
  return (
    <Label
      style={{
        margin: 8,
        ...style,
      }}
      labelWidth={width}
      direction="row"
      label={label}
      description={description}
    >
      <Input
        style={{ width: '100%', marginTop: 8 }}
        placeholder={label}
        value={value}
        type={type}
        onChange={(v) => onChange(field, v)}
      />
    </Label>
  )
}
