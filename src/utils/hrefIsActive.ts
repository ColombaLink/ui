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

  const i = href.indexOf('?')
  if (
    i !== -1 &&
    location.search
      .substring(1)
      .split('&')
      .includes(href.substring(i + 1))
  ) {
    return i === 0 || hrefIsActive(href.substring(0, i), selected, data)
  }

  if (selected.startsWith(href)) {
    const nextChar = selected[href.length]
    if (nextChar === undefined || nextChar === '/' || nextChar === '?') {
      return true
    }
  }

  return false
}
