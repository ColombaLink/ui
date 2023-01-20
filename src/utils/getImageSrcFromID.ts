import { useData } from '@based/react'
import { useLanguage } from '../components/Content/hooks/useLanguage'

export const getImageSrcFromID = (id) => {
  console.log(id, 'what is the id')

  const { language } = useLanguage()

  const { loading, data } = useData({
    $id: id,
    $language: language,
    src: true,
  })

  console.log(loading, 'loading')
  console.log(data, 'data')

  return data.src ? data.src + '?w=100&h=100' : null
}
