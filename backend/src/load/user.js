import { connect, disconnect } from '../core/database'
import * as random from '../services/random'
import { User } from '../repositories'
import { Parser } from 'json2csv'
import { load } from './generic'
import { config } from 'dotenv'
import csvtojson from 'csvtojson'
import yaml from 'js-yaml'
import path from 'path'
import fs from 'fs'

export async function loadUser (csvName) {
  let rows

  const csvPath = path.resolve('load', csvName)

  rows = await csvtojson().fromFile(csvPath)

  rows = rows.map(row => {
    return {
      login: row.cpf,
      name: row.name,
      password: random.password(),
      role: 'leader',
      email: row.email,
      cpf: row.cpf,
      rg: row.rg,
      phone: row.phone,
      birthdate: row.birthdate,
      site: row.site,
      city: row.city,
      state: row.state
    }
  })

  await load(User, rows)

  fs.writeFileSync(`${csvPath}.results.json`, JSON.stringify(rows, null, 2))
  fs.writeFileSync(`${csvPath}.results.csv`, (new Parser()).parse(rows))
  fs.writeFileSync(`${csvPath}.results.yml`, yaml.dump(rows))
}

if (require.main === module) {
  const csvPath = path.resolve('load', 'user-data.csv')

  // eslint-disable-next-line node/no-deprecated-api
  if (!fs.existsSync(csvPath)) {
    throw new Error('The user data must on /load/user-data.csv')
  }

  (async function () {
    try {
      config()
      await connect()
      await loadUser(csvPath)
      await disconnect()
    } catch (err) {
      console.error(err)
    }
  }())
}
