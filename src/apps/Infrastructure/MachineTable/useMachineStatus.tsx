import { useQuery } from '@based/react'
import { Env } from '@based/machine-config'

export const useMachineStatus = (
  env: Env,
  configName?: string
): {
  amount: number
  failing: number
  deploying: number
} => {
  const { data: envData } = useQuery('env', env)
  const machineStatus: {
    amount: number
    failing: number
    deploying: number
  } = {
    amount: 0,
    failing: 0,
    deploying: 0,
  }
  if (envData?.machineStatus) {
    if (configName) {
      machineStatus.amount = envData?.machineStatus?.[configName].amount
      machineStatus.failing = envData?.machineStatus?.[configName].failing
      machineStatus.deploying = envData?.machineStatus?.[configName].deploying
    } else {
      for (const k in envData?.machineStatus) {
        machineStatus.amount += envData.machineStatus[k].amount
        machineStatus.failing += envData.machineStatus[k].failing
        machineStatus.deploying += envData.machineStatus[k].deploying
      }
    }
  }
  return machineStatus
}
