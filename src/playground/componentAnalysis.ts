export default async (path: string, params: any) => {
  try {
    const file = params.files[path].contents.toString()
    return JSON.stringify({
      code: file,
    })
  } catch (err) {
    console.error(err)
  }
  return '{"code":""}'
}
