const fieldToCode = (val: any): string => {
  if (typeof val === 'string') {
    return `'${val}'`
  }

  if (
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    typeof val === 'undefined'
  ) {
    return String(val)
  }

  if (typeof val === 'function') {
    return val.toString()
  }

  if (typeof val === 'object') {
    return '\n' + objectToCode(val)
  }
}

const objectToCode = (obj: Object | any[]): string => {
  if (!obj) {
    return 'null'
  }

  if (Array.isArray(obj)) {
    let str = '[\n'
    for (const val of obj) {
      str += `${fieldToCode(val)},\n`
    }
    str = str.slice(0, -2)
    str += '\n]'
    return str
  }
  let str = '{\n'
  for (const key in obj) {
    let keyStr = key.includes(' ') ? `'${key}'` : key
    str += `  ${keyStr}: ${fieldToCode(obj[key])},\n`
  }
  str = str.slice(0, -2)
  str += '\n}'
  return str
}

export default objectToCode
