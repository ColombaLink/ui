import React, { FC, Fragment, useState } from 'react'
import {
  useDialog,
  Text,
  removeOverlay,
  Label,
  Thumbnail,
  MasonryGrid,
  Input,
  SearchIcon,
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
  files,
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
  'Rich formatted data': {
    email,
    url,
    geo,
  },
  'Plain formatted data': {
    dateTime,
    timestamp,
    createdBy,
    boolean,
  },
  'References and files': {
    reference,
    references,
    file,
    files,
  },
  Numbers: {
    number,
    float,
    int,
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
        borderRadius: 4,
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
        ghost
        onChange={searchFilterHandler}
        style={{
          marginTop: -4,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 8,
        }}
      />
      <div style={{ borderBottom: `1px solid ${colorFn('border')}` }} />
      <Text
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginBottom: filteredItems ? 0 : -20,
        }}
        weight="700"
        space="0px"
      >
        Add Field
      </Text>
      <Section>
        <MasonryGrid
          style={{
            marginBottom: 20,
            padding: 0,
            marginLeft: -14,
          }}
          gap={5}
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
                      style={{ paddingLeft: 20, marginTop: 20 }}
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
          {/* {Object.keys(filteredObj).map((template: FieldTemplates) => {
            if (templates[template]?.hidden) {
              return null
            }

            return (
              <React.Fragment key={template}>
                {templates[template]?.categoryTitle && !isSearching && (
                  <Text
                    color="text2"
                    space="12px"
                    style={{ paddingLeft: 20, marginTop: 20 }}
                  >
                    {templates[template]?.categoryTitle}
                  </Text>
                )}
                <Template
                  template={template}
                  onClick={() => {
                    removeOverlay()
                    open(
                      <FieldModal type={type} template={template} path={path} />
                    )
                  }}
                  style={{
                    '&:hover': {
                      background: color('border'),
                    },
                  }}
                />
              </React.Fragment>
            )
          })} */}
        </MasonryGrid>
      </Section>
    </div>
  )
}
