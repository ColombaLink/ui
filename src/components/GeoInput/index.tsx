import React, {
  CSSProperties,
  FC,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react'
import {
  Label,
  Input,
  RadioButtons,
  color,
  Text,
  ErrorIcon,
  Button,
  GeoMarkerIcon,
} from '~'
import { styled } from 'inlines'
import { Space } from '~/types'
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// css required to make nav and marker work
import 'mapbox-gl/dist/mapbox-gl.css'

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
  const [latitude, setLatitude] = useState<number>(52.36516779992266)
  const [longitude, setLongitude] = useState<number>(4.891164534406535)
  const [changeCounter, setChangeCounter] = useState<number>(0)

  // put in .env.local
  const MAPBOX_TOKEN_COWBOYBEER =
    'pk.eyJ1IjoiY293Ym95YmVlciIsImEiOiJjbDhjcm4zOXQwazI5M29waHRoM3V1bGwxIn0.y9EmrPBCd26rMGuZ7UlFjA'

  const [viewport, setViewport] = useState<any>({
    latitude: latitude,
    longitude: longitude,
    zoom: 5,
  })

  const mapRef = useRef<MapRef>()

  const onSelectPlace = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 1500 })
  }, [])

  // Geocoder shizzle
  useEffect(() => {
    geocoder.addTo('#geocoder')
  }, [])

  useEffect(() => {
    onSelectPlace({ longitude, latitude })
  }, [changeCounter])

  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_TOKEN_COWBOYBEER,
    types: 'country,region,place,postcode,locality,neighborhood',
  })

  // als result geselecteerd wordt
  geocoder.on('result', (e) => {
    console.log(e.result)
    setLatitude(e.result.center[1])
    setLongitude(e.result.center[0])
  })

  // console.log('map', map)

  return (
    <styled.div
      style={{
        borderLeft: indent ? `2px solid ${color('border')}` : 'none',
        paddingLeft: indent ? 12 : 0,
      }}
    >
      <Label label={label} description={description} space="8px" />

      <Map
        ref={mapRef}
        {...viewport}
        mapboxAccessToken={MAPBOX_TOKEN_COWBOYBEER}
        onMove={(e) => setViewport(e)}
        mapStyle="mapbox://styles/cowboybeer/cl8ct97kg007d15s1ku1vn231"
        style={{
          border: `1px solid ${color('border')}`,
          height: 240,
          borderRadius: 4,
          width: '100%',
        }}
        onClick={(e) => {
          console.log('click', e)
          setLongitude(e.lngLat.lng)
          setLatitude(e.lngLat.lat)

          // // move to this new center location
          setChangeCounter(changeCounter + 1)

          // mapRef.flyTo({ center: [e.lngLat.lng, e.lngLat.lat] })
          console.log(e.lngLat.lat, e.lngLat.lng)
        }}
      >
        <NavigationControl showCompass={false} showZoom />
        <Marker latitude={latitude} longitude={longitude}>
          <GeoMarkerIcon color="accent" />
        </Marker>
      </Map>

      <RadioButtons
        data={[{ value: 'Address' }, { value: 'Coordinates' }]}
        direction="horizontal"
        onChange={(e) => setValue(e)}
        defaultValue={value}
      />

      <styled.div
        style={{
          marginBottom: 12,
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          maxWidth: '80%',
        }}
        id="geocoder"
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
            onBlur={() => setChangeCounter(changeCounter + 1)}
          />
          <Text wrap style={{ marginLeft: 16 }}>
            Longitude
          </Text>
          <Input
            type="number"
            placeholder="Between -180 and 180"
            onChange={(e) => setLongitude(e)}
            value={longitude}
            onBlur={() => setChangeCounter(changeCounter + 1)}
          />
          {true ? (
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
