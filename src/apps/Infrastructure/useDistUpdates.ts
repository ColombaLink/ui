import { MachineConfig } from '@based/machine-config'
import { useQuery } from '@based/react'
import { useMemo } from 'react'

type Dist = {
  id: string
  name: string
  checksum: string
  version: string
  index: number
}

export const useDistUpdates = (
  machineConfigs: {
    [key: string]: MachineConfig | Pick<MachineConfig, 'services'>
  },
  checksum?: number
): Dist[] => {
  const { data: dists = {}, checksum: distChecksum } = useQuery<{
    [key: string]: Dist[]
  }>(
    'dists',
    {
      type: 'env',
    },
    {
      persistent: true,
    }
  )

  return useMemo(() => {
    const needUpdate: Dist[] = []
    for (const configName in machineConfigs) {
      const config = machineConfigs[configName]
      for (const serviceName in config.services) {
        const service = config.services[serviceName]
        const serviceDists = dists[serviceName]
        const currentDist = serviceDists.find(
          (d) => d.checksum === service.distChecksum
        )
        for (const d of serviceDists) {
          if (d.index > currentDist.index) {
            needUpdate.push(d)
            break
          }
        }
      }
    }
    return needUpdate
  }, [distChecksum, checksum ?? machineConfigs])
}
