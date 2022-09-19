export const hrefIsActive = (
  href: string,
  selected: string,
  data?: { href: string }[]
) => {
  if (href === selected) {
    return true
  }

  if (href === '/') {
    if (data) {
      return !data.find((item) => {
        if (item.href !== href) {
          return selected.startsWith(item.href)
        }
        return false
      })
    }
    return false
  }

  if (href[0] === '?') {
    return location.search.substring(1).split('&').includes(href.substring(1))
  }

  if (selected.startsWith(href)) {
    const nextChar = selected[href.length]
    if (nextChar === undefined || nextChar === '/' || nextChar === '?') {
      return true
    }
  }

  return false
}
