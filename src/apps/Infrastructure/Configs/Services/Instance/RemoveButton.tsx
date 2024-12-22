import { FC } from 'react'
import { Dialog, Text, Button, Row, CloseIcon, useDialog } from '~'
import { deepCopy } from '@saulx/utils'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'

export const RemoveButton: FC<{
  onChange: OnMachineConfigChange
  service: ServiceNamed
  index: string
  alwaysAccept: boolean
}> = ({ onChange, service, alwaysAccept, index }) => {
  const { open } = useDialog()
  return (
    <Row>
      <Button
        icon={<CloseIcon />}
        ghost
        onClick={async () => {
          if (alwaysAccept) {
            const x = deepCopy(service.instances)
            delete x[index]
            return onChange({
              services: {
                [service.name]: {
                  instances: x,
                },
              },
            })
          } else {
            open(
              <Dialog>
                <Dialog.Label style={{ marginTop: 24 }}>
                  Remove service instance
                </Dialog.Label>
                <Dialog.Body>
                  <Text>
                    Are you sure you want ro remove{' '}
                    <b>
                      {service.name} #{index}
                    </b>
                    ?
                  </Text>
                </Dialog.Body>
                <Dialog.Buttons border>
                  <Dialog.Cancel />
                  <Dialog.Confirm
                    onConfirm={() => {
                      delete service.instances[index]
                      return onChange({
                        services: {
                          [service.name]: {
                            instances: service.instances,
                          },
                        },
                      })
                    }}
                  />
                </Dialog.Buttons>
              </Dialog>
            )
          }
        }}
      />
    </Row>
  )
}
