export function slicePascalCase(string: string, n = 2) {
  let result = "";
  let capCnt = 0;
  for (const char of string) {
    if (/^[A-Z]$/.test(char)) {
      if (capCnt++ >= n) {
        break;
      }
    }
    result += char;
  }
  return result;
}
