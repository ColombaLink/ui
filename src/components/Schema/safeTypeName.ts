const safeTypeName = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-.]/g, '')
  // .replace(/(['±!@#$%^&*()_+{}|":?><~]|\d)+/g, "");
}

export default safeTypeName
