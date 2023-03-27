import { MachineConfig } from '@based/machine-config'
import { useQuery } from '@based/react'

export const checkForUpdates = (
  machineConfigs: {
    [key: string]: MachineConfig
  },
  dists: any
) => {
  console.info(dists)

  for (const x in machineConfigs) {
    console.log(x)
  }
}

type Dist = {
  id: string
  name: string
  checksum: string
  version: string
  index: number
}

// @based/env-dummy@latest very nice alias!

export const useUpdates = (
  machineConfigs: {
    [key: string]: MachineConfig
  },
  checksum?: number
) => {
  const { data: dists = [], checksum: distChecksum } = useQuery<Dist[]>(
    'dists',
    {
      type: 'env',
    }
  )

  console.info('--->', dists, distChecksum)
}
