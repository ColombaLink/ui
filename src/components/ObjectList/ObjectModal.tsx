import React, { FC } from 'react'
import { border, color } from '~/utils'
import { CloseIcon, Text, ScrollArea, Button } from '~'
import { RightSidebar } from '../RightSidebar'
import { ContentEditor } from '../../components/Content/ContentEditor'
// import { useDescriptor } from '../hooks/useDescriptor'

const Topbar = ({ label, id, type, onClose }) => {
  // const { descriptor, type: schemaType, loading } = useDescriptor(id)
  return (
    <div
      style={{
        display: 'flex',
        padding: '0 24px',
        height: 64,
        borderBottom: border(1),
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
      <Text style={{ marginLeft: 24 }} weight={600}>
        Edit {label}
      </Text>
    </div>
  )
}

const SideHeader: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        marginBottom: 12,
        paddingBottom: 8,
      }}
    >
      <Text>{title}</Text>
      {children}
    </div>
  )
}

export const ObjectListModal = ({ label, props, schema, setShowModal }) => {
  console.log('props from objectlistmodal', props)

  const objectKeys = Object.keys(schema.properties)
  const type = props.id ? null : props.field

  const onClose = async () => {
    setShowModal(false)
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        // temp z index
        zIndex: 1,
      }}
    >
      <div
        onClick={onClose}
        style={{
          opacity: 0.6,
          width: 300,
          flexGrow: 1,
          backgroundColor: color('background2'),
        }}
      />
      <div
        style={{
          width: 1200,
          backgroundColor: color('background'),
          boxShadow: '0px 8px 20px rgba(15, 16, 19, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* @ts-ignore */}
        <Topbar
          //  id={id}
          //  type={type}
          label={label}
          onClose={onClose}
        />
        <div
          style={{
            display: 'flex',
            height: 'calc(100% - 64px)',
          }}
        >
          <ScrollArea style={{ flexGrow: 1 }}>
            <div style={{ padding: '48px 76px' }}>
              1 level deep
              {objectKeys.map((objectKey, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 4,
                    border: `1px solid ${color('border')}`,
                    padding: '8px 12px',
                    marginBottom: 8,
                  }}
                >
                  {objectKey} - {schema.properties[objectKey].type}
                </div>
              ))}
            </div>

            {/* // subset of ContentEditor fields */}
            {/* // maybe filter out the ones in the object */}
            {/* // maybe pass specific fields as props?? */}
            <ContentEditor
              id={props.id}
              type={type}
              language={'en'}
              style={{ padding: '48px 76px' }}
              // autoFocus={id ? field : null}
              onChange={(data) => {
                // setDisabled(false)
                // Object.assign(changes, data)
              }}
            />
          </ScrollArea>
          <RightSidebar style={{ width: 260 }}>
            <SideHeader title="Status" />
            <Button textAlign="center" style={{ width: '100%' }}>
              Publish button
            </Button>
          </RightSidebar>
        </div>
      </div>
    </div>
  )
}
