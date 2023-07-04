import useLocalStorage from '@based/use-local-storage'

export const useLanguage = (): { language: string } => {
  const [language] = useLocalStorage('bui_lang')
  return { language: language || 'en' }
}
