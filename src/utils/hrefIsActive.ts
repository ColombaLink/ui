export const hrefIsActive = (
  href: string,
  selected: string,
  data?: { href: string }[]
) => {
  if (href === selected) {
    return true
  }

  if (data && selected.startsWith(href)) {
    const nextChar = selected[href.length]
    if (nextChar === undefined || nextChar === '/' || nextChar === '?') {
      if (
        !data.find((item) => {
          return item.href !== href && hrefIsActive(item.href, selected)
        })
      ) {
        return true
      }
    }
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

  return false
}
