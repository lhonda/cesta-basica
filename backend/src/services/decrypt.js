import { createDecipheriv } from 'crypto'
import { config } from 'dotenv'
const algorithm = 'aes-256-ctr'
const input = 'hex'
const output = 'utf8'

export async function decrypt (value) {
  const key = process.env.ENCRYPTKEY
  const encryptiv = process.env.ENCRYPTIV
  const iv = Buffer.from(encryptiv)
  const Decipher = createDecipheriv(algorithm, key, iv)
  const [, crypted] = value.split(':')
  let decrypted = Decipher.update(crypted, input, output)
  decrypted += Decipher.final(output)
  return decrypted
}

if (require.main === module) {
  (async function () {
    config()

    if (process.argv.length !== 3) {
      console.error('Usage yarn run decrypt-password encryptedPassword')
      return
    }

    const enc = process.argv.pop()
    const dec = await decrypt(enc)
    console.log(enc, '=>', dec)
  })()
}
