export const getObjectId = (overId, objects) => {
  if (overId && overId in objects) {
      return objects[overId].field
  }

}

export const getDepth = (path, depth = 0) => {
  for (let i = 1; i < path.length; i++) {
    const key = path[i]
    if (key === 'properties') {
      depth++
      i++
    }
  }
  return depth
}