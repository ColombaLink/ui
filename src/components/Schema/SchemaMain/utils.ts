export const getObjectId = (overId, objects) => {
  if (objects.has(overId)) {
    return overId
  }

  const i = overId.lastIndexOf('.properties.')
  if (i !== -1) {
    const str = overId.substring(0, i)
    return str.substring(str.lastIndexOf('.'))
  }
}