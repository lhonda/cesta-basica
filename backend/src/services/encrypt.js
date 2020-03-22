import { createCipheriv } from 'crypto'
import { Buffer } from 'buffer'

const algorithm = 'aes-256-ctr'
const input = 'utf8'
const output = 'hex'

export function encrypt (value) {
  const key = process.env.ENCRYPTKEY
  const encryptiv = process.env.ENCRYPTIV
  const iv = Buffer.from(encryptiv)
  const cipher = createCipheriv(algorithm, key, iv)
  let crypted = cipher.update(value, input, output)
  crypted += cipher.final(output)
  return `${iv.toString(output)}:${crypted.toString()}`
}
