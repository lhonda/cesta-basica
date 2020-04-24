function compareStringArrays (a, b) {
  return (JSON.stringify(a) === JSON.stringify(b))
}

export async function genericLoad (schema, rows, idCols, keepCols = []) {
  if (!schema) {
    throw new Error('A variável schema deve ser preenchida')
  }

  const schemaKeys = Object.keys(schema.schema.paths).filter(key => !key.startsWith('_'))

  if (rows.length === 0) {
    throw new Error('A variável rows deve conter pelo menos uma linha')
  }

  const keys = Object.keys(rows[0])

  if (!compareStringArrays(schemaKeys, keys)) {
    throw new Error(`Os nomes das colunas devem ser nesta ordem: ${schemaKeys.join(', ')}`)
  }

  idCols = [].concat(idCols)

  return Promise.all(rows.map(async row => {
    const findObj = idCols.reduce((obj, colname) => {
      obj[colname] = row[colname]
      return obj
    }, {})
    // console.log(findObj)

    const existing = await schema.findOne(findObj)
    // console.log(existing)

    if (!existing) {
      return schema.create(row)
    }

    /*
    if (keepCols.length === 0) {
      return
    }

    schemaKeys.forEach(colname => {
      if (!keepCols.includes(colname)) {
        existing[colname] = row[colname]
      }
    })
    // console.log(existing)

    return existing.save()
    */
  }))
}
