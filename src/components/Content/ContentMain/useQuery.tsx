import { parseQuery } from '@saulx/utils'
import { useLocation } from '~/hooks'

export const useQuery = () => {
  useLocation()

  const q = parseQuery(window.location.search.substring(1)) as {
    filter: string
    target: string
    field: string
  }
  const filters = q.filter ? JSON.parse(decodeURIComponent(q.filter)) : []
  const target = q.target ? String(q.target) : 'root'
  const field = q.field || 'descendants'

  return {
    filters,
    target,
    field,
  }
}
