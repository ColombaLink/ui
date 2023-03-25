export {
  Env,
  MachineConfig,
} from '/Users/jimdebeer/saulx/based-cloud/packages/machine-config'

export type Machine = {
  id: string
  cloudMachineId: string
  status: number // add all
  machineConfigName: string
  publicIp: string
}
