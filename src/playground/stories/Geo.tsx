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
              onChange: (value) => console.log(value),
            },
          },
        ]}
      />
    </div>
  )
}
