import { Machine } from '@based/machine-config'

export const getMachineStatus = (machine: Machine): number => {
  if (machine.execStatus) {
    return machine.execStatus
  }
  if (
    machine.stats?.lastUpdate &&
    Date.now() - machine.stats.lastUpdate < 10e3
  ) {
    return machine.status
  }
  return 0
}
