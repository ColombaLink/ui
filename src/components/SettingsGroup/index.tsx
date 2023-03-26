import React, { FC, useMemo, ReactNode } from 'react'
import {
  Input,
  Label,
  RowSpaced,
  border,
  Text,
  styled,
  Checkbox,
  Style,
  Accept,
  SelectOption,
  Select,
  RowEnd,
  Row,
} from '~'

const Empty = styled('div', {
  minWidth: 350,
  width: 350,
})

const Group: FC<{ children: ReactNode; style?: Style }> = ({
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
    </RowSpaced>
  )
}

export const SettingsField: FC<{
  item: SettingGroupItem
  value?: any
  style?: Style
  width?: number
  onChange: (field: string, value: any) => void
}> = ({
  width = 140,
  item: { type, field, label, description, options },
  value,
  style,
  onChange,
}) => {
  if (!label) {
    label = useMemo(
      () => field[0].toUpperCase() + field.slice(1).replace('.', ' '),
      [field]
    )
  }

  if (options) {
    return (
      <Label
        style={{
          margin: 8,
        }}
        labelWidth={140}
        direction="row"
        label="Threat sensitivity"
        description="Auto block ips"
      >
        <Select style={{ width: 185 }} options={options} />
      </Label>
    )
  }

  if (type === 'range') {
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
        <Row>
          <Input
            onChange={(v) => {
              //   if (max < v) {
              //     setMax(v)
              //   }
              //   setMin(v)
            }}
            value={value?.min}
            style={{ marginRight: 8, width: 90 }}
            type="number"
            placeholder="Min"
          />
          <Input
            onChange={(v) => {
              //   if (v < min) {
              //     setMin(v)
              //   }
              //   setMax(v)
            }}
            value={value?.max}
            style={{ width: 90 }}
            type="number"
            placeholder="Max"
          />
        </Row>
      </Label>
    )
  }

  if (type === 'text' || type === 'number') {
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

  if (type === 'boolean') {
    return (
      <Checkbox
        style={{
          marginRight: 32,
          marginBottom: 8,
        }}
        label={label}
      />
    )
  }
}

export type SettingGroupItem = {
  label?: ReactNode
  value?: any
  type?: 'number' | 'text' | 'range' | 'boolean'
  description?: ReactNode
  field: string
  options?: SelectOption[]
}

export type SettingsGroupProps = {
  onChange: (changes: { [field: string]: any }) => void
  values?: { [field: string]: any }
  data:
    | SettingGroupItem[]
    | {
        [field: string]:
          | ReactNode
          | (Omit<SettingGroupItem, 'field'> & { field?: string })
      }
  allwaysAccept?: boolean
}

export const SettingsGroup: FC<SettingsGroupProps> = ({
  onChange,
  data,
  allwaysAccept,
  values,
}) => {
  const onChangeField = (field: string, value: any) => {
    console.info(field, value)
  }

  let parsedData: SettingGroupItem[]

  if (!Array.isArray(data)) {
    for (const field in data) {
      const item = data[field]
      if (typeof item === 'object' && !React.isValidElement(item)) {
        parsedData.push({ ...item, field })
      } else {
        parsedData.push({
          field,
          label: item,
        })
      }
    }
  } else {
    parsedData = data
  }

  const checkBoxes: ReactNode[] = []
  const rest: ReactNode[] = []

  for (const d of parsedData) {
    if (d.type === 'boolean') {
      checkBoxes.push(
        <SettingsField
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={d.value || values?.p[d.field]}
        />
      )
    } else {
      rest.push(
        <SettingsField
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={d.value || values?.p[d.field]}
        />
      )
    }
  }

  if (rest.length) {
    rest.push(<Empty />, <Empty />, <Empty />)
  }

  if (checkBoxes.length) {
    checkBoxes.push(<Empty />, <Empty />, <Empty />)
  }

  return (
    <Group>
      {rest}
      {checkBoxes.length && rest.length ? (
        <Row
          style={{
            width: '100%',
            borderTop: border(1),
            marginTop: 16,
            padding: 8,
            paddingTop: 16,
            flexWrap: 'wrap',
          }}
        >
          {checkBoxes}
        </Row>
      ) : (
        checkBoxes
      )}
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
    </Group>
  )
}
