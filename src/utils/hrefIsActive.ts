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
    // TODO bit of a lazy check, can improve
    return location.search.indexOf(href.substring(1)) !== -1
  }

  return selected.startsWith(href)
}
