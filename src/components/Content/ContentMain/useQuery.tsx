import { useLocation } from '~/hooks'

export const useQuery = (queryOverwrite) => {
  useLocation()

  if (queryOverwrite) {
    return queryOverwrite
  }

  const p = new URLSearchParams(window.location.search)
  const f = p.get('filter')
  const filters = f ? JSON.parse(decodeURIComponent(f)) : []
  const target = p.get('target') || 'root'
  const field = p.get('field') || 'descendants'

  return {
    filters,
    target,
    field,
  }
}
