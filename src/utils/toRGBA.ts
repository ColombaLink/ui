const hexToDecimal = (hex) => parseInt(hex, 16)

const parseHex = (hex) => {
  const isShort = hex.length === 3 || hex.length === 4
  let r, g, b, a

  if (isShort) {
    r = `${hex.slice(0, 1)}${hex.slice(0, 1)}`
    g = `${hex.slice(1, 2)}${hex.slice(1, 2)}`
    b = `${hex.slice(2, 3)}${hex.slice(2, 3)}`
    a = `${hex.slice(3, 4)}${hex.slice(3, 4)}`
  } else {
    r = hex.slice(0, 2)
    g = hex.slice(2, 4)
    b = hex.slice(4, 6)
    a = hex.slice(6, 8)
  }

  return [
    hexToDecimal(r),
    hexToDecimal(g),
    hexToDecimal(b),
    a ? +(hexToDecimal(a) / 255).toFixed(2) : 1,
  ]
}

export const toRGBA = (color) => {
  if (Array.isArray(color)) {
    return color
  } else if (color[0] === '#') {
    // convert hex to rgba
    return parseHex(color.slice(1))
  } else if (color[0] === 'v') {
    // its a variable
    return color
  } else {
    // its rgb or rgba
    const arr = color.match(/-?\d*\.?\d+/g)
    const { length } = arr
    let i = length

    while (i--) {
      arr[i] = Number(arr[i])
    }

    if (length === 3) {
      arr[3] = 1
    }

    return arr
  }
}
