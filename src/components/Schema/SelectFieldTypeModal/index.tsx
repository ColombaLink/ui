import React, { FC, useState } from 'react'
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
import { color } from '~/utils'
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

const Template = ({ template, onClick, style }) => {
  const { label, description, icon, color } = templates[template]

  return (
    <styled.div
      onClick={onClick}
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
        ...style,
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
  const { open } = useDialog()

  const [filteredObj, setFilteredObj] = useState<Object>(templates)

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredObj(menuItems)
      return
    }

    const filteredArr = []
    for (const key in menuItems) {
      for (const subKey in menuItems[key]) {
        if (subKey.toLowerCase().includes(value.toLowerCase())) {
          filteredArr.push([subKey, menuItems[key][subKey]])
        }
      }
    }

    // nu van array weer object maken
    const filteredObjTest = Object.fromEntries(filteredArr)
    setFilteredObj({ Results: filteredObjTest })
  }

  return (
    <div>
      <Input
        icon={<SearchIcon />}
        placeholder="Search and discover"
        space="0px"
        onChange={(e) => searchFilterHandler(e)}
        style={{
          marginTop: -4,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 8,
          outline: '0px',
        }}
      />
      <div style={{ borderBottom: `1px solid ${color('border')}` }} />
      <Text
        style={{ marginTop: 20, marginLeft: 20, marginBottom: -20 }}
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
          {Object.keys(templates).map((template: FieldTemplates) => {
            if (templates[template].hidden) {
              return null
            }

            return (
              <React.Fragment key={template}>
                {templates[template].categoryTitle && (
                  <Text
                    color="text2"
                    space="12px"
                    style={{ paddingLeft: 20, marginTop: 20 }}
                  >
                    {templates[template].categoryTitle}
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
          })}
        </MasonryGrid>
      </Section>
    </div>
  )
}
