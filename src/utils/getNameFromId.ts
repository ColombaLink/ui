import { useData } from '@based/react'
import { useLanguage } from '../components/Content/hooks/useLanguage'

export const getNameFromId = (id) => {
  const { language } = useLanguage()
  const { data } = useData({
    $id: id,
    $language: language,
    name: true,
  })

  return data.name ? data.name : null
}
