import React from 'react'
import {
  styled,
  useContextMenu,
  ScrollArea,
  Row,
  Text,
  Button,
  MoreIcon,
  useContextState,
  useDialog,
  Table,
} from '~'
import { useQuery } from '@based/react'

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

  const { data, loading } = useQuery(
    functionName ? 'db' : undefined,
    functionPayload
  )

  console.log('DATA 💊', data)
  console.log('function props', functionProps)

  // PROPS

  //   const tableClickHandler = (e, rowData) => {
  //     // open a new view
  //     console.log(e, rowData)
  //   }

  const specialClickHandler = (key, onClick, fields) => {
    console.log('SPECIAL', key, onClick, fields)
    console.log(Object.values(fields[0]))

    if (onClick.view) {
      console.log('onclick view', onClick.view)
    }
    if (fields.map((field) => field.name).includes(key)) {
      console.log('OPEN MODAL 💶')
      open(
        <styled.div style={{ width: 100, height: 100, background: 'yellow' }}>
          {key}
        </styled.div>
      )
    }
  }

  const customOnClickComp = ({ data, header }) => {
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
              headers={[
                {
                  key: 'numbie',
                  label: 'number',
                  customComponent: customOnClickComp,
                },
                { key: 'stringie', customComponent: customOnClickComp },
                { key: 'id', customComponent: customOnClickComp },
              ]}
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
