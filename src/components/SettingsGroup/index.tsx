import React, { FC, useMemo, ReactNode, useRef, useState } from 'react'
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
import { useUpdate } from '~/hooks/useUpdate'

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
  width = 160,
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
          ...style,
        }}
        labelWidth={width}
        direction="row"
        label="Threat sensitivity"
        description="Auto block ips"
      >
        <Select
          value={value}
          style={{ width: 185 }}
          onChange={(v) => {
            onChange(field, v)
          }}
          options={options}
        />
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
              if (value?.max === undefined || value?.max < v) {
                onChange(field + '.max', v)
              }
              onChange(field + '.min', v)
            }}
            value={value?.min}
            style={{ marginRight: 8, width: 90 }}
            type="number"
            placeholder="Min"
          />
          <Input
            onChange={(v) => {
              if (value?.min === undefined || v < value?.min) {
                onChange(field + '.min', v)
              }
              onChange(field + '.max', v)
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

  if (type === 'boolean') {
    return (
      <Checkbox
        checked={value}
        onChange={(v) => onChange(field, v)}
        style={{
          marginRight: 32,
          marginBottom: 8,
        }}
        label={label}
      />
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
        value={value ?? ''}
        type={type || 'text'}
        onChange={(v) => onChange(field, v)}
      />
    </Label>
  )
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
  style?: Style
  labelWidth?: number
  onChange: (changes: { [field: string]: any }) => void
  values?: { [field: string]: any }
  data?:
    | SettingGroupItem[]
    | {
        [field: string]:
          | ReactNode
          | (Omit<SettingGroupItem, 'field'> & { field?: string })
      }
  allwaysAccept?: boolean
}

const getValue = (field, values?: { [field: string]: any }): any => {
  const path = field.split('.')
  let v = values
  for (const f of path) {
    if (v === undefined || v === null) {
      return undefined // or emptty string...
    }
    v = v[f]
  }
  return v
}

const setValue = (field, values: { [field: string]: any }, value: any) => {
  const path = field.split('.')
  let v = values
  for (let i = 0; i < path.length - 1; i++) {
    const f = path[i]
    v = v[f] ?? (v[f] = {})
  }
  v[path[path.length - 1]] = value
}

const emptyDivs = (arr: ReactNode[]) => {
  for (let i = 0; i < 5; i++) {
    arr.push(<Empty key={'e' + i} />)
  }
}

const equalChanges = (
  changes: { [key: string]: any },
  values: { [key: string]: any }
): boolean => {
  for (const key in changes) {
    const c = changes[key]
    const v = values[key]
    const cType = typeof c
    const vType = typeof v
    if (cType !== vType) {
      return false
    }
    if (cType === 'object' && c !== null) {
      if (v === null) {
        return false
      }
      if (!equalChanges(c, v)) {
        return false
      }
    } else if (c !== v) {
      return false
    }
  }
  return true
}

export const SettingsGroup: FC<SettingsGroupProps> = ({
  onChange,
  data = [],
  style,
  allwaysAccept,
  labelWidth = 160,
  values,
}) => {
  const valuesChanged = useRef<{ [field: string]: any }>({})

  const [hasChanges, setChanges] = useState(false)
  const update = useUpdate()

  const onChangeField = (field: string, value: any) => {
    if (allwaysAccept) {
      const newV = {}
      setValue(field, newV, value)
      onChange(newV)
    } else {
      setChanges(true)
      setValue(field, valuesChanged.current, value)
      if (values && equalChanges(valuesChanged.current, values)) {
        setChanges(false)
      } else {
        update()
      }
    }
  }

  let parsedData: SettingGroupItem[]

  if (!Array.isArray(data)) {
    parsedData = []
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
          width={labelWidth}
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={
            d.value ?? hasChanges
              ? getValue(d.field, valuesChanged.current) ??
                getValue(d.field, values)
              : getValue(d.field, values)
          }
        />
      )
    } else {
      rest.push(
        <SettingsField
          width={labelWidth}
          key={d.field}
          item={d}
          onChange={onChangeField}
          value={
            d.value ?? hasChanges
              ? getValue(d.field, valuesChanged.current) ??
                getValue(d.field, values)
              : getValue(d.field, values)
          }
        />
      )
    }
  }

  if (rest.length) {
    emptyDivs(rest)
  }

  if (checkBoxes.length) {
    emptyDivs(checkBoxes)
  }

  return (
    <Group style={style}>
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
      {allwaysAccept || !hasChanges ? null : (
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
              valuesChanged.current = {}
              setChanges(false)
            }}
            onAccept={async () => {
              onChange(valuesChanged.current)
              valuesChanged.current = {}
              setChanges(false)
            }}
          />
        </RowEnd>
      )}
    </Group>
  )
}
