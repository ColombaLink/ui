import React, { FC, Fragment, useState } from 'react'
import {
  useDialog,
  Text,
  removeOverlay,
  Label,
  Thumbnail,
  Grid,
  Input,
  SearchIcon,
  color,
} from '~'
import { color as colorFn } from '~/utils'
import { styled } from 'inlines'
import { FieldTemplates, templates } from '../templates'
import { FieldModal } from '../FieldModal'

const Section = styled('div', {
  marginTop: 20,
  display: 'flex',
  marginLeft: 14,
  flexWrap: 'wrap',
  marginBottom: 10,
})

const {
  string,
  text,
  markdown,
  digest,
  email,
  url,
  geo,
  dateTime,
  timestamp,
  createdBy,
  boolean,
  reference,
  references,
  file,
  // files,
  number,
  float,
  int,
  array,
  object,
  record,
  set,
  json,
} = templates
const items = {
  'Text and String': {
    string,
    text,
    markdown,
    digest,
  },

  'Plain formatted data': {
    dateTime,
    timestamp,
    createdBy,
    boolean,
  },
  'Numbers and ID': {
    number,
    float,
    int,
  },
  'Rich formatted data': {
    email,
    url,
    geo,
  },
  'References and files': {
    reference,
    references,
    file,
    // files,
  },

  'Complex data structures': {
    array,
    object,
    record,
    set,
    json,
  },
}

const Template = ({ template, type, path }) => {
  const { label, description, icon, color } = templates[template]
  const { open } = useDialog()

  return (
    <styled.div
      onClick={() => {
        removeOverlay()
        open(<FieldModal type={type} template={template} path={path} />)
      }}
      style={{
        alignItems: 'center',
        borderRadius: 8,
        cursor: 'pointer',
        display: 'flex',
        marginBottom: 3,
        marginLeft: 6,
        marginRight: 6,
        userSelect: 'none',
        width: 284,
        padding: '8px 16px',
        '&:hover': {
          background: colorFn('border'),
        },
      }}
    >
      <Thumbnail
        outline
        size={32}
        icon={icon}
        color={color}
        style={{
          marginRight: 16,
        }}
      />
      <Label label={label} description={description} />
    </styled.div>
  )
}

export const SelectFieldTypeModal: FC<{
  type: string
  path?: string[]
}> = ({ type, path = [] }) => {
  const [filteredItems, setFilteredItems] = useState<string[]>(null)

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredItems(null)
      return
    }

    const filteredArr = []
    for (const header in items) {
      for (const template in items[header]) {
        if (template.toLowerCase().includes(value.toLowerCase())) {
          filteredArr.push(template)
        }
      }
    }

    setFilteredItems(filteredArr)
  }

  return (
    <div>
      <Input
        icon={<SearchIcon />}
        placeholder="Search and discover"
        space="0px"
        onChange={searchFilterHandler}
        ghost
        style={{
          backgroundColor: color('background2'),
          boxShadow: '0px',
          outline: 'none',
          height: 40,
          alignItems: 'center',
          borderRadius: 8,
          paddingTop: '6px',
          paddingBottom: '6px',
          marginLeft: 24,
          marginRight: 24,
          marginTop: 20,
        }}
      />
      <Section>
        <Grid
          style={{
            marginBottom: 20,
            padding: 0,
            marginLeft: 0,
          }}
          gap={5}
          itemWidth={234}
        >
          {filteredItems
            ? filteredItems.map((template: FieldTemplates) => {
                // put template
                return (
                  <Template
                    key={template}
                    type={type}
                    path={path}
                    template={template}
                  />
                )
              })
            : Object.keys(items).map((header) => {
                return (
                  <Fragment key={header}>
                    <Text
                      color="text2"
                      space="12px"
                      style={{ paddingLeft: 20, marginTop: 12 }}
                    >
                      {header}
                    </Text>
                    {Object.keys(items[header]).map(
                      (template: FieldTemplates) => {
                        // put template
                        return (
                          <Template
                            key={template}
                            type={type}
                            path={path}
                            template={template}
                          />
                        )
                      }
                    )}
                  </Fragment>
                )
              })}
        </Grid>
      </Section>
    </div>
  )
}
