export const parseSearchParams = (
  querystring: string
): { [key: string]: string | number | boolean } => {
  // parse query string
  const params = new URLSearchParams(querystring)
  const obj = {}
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key)
    } else {
      obj[key] = params.get(key)
    }
  }
  return obj
}

// will make a Route and Switch component
// and useLocation where we get query params as well

// in the router we want query params as well
export const setLocation = (
  opts:
    | string
    | {
        params?: string | object
        path?: string
        merge?: boolean
      }
) => {
  let newPath: string
  if (typeof opts === 'string') {
    newPath = opts
  } else if (typeof opts === 'object') {
    const { params, path, merge } = opts
    newPath = path || window.location.pathname
    newPath += '?'
    if (typeof params === 'object') {
      let p = params
      if (merge) {
        p = { ...parseSearchParams(window.location.search), ...p }
      }
      const queryString = Object.keys(p)
        .map((key) => key + '=' + p[key])
        .join('&')
      newPath += queryString
    }
  }
  window.history.pushState({}, '', newPath)
}
