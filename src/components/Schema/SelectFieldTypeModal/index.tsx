import {
  useDialog,
  Text,
  removeOverlay,
  Label,
  border,
  Thumbnail,
  MasonryGrid,
} from '~'
import { color } from '~/utils'
import { styled } from 'inlines'
import React, { FC } from 'react'
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
        border: border(1),
        borderRadius: 4,
        cursor: 'pointer',
        display: 'flex',
        marginBottom: 12,
        marginLeft: 6,
        marginRight: 6,
        userSelect: 'none',
        width: 284,
        padding: '8px 16px',
        ...style,
      }}
    >
      <Thumbnail
        size={48}
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
  return (
    <div>
      <Text style={{ marginTop: 20, marginLeft: 20 }} weight="700" space="0px">
        Add Field
      </Text>
      <Section>
        <MasonryGrid style={{ marginBottom: 20, padding: 0 }} gap={5}>
          {Object.keys(templates).map((template: FieldTemplates) => {
            if (templates[template].hidden) {
              return null
            }

            return (
              <React.Fragment key={template}>
                {templates[template].categoryTitle && (
                  <Text color="text2" space="12px" style={{ paddingLeft: 6 }}>
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
