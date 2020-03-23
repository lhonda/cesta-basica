import * as random from '../services/random'
import { User } from '../repositories'
import { Parser } from 'json2csv'
import { load } from './generic'
import csvtojson from 'csvtojson'
import path from 'path'
import fs from 'fs'

export async function loadUser (csvName) {
  let rows

  const csvPath = path.resolve('load', csvName)

  rows = await csvtojson().fromFile(csvPath)

  rows = rows.map(row => {
    return {
      login: row.cpf,
      password: random.password(),
      email: row.email,
      role: 'leader',
      name: row.name,
      site: row.site,
      city: row.city,
      state: row.state
    }
  })

  await load(User, rows)

  const resultsPath = `${csvPath}.results.csv`

  const resultsContents = (new Parser()).parse(rows)

  fs.writeFileSync(resultsPath, resultsContents)
}

if (require.main === module) {
  const csvPath = path.resolve('user-data.csv')

  // eslint-disable-next-line node/no-deprecated-api
  if (!fs.exists(csvPath)) {
    throw new Error('The user data must on /load/user-data.csv')
  }

  loadUser(csvPath)
}
