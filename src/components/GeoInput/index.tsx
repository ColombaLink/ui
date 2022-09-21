import React, { CSSProperties, FC, useState } from 'react'
import { Label, Input, RadioButtons, color, Text, ErrorIcon, Button } from '~'
import { styled } from 'inlines'
import { Space } from '~/types'

type GeoInputProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  onChange?: (value: any) => void
  style: CSSProperties
  indent?: boolean
  disabled?: boolean
  space?: Space
}

export const GeoInput: FC<GeoInputProps> = ({
  label,
  description,
  descriptionBottom,
  onChange,
  style,
  indent,
  disabled,
  space,
}) => {
  const [value, setValue] = useState<string | boolean | number>('Address')
  const [addressInput, setAddressInput] = useState<string>('')
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  return (
    <styled.div
      style={{
        borderLeft: indent ? `2px solid ${color('border')}` : 'none',
        paddingLeft: indent ? 12 : 0,
      }}
    >
      <Label label={label} description={description} space="8px" />
      <div
        style={{
          border: `1px solid ${color('border')}`,
          height: 220,
          borderRadius: 4,
        }}
      />
      <RadioButtons
        data={[{ value: 'Address' }, { value: 'Coordinates' }]}
        direction="horizontal"
        onChange={(e) => setValue(e)}
        defaultValue={value}
      />
      {value === 'Address' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder="Start typing to find a location"
            onChange={(e) => setAddressInput(e)}
            style={{ maxWidth: '80%' }}
          />
          {addressInput !== '' && (
            <Button ghost onClick={() => console.log('clear pressed')}>
              Clear
            </Button>
          )}
        </div>
      )}
      {value === 'Coordinates' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Text wrap>Latitude</Text>
          <Input
            type="number"
            placeholder="Between -90 and 90"
            onChange={(e) => setLatitude(e)}
            value={latitude}
          />
          <Text wrap style={{ marginLeft: 16 }}>
            Longitude
          </Text>
          <Input
            type="number"
            placeholder="Between -180 and 180"
            onChange={(e) => setLongitude(e)}
            value={longitude}
          />
          {latitude || longitude ? (
            <Button
              ghost
              style={{ marginLeft: 16 }}
              onClick={() => console.log('clear pressed')}
            >
              Clear
            </Button>
          ) : (
            <div style={{ minWidth: 54, marginLeft: 16 }} />
          )}
        </div>
      )}
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}

      <div
        style={{
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <ErrorIcon color="red" size={16} />
        <Text color="red">'errorMessage' kan hier</Text>
      </div>
    </styled.div>
  )
}
