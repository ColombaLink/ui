import { FC, useRef, useState, useEffect, CSSProperties } from 'react'
import {
  Label,
  Input,
  RadioButtons,
  color,
  GeoMarkerIcon,
  usePropState,
  Text,
  Callout,
  WarningIcon,
} from '~'
import { styled } from 'inlines'
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

// css required to make nav and marker work
import 'mapbox-gl/dist/mapbox-gl.css'
import { InputWrapper } from '../Input/InputWrapper'

type GeoInputProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  onChange?: (value: { latitude: number; longitude: number }) => void
  indent?: boolean
  disabled?: boolean
  mapboxApiAccessToken?: string
  mapboxStyle?: string
  style?: CSSProperties
  value?: {
    lat: number
    lng: number
  }
}

const GeoAddressInput = ({ lat, lng, token, onChange }) => {
  const [tokenIsValid, setTokenIsValid] = useState(false)

  const ref = useRef()

  // check if token is valid
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/.json?access_token=${token}`
    ).then((res) => {
      if (res.status === 200) {
        setTokenIsValid(true)
        return res.json()
      } else {
        throw new Error('Token is not valid')
      }
    })
  }, [])

  useEffect(() => {
    if (tokenIsValid) {
      const geocoder = new MapboxGeocoder({
        accessToken: token,
        types: 'country,region,place,postcode,locality,neighborhood',
        placeholder: 'Start typing to find a location',
        reverseGeocode: true,
      })

      geocoder.on(
        'result',
        ({
          result: {
            center: [lng, lat],
          },
        }) => {
          onChange({
            lng,
            lat,
          })
        }
      )

      geocoder.addTo(ref?.current)
    }
  }, [tokenIsValid])

  useEffect(() => {
    if (typeof lat === 'number' && typeof lng === 'number') {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
      )
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          const geoInputField = document.querySelector(
            '.mapboxgl-ctrl-geocoder--input'
          )
          geoInputField?.setAttribute('value', data.features[0].place_name)
          console.log('fire this data', data)
        })
        .catch((error) => {
          console.log('Not A Place', error)
        })
    }
  }, [lat, lng, token])

  return (
    <>
      {!tokenIsValid && (
        <Callout
          color="red"
          icon={<WarningIcon />}
          label=" Your Mapbox access token might be invalid"
        />
      )}
      <styled.div
        style={{
          marginBottom: 12,
          border: `1px solid ${color('border')}`,
          borderRadius: 8,
          // maxWidth: '80%',
          '& .mapboxgl-ctrl-geocoder': {
            width: '100%',
            maxWidth: '100%',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            boxShadow: `0px 1px 4px ${color('background2')}`,
          },
          '& .mapboxgl-ctrl-geocoder .suggestions': {
            boxShadow: 'none',
            backgroundColor: color('background'),
            color: color('text'),
          },
          '& .mapboxgl-ctrl-geocoder--input': {
            padding: '10px !important',
            width: '100%',
            fontSize: '14px',
            borderRadius: '8px',
            fontWeight: 400,
            backgroundColor: color('background'),
            color: color('text'),
            // pointerEvents: disabled ? 'none' : 'auto',
          },
          '& .mapboxgl-ctrl-geocoder svg': {
            display: 'none',
          },
          '& .mapboxgl-ctrl-geocoder--input:focus': {
            // outline: `2px solid ${color('accent')}`,
            border: `1px solid ${color('accent')}`,
            borderRadius: '8px',
            color: color('text'),
            outline: `3px solid rgba(44, 60, 234, 0.2)`,
          },
          '& .suggestions': {
            border: `1px solid ${color('border')}`,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            marginTop: ' -4px',
            paddingBottom: '6px',
          },
          '& .mapboxgl-ctrl-geocoder--powered-by': {
            display: 'none !important',
          },
          '& .mapboxgl-ctrl-geocoder--suggestion-title': {
            color: color('text'),
          },
          '& .mapboxgl-ctrl-geocoder--suggestion-address': {
            color: color('text2'),
          },
          '& .mapboxgl-ctrl-geocoder .suggestions > .active > a, .mapboxgl-ctrl-geocoder .suggestions > li > a:hover':
          {
            backgroundColor: color('background2'),
          },
        }}
        ref={ref}
      />
    </>
  )
}

const GeoMap = ({
  lat = 52.36516779992266,
  lng = 4.891164534406535,
  token,
  mapStyle,
  onChange,
}) => {
  const ref = useRef<MapRef>()

  const [viewport, setViewport] = useState<any>({
    latitude: lat,
    longitude: lng,
    zoom: 5,
  })

  useEffect(() => {
    setViewport({
      latitude: lat,
      longitude: lng,
      zoom: viewport.zoom,
    })
  }, [lat, lng])

  return (
    <>
      {token && (
        <Map
          ref={ref}
          {...viewport}
          mapboxAccessToken={token}
          onMove={({ viewState }) => {
            setViewport(viewState)
          }}
          mapStyle={mapStyle || 'mapbox://styles/mapbox/streets-v11'}
          style={{
            border: `1px solid ${color('border')}`,
            height: 240,
            borderRadius: 4,
            width: '100%',
          }}
          onClick={({ lngLat }) => {
            ref.current?.flyTo({
              center: [lngLat.lng, lngLat.lat],
              duration: 250,
            })
            onChange(lngLat)
          }}
        >
          <NavigationControl showCompass={false} showZoom />
          <Marker latitude={lat} longitude={lng}>
            <GeoMarkerIcon color="accent" />
          </Marker>
        </Map>
      )}
    </>
  )
}

const GeoCoordsInput = ({ lat, lng, onChange }) => {
  return (
    <>
      <Input
        label="Longitude"
        value={lng}
        type="number"
        style={{ marginBottom: 24 }}
        onChange={(lng) => onChange({ lng, lat })}
      />
      <Input
        label="Latitude"
        value={lat}
        type="number"
        onChange={(lat) => onChange({ lng, lat })}
      />
    </>
  )
}

export const GeoInput: FC<GeoInputProps> = ({
  label,
  description,
  descriptionBottom,
  onChange,
  indent,
  disabled,
  mapboxApiAccessToken,
  mapboxStyle,
  value,
  style,
}) => {
  const [radioValue, setRadioValue] = useState<string | boolean | number>(
    'Address'
  )
  const [{ lat = undefined, lng = undefined } = {}, setValue] =
    usePropState(value)
  const [errorMessage, setErrorMessage] = useState<string | null>('')

  const onChangeHandler = (val) => {
    onChange(val)
    setValue(val)
    if (Math.abs(val.lng) > 180) {
      setErrorMessage('Longitude must be between -180 and 180')
    } else if (Math.abs(val.lat) > 90) {
      setErrorMessage('Please enter a valid latitude between -90 and 90')
    } else {
      setErrorMessage('')
    }
  }

  if (mapboxApiAccessToken) {
    return (
      <InputWrapper
        disabled={disabled}
        indent={indent}
        descriptionBottom={descriptionBottom}
        errorMessage={errorMessage}
        style={style}
      >
        <Label
          label={label}
          description={description}
          style={{ marginBottom: 8 }}
        />

        <GeoMap
          mapStyle={mapboxStyle}
          lat={lat}
          lng={lng}
          token={mapboxApiAccessToken}
          onChange={onChangeHandler}
        />

        <RadioButtons
          data={[{ value: 'Address' }, { value: 'Coordinates' }]}
          direction="horizontal"
          onChange={(e) => setRadioValue(e)}
          value={radioValue}
        />
        {radioValue === 'Address' ? (
          <GeoAddressInput
            lat={lat}
            lng={lng}
            token={mapboxApiAccessToken}
            onChange={onChangeHandler}
          />
        ) : (
          <GeoCoordsInput lat={lat} lng={lng} onChange={onChangeHandler} />
        )}
      </InputWrapper>
    )
  } else {
    return (
      <>
        <Text style={{ marginBottom: 24 }}>
          AccesToken required for geolocation
        </Text>
      </>
    )
  }
}
