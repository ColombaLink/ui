const hexToDecimal = (hex) => parseInt(hex, 16);

const parseHex = (nakedHex) => {
  const isShort = nakedHex.length === 3 || nakedHex.length === 4;
  let r, g, b, a;

  if (isShort) {
    r = `${nakedHex.slice(0, 1)}${nakedHex.slice(0, 1)}`;
    g = `${nakedHex.slice(1, 2)}${nakedHex.slice(1, 2)}`;
    b = `${nakedHex.slice(2, 3)}${nakedHex.slice(2, 3)}`;
    a = `${nakedHex.slice(3, 4)}${nakedHex.slice(3, 4)}`;
  } else {
    r = nakedHex.slice(0, 2);
    g = nakedHex.slice(2, 4);
    b = nakedHex.slice(4, 6);
    a = nakedHex.slice(6, 8);
  }

  return [
    hexToDecimal(r),
    hexToDecimal(g),
    hexToDecimal(b),
    a ? +(hexToDecimal(a) / 255).toFixed(2) : 1,
  ];
};

export function toRGBA(color) {
  if (color[0] === "#") {
    // convert hex to rgba
    return parseHex(color.slice(1));
  } else if (color[0] === "v") {
    // its a variable
    return color;
  } else {
    // its rgb or rgba
    const arr = color.match(/-?\d*\.?\d+/g);
    const { length } = arr;
    let i = length;

    while (i--) {
      arr[i] = Number(arr[i]);
    }

    if (length === 3) {
      arr[3] = 1;
    }

    return arr;
  }
}
