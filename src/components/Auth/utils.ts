import sha256 from 'crypto-js/sha256'
import Base64url from 'crypto-js/enc-base64url'

const dec2hex = (dec: number) => ('0' + dec.toString(16)).slice(-2)

export const generateCodeVerifier = () => {
  let array = new Uint32Array(56 / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, dec2hex).join('')
}

// const sha256 = (plain: string): Promise<ArrayBuffer> => {
//   const encoder = new TextEncoder()
//   const data = encoder.encode(plain)
//   return window.crypto.subtle.digest('SHA-256', data)
// }

// const base64urlencode = (a: ArrayBufferLike) => {
//   let str = ''
//   let bytes = new Uint8Array(a)
//   let len = bytes.byteLength
//   for (let i = 0; i < len; i++) {
//     str += String.fromCharCode(bytes[i])
//   }
//   return Buffer.from(str)
//     .toString('base64')
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=+$/, '')
// }

export const generateCodeChallengeFromVerifier = async (codeVerifier: string) =>
  // base64urlencode(await sha256(codeVerifier))
  Base64url.stringify(sha256(codeVerifier))
