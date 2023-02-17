import { useData } from '@based/react'
import { useLanguage } from '../components/Content/hooks/useLanguage'

export const getImageSrcFromId = (id) => {
  const { language } = useLanguage()
  const { data } = useData({
    $id: id,
    $language: language,
    src: true,
  })

  return data.src ? data.src + '?w=100&h=100' : null
}
