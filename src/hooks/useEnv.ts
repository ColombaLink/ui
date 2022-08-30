import { useData } from '@based/react'

const useEnv = (id: string): { env: string; project: string; org: string } => {
  const { data } = useData({
    $id: id,
    env: true,
    org: true,
    project: true,
  })
  return <{ env: string; project: string; org: string }>data
}

export default useEnv
