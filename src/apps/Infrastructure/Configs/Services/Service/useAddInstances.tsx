import React, { ReactNode, useRef } from 'react'
import { Accept, useUpdate } from '~'
import { ServiceNamed, OnMachineConfigChange } from '../../../types'
import { Instance } from '../Instance'
import { deepMerge, deepCopy } from '@saulx/utils'

export const useAddInstances = (
  service: ServiceNamed,
  alwaysAccept: boolean,
  onChange: OnMachineConfigChange
): [ReactNode[], ReactNode, () => void] => {
  const newInstancesRef = useRef({})
  let hasNewInstances = false
  const instances: ReactNode[] = []
  const update = useUpdate()

  for (const x in newInstancesRef.current) {
    hasNewInstances = true
    instances.push(
      <Instance
        alwaysAccept
        onChange={(v) => {
          const y = v.services[service.name].instances[x]
          if (y) {
            newInstancesRef.current[x] = y
          } else {
            delete newInstancesRef.current[x]
          }
          update()
        }}
        key={x}
        service={{
          name: service.name,
          distChecksum: service.distChecksum,
          instances: newInstancesRef.current,
        }}
        instance={newInstancesRef.current[x]}
        index={x}
      />
    )
  }

  const addInstance = () => {
    let high = -1
    let newInstance: any = { port: 80 }
    for (const key in service.instances) {
      if (high === -1) {
        newInstance = deepCopy(service.instances[key])
      }
      const nr = Number(key)
      if (nr > high) {
        high = nr
      }
    }

    if (alwaysAccept) {
      onChange({
        services: {
          [service.name]: {
            instances: deepMerge(deepCopy(service.instances), {
              [high + 1]: newInstance,
            }),
          },
        },
      })
    } else {
      for (const key in newInstancesRef.current) {
        const nr = Number(key)
        if (nr > high) {
          high = nr
        }
      }
      newInstancesRef.current[high + 1] = newInstance
      update()
    }
  }

  const acceptChanges =
    hasNewInstances && !alwaysAccept ? (
      <Accept
        onAccept={() => {
          onChange({
            services: {
              [service.name]: {
                instances: deepMerge(
                  deepCopy(service.instances),
                  newInstancesRef.current
                ),
              },
            },
          })
          newInstancesRef.current = {}
          update()
        }}
        onCancel={() => {
          newInstancesRef.current = {}
          update()
        }}
      />
    ) : null

  return [instances, acceptChanges, addInstance]
}
