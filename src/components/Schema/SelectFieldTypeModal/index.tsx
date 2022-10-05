import { useDialog, Text, removeOverlay, Label, border, Thumbnail } from '~'
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

const Template = ({ template, onClick }) => {
  const { label, description, icon, color } = templates[template]

  return (
    <div
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
      }}
    >
      <Thumbnail
        size={48}
        icon={icon}
        color={color}
        style={{
          marginRight: 8,
        }}
      />
      <Label label={label} description={description} />
    </div>
  )
}

export const SelectFieldTypeModal: FC<{
  type: string
  path?: string[]
}> = ({ type, path = [] }) => {
  const { open } = useDialog()
  return (
    <div>
      <Text style={{ marginTop: 20, marginLeft: 20 }} weight="700">
        Add Field
      </Text>
      <Section>
        {Object.keys(templates).map((template: FieldTemplates) => (
          <Template
            key={template}
            template={template}
            onClick={() => {
              removeOverlay()
              open(<FieldModal type={type} template={template} path={path} />)
            }}
          />
        ))}
      </Section>
    </div>
  )
}
