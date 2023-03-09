import { useQuery } from '@based/react'
import { useLanguage } from '../components/Content/hooks/useLanguage'

export const getImageSrcFromId = (id) => {
  const { language } = useLanguage()
  const { data } = useQuery('db', {
    $id: id,
    $language: language,
    src: true,
  })

  return data.src ? data.src + '?w=100&h=100' : null
}
