export const copyToClipboard = (input: string | number) => {
  const type = 'text/plain'
  const blob = new Blob([typeof input === 'number' ? String(input) : input], {
    type,
  })
  const data = [new ClipboardItem({ [type]: blob })]
  navigator.clipboard.write(data).then(
    () => {},
    () => {}
  )
}
