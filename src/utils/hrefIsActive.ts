export const hrefIsActive = (href: string, selected: string, data?: object) => {
  if (href === selected) {
    return true
  }

  if (href === '/') {
    if (data) {
      for (const i in data) {
        const value = data[i]
        if (value !== href && selected.startsWith(value)) {
          return false
        }
      }
      return true
    }
    return false
  }

  if (href[0] === '?') {
    return location.search.substring(1).split('/').includes(href.substring(1))
  }

  if (selected.startsWith(href)) {
    const nextChar = selected[href.length]
    if (nextChar === undefined || nextChar === '/' || nextChar === '?') {
      return true
    }
  }

  return false
}
