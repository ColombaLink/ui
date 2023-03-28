import { MachineConfig, Service } from '@based/machine-config'

export type ServiceNamed = Service & { name: string }

export type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr]
}

export type OptionalMachineConfig = Subset<MachineConfig>

export type OnMachineConfigChange = (
  machineConfig: OptionalMachineConfig
) => void

export type Dist = {
  id: string
  name: string
  checksum: string
  version: string
  index: number
}
