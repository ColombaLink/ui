import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  useDialog,
  Table,
  Badge,
} from '~'
import { useQuery } from '@based/react'
import { ContentEditModal } from './ContentEditModal'

export const CustomContent = ({ view, actions }) => {
  const contextMenu = useContextMenu<{ view }>(actions, { view })

  console.log('Custom content view', view)

  const { open } = useDialog()

  //   const [view] = useContextState<string>('view')

  // View Table
  const isTable = view.config.view === 'table'

  // TODO: Function -- name, type , payload , props
  const functionName = view.config.function.name
  const functionType = view.config.function.type
  const functionPayload = view.config.function.payload
  const functionProps = view.config.function.props

  const functionPropsFields = view.config.function.props.fields

  const { data, loading } = useQuery(
    functionName ? 'db' : undefined,
    functionPayload
  )

  console.log('DATA 💊', data)
  console.log('function props', functionProps)

  const specialClickHandler = (key, onClick, fields) => {
    console.log('SPECIAL', '🔑:', key, '👆:', onClick, '🖼', fields)

    if (onClick.view) {
      console.log('onclick view 🫃🏻', onClick.view)
      console.log('-->', onClick.view.function.payload)
    }
    if (
      onClick?.view?.props?.fields.map((field) => field.field).includes(key) &&
      onClick.view.type === 'content-modal'
    ) {
      open(
        <ContentEditModal data={data} fields={onClick?.view?.props?.fields} />
      )
    }
  }

  const customOnClickComp = ({ data, header }) => {
    if (header.type === 'id') {
      return (
        <Badge
          onClick={() =>
            specialClickHandler(
              header.key,
              functionProps?.onClick,
              functionProps?.fields
            )
          }
        >
          {data[header.key]}
        </Badge>
      )
    } else {
      return (
        <div
          onClick={() => {
            console.log('snurp ', data[header.key])
            specialClickHandler(
              header.key,
              functionProps?.onClick,
              functionProps?.fields
            )
          }}
        >
          {data[header.key]}
        </div>
      )
    }
  }

  // PROPS.FIELDS should make up the table header fields to show
  // console.log(functionPropsFields)

  // map name -> label and field -> key
  const tableHeader = functionPropsFields.map((item) => ({
    key: item.field,
    label: item.name,
    type: item.type,
    customComponent: customOnClickComp,
    onClick: item.onClick,
  }))

  console.log(tableHeader)

  //   const tableClickHandler = (e, rowData) => {
  //     // open a new view
  //     console.log('🔔', e, rowData)
  //   }

  return (
    <ScrollArea
      style={{
        display: 'flex',
        flexGrow: 1,
        minWidth: null,
        minHeight: 200,
      }}
    >
      <styled.div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          minWidth: '100%',
          paddingTop: 16,
          paddingBottom: 32,
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row
          style={{
            paddingLeft: 32,
            paddingRight: 32,
          }}
        >
          <Text typography="subtitle500">{view.name}</Text>
          <Button
            style={{ marginLeft: 16 }}
            ghost
            onClick={contextMenu}
            icon={MoreIcon}
          />
        </Row>

        <styled.div style={{ width: '100%', padding: 24 }}>
          {isTable && (
            <Table
              headers={tableHeader}
              data={[data]}
              //   onClick={tableClickHandler}
              height={400}
            />
          )}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
