import { Machine } from '@based/machine-config'

export const getMachineStatus = (machine: Machine): number => {
  return machine.stats?.lastUpdate &&
    Date.now() - machine.stats?.lastUpdate > 10e3
    ? 0
    : machine.status
}
