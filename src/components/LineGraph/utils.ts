export const averageOrAddData = (data, width, spread) => {
  const newData: { x: number; y: number }[] = []
  let stepSize = width / (data.length - 1)
  if (!spread && stepSize < 10) {
    const dX = 10 / stepSize
    const condenseAmount = Math.round(dX)
    stepSize = width / (Math.floor(data.length / condenseAmount) - 1)

    for (let i = 0; i < data.length - 1; i += condenseAmount) {
      let totalX = 0
      let totalY = 0
      let pointsTraversed = 0

      for (let j = 0; j < condenseAmount; j++) {
        if (data[i + j]) {
          pointsTraversed++
          totalX += data[i + j].x
          totalY += data[i + j].y
        }
      }

      newData.push({
        x: totalX / pointsTraversed,
        y: totalY / pointsTraversed,
      })
    }
    data = newData
  } else if (!spread && stepSize > 20) {
    const newData = []
    const len = Math.ceil(width / 20 / data.length)

    for (let i = 0; i < data.length - 1; i++) {
      const next = data[i + 1]
      const spread = (next.y - data[i].y) / len
      const xspread = (next.x - data[i].x) / len
      for (let j = 1; j < len + 1; j++) {
        newData.push({
          x: j * xspread + data[i].x,
          y: j * spread + data[i].y,
        })
      }
    }

    data = newData
  }
  return data
}
