export const viewProps = (props): string => {
  const p = { ...props }
  for (let k in p) {
    if (typeof p[k] === 'string' && p[k].length > 30) {
      p[k] = p[k].slice(0, 30) + '...'
    } else if (typeof p[k] === 'function') {
      p[k] = p[k].name
    } else if (typeof p[k] === 'object') {
      p[k] = 'Child'
    }
  }
  return JSON.stringify(p, null, 2)
}
