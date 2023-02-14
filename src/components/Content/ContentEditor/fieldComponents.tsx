import React from 'react'
import {
  Input,
  Toggle,
  DateTimePicker,
  GeoInput,
  ArrayList,
  useLocation,
} from '~'
import { SingleReference } from './References/SingleReference'
import { References } from './References/References'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'
import { RecordList } from '~/components/RecordList'
import isUrl from 'is-url-superb'
import isEmail from 'is-email'

const object = {
  default: ({ prefix, schema, field, ...props }) => {
    const [, setLocation] = useLocation()
    return (
      <ObjectList
        indent
        schema={schema}
        {...props}
        onClick={() => {
          setLocation(`${prefix}.${field}`)
        }}
      />
    )
  },
  geo: ({ description, ...props }) => {
    return (
      <GeoInput
        {...props}
        space
        indent
        descriptionBottom={description}
        mapboxApiAccessToken="pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg"
        mapboxStyle="mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge"
      />
    )
  },
}

const number = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        //   noInterrupt
        space
        type="number"
      />
    )
  },
}

const float = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        //   noInterrupt
        type="number"
        indent
        //  onChange={(e) => console.log(typeof e)}
      />
    )
  },
}

const int = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        // integer
        //    noInterrupt
        type="number"
        indent
      />
    )
  },
}

const digest = {
  default: ({ description, ...props }) => {
    // TODO make it type: digest
    return (
      <Input {...props} descriptionBottom={description} indent digest space />
    )
  },
}

const boolean = {
  default: ({ description, ...props }) => {
    return (
      <Toggle indent descriptionBottom={description} space="48px" {...props} />
    )
  },
}

const timestamp = {
  default: ({ description, ...props }) => (
    <DateTimePicker
      descriptionBottom={description}
      indent
      {...props}
      value={props.value}
      error={(value) => {
        if (!value) {
          return 'Please enter a valid value'
        }
      }}
    />
  ),
}

const references = {
  default: References,
}

const reference = {
  default: SingleReference,
}

const json = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        indent
        jsonInput
      />
    )
  },
}

const array = {
  default: ({ description, onChange, ...props }) => {
    return (
      <ArrayList
        {...props}
        description={description}
        onChange={onChange}
        indent
        space
      />
    )
  },
}

const set = {
  default: ({ description, onChange, ...props }) => {
    return (
      <SetList
        description={description}
        onChange={onChange}
        indent
        {...props}
      />
    )
  },
}

const record = {
  default: ({ prefix, field, label, value, description, schema, ...props }) => {
    const [, setLocation] = useLocation()
    return (
      <RecordList
        label={label}
        schema={schema}
        description={description}
        value={value}
        onClick={() => {
          //  console.log('get value back?', value)
          setLocation(`${prefix}.${field}`)
        }}
        {...props}
      />
    )
  },
}

const string = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        space
        // type="text" is for safari fix maybe it breaks smth
        type="text"
        //  noInterrupt
      />
    )
  },
  url: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      descriptionBottom={description}
      indent
      space
      // noInterrupt
      error={(value) => {
        if (!isUrl(value) && value.length > 0) {
          return `Please enter a valid url https://...`
        }
      }}
      onChange={(value) => {
        if (meta.format === 'url') {
          if (isUrl(value) || value.length < 1) {
            onChange(value)
          }
        }
      }}
    />
  ),
  email: ({ description, meta, onChange, ...props }) => {
    return (
      <Input
        {...props}
        maxChars={200}
        descriptionBottom={description}
        indent
        space
        //  noInterrupt
        error={(value) => {
          if (!isEmail(value) && value.length > 0) {
            return `Please enter a valid email-address`
          }
        }}
        onChange={(value) => {
          if (meta.format === 'email') {
            if (isEmail(value) || value.length < 1) {
              onChange(value)
            }
          }
        }}
      />
    )
  },
  markdown: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        indent
        markdownInput
        //    noInterrupt
      />
    )
  },
}

const text = string

// all selva types should be here else it can crash....

export {
  boolean,
  reference,
  references,
  string,
  number,
  float,
  int,
  digest,
  object,
  text,
  timestamp,
  json,
  array,
  set,
  record,
}
