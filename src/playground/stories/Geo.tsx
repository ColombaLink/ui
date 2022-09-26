import React from 'react'
import { GeoInput } from '~'
import ComponentViewer from '../ComponentViewer'

export const Geo = () => {
  return (
    <div>
      <ComponentViewer
        component={GeoInput}
        propsName="GeoInputProps"
        examples={[
          {
            props: {
              label: 'Geo',
              description: 'Description',
              descriptionBottom: 'Description bottom',
              mapboxApiAccessToken:
                'pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg',
              mapboxStyle: 'mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge',
            },
          },
          {
            props: {
              label: 'Geo',
              mapboxApiAccesToken:
                'pk.eyJ1IjoiY293Ym95YmVlciIsImEiOiJjbDhjcm4zOXQwazI5M29waHRoM3V1bGwxIn0.y9EmrPBCd26rMGuZ7UlFjA',
              mapboxStyle: 'mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge',
            },
          },
        ]}
      />
      {/* Geo:
      <GeoInput
        label="Geo input"
        descriptionBottom="Description at the very bottom"
        indent
      /> */}
    </div>
  )
}
