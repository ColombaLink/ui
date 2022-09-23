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
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// css required to make nav and marker work
import 'mapbox-gl/dist/mapbox-gl.css'

type GeoInputProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  onChange?: (value: any) => void
  style?: CSSProperties
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
  const [radioValue, setRadioValue] = useState<string | boolean | number>(
    'Address'
  )
  const [address, setAddress] = useState<string>('')
  const [latitude, setLatitude] = useState<any>(52.36516779992266)
  const [longitude, setLongitude] = useState<any>(4.891164534406535)
  const [changeCounter, setChangeCounter] = useState<number>(0)

  const [errorMessage, setErrorMessage] = useState<string | null>('')

  // put in .env.local
  const MAPBOX_TOKEN_COWBOYBEER =
    'pk.eyJ1IjoiY293Ym95YmVlciIsImEiOiJjbDhjcm4zOXQwazI5M29waHRoM3V1bGwxIn0.y9EmrPBCd26rMGuZ7UlFjA'

  // For Reverse Geocoding
  // Fetch this url with the lat and long & Token API
  //  https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiY293Ym95YmVlciIsImEiOiJjbDhjcm4zOXQwazI5M29waHRoM3V1bGwxIn0.y9EmrPBCd26rMGuZ7UlFjA

  const [viewport, setViewport] = useState<any>({
    latitude: latitude,
    longitude: longitude,
    zoom: 5,
  })

  const mapRef = useRef<MapRef>()

  const onSelectPlace = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 1500 })

    console.log('FIRESD')
  }, [])

  // Geocoder shizzle
  useEffect(() => {
    geocoder.addTo('#geocoder')
  }, [])

  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_TOKEN_COWBOYBEER,
    types: 'country,region,place,postcode,locality,neighborhood',
    placeholder: 'Start typing to find a location',
    reverseGeocode: true,
  })

  // als result geselecteerd wordt
  geocoder.on('result', (e) => {
    console.log(e)
    setLatitude(e.result.center[1])
    setLongitude(e.result.center[0])
    setChangeCounter((changeCounter) => (changeCounter += 1))
  })

  useEffect(() => {
    onSelectPlace({ longitude, latitude })
  }, [changeCounter])

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
          setLongitude(e.lngLat.lng)
          setLatitude(e.lngLat.lat)
          setChangeCounter(changeCounter + 1)
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
        onChange={(e) => setRadioValue(e)}
        defaultValue={radioValue}
      />

      {radioValue === 'Address' && (
        <styled.div
          style={{
            marginBottom: 12,
            border: `1px solid ${color('border')}`,
            borderRadius: 4,
            maxWidth: '80%',
            '& .mapboxgl-ctrl-geocoder': {
              width: '100%',
              maxWidth: '100%',
            },
            '& .mapboxgl-ctrl-geocoder, .suggestions': {
              boxShadow: 'none',
            },
            '& .mapboxgl-ctrl-geocoder--input': {
              padding: '10px !important',
              width: '100%',
            },
            '& .mapboxgl-ctrl-geocoder svg': {
              display: 'none',
            },
            '& .mapboxgl-ctrl-geocoder--input:focus': {
              outline: 'none',
              border: `2px solid ${color('accent')}`,
              borderRadius: '4px',
              color: color('text'),
            },
          }}
          id="geocoder"
        />
      )}
      {radioValue === 'Coordinates' && (
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
            onChange={(e) => {
              if (e <= 90 && e >= -90) {
                setLatitude(e)
                setErrorMessage('')
              } else {
                setErrorMessage(
                  'Please enter a valid latitude between -90 and 90'
                )
              }
            }}
            value={latitude}
            onBlur={() => setChangeCounter(changeCounter + 1)}
          />
          <Text wrap style={{ marginLeft: 16 }}>
            Longitude
          </Text>
          <Input
            type="number"
            placeholder="Between -180 and 180"
            onChange={(e) => {
              if (e <= 180 && e >= -180) {
                setLongitude(e)
                setErrorMessage('')
              } else {
                setErrorMessage('Longitude must be between -180 and 180')
              }
            }}
            value={longitude}
            onBlur={() => setChangeCounter(changeCounter + 1)}
          />
          {longitude || latitude ? (
            <Button
              ghost
              style={{ marginLeft: 16 }}
              onClick={() => {
                setLatitude('')
                setLongitude('')
              }}
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

      {errorMessage && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <ErrorIcon color="red" size={16} />
          <Text color="red">{errorMessage}</Text>
        </div>
      )}
    </styled.div>
  )
}
