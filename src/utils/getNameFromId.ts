import { useQuery } from '@based/react'
import { useLanguage } from '../apps/Content/hooks/useLanguage'

export const getNameFromId = (id) => {
  const { language } = useLanguage()
  const { data } = useQuery('db', {
    $id: id,
    $language: language,
    name: true,
  })

  return data.name ? data.name : null
}
