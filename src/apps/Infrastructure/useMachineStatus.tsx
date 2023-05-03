import { useQuery } from '@based/react'
import { Env } from '@based/machine-config'

export const useMachineStatus = (
  env: Env,
  configName?: string
): {
  amount: number
  failing: number
  deploying: number
  resizing: number
} => {
  const { data: envData } = useQuery('env', env)
  const machineStatus: {
    amount: number
    failing: number
    resizing: number
    deploying: number
    removing: number
  } = {
    amount: 0,
    failing: 0,
    deploying: 0,
    resizing: 0,
    removing: 0,
  }
  if (envData?.machineStatus) {
    if (configName) {
      machineStatus.amount = envData?.machineStatus?.[configName].amount
      machineStatus.failing = envData?.machineStatus?.[configName].failing
      machineStatus.deploying = envData?.machineStatus?.[configName].deploying
      machineStatus.resizing = envData?.machineStatus?.[configName].resizing
      machineStatus.removing = envData?.machineStatus?.[configName].removing
    } else {
      for (const k in envData?.machineStatus) {
        machineStatus.amount += envData.machineStatus[k].amount
        machineStatus.failing += envData.machineStatus[k].failing
        machineStatus.deploying += envData.machineStatus[k].deploying
        machineStatus.resizing = envData?.machineStatus?.[k].resizing
        machineStatus.removing = envData?.machineStatus?.[k].removing
      }
    }
  }
  return machineStatus
}
