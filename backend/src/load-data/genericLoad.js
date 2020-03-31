function compareStringArrays (a, b) {
  return (JSON.stringify(a) === JSON.stringify(b))
}

export async function genericLoad (schema, rows, idCols, keepCols = []) {
  if (!schema) {
    throw new Error('schema is required')
  }

  const schemaKeys = Object.keys(schema.schema.paths).filter(key => !key.startsWith('_'))

  if (rows.length === 0) {
    throw new Error('rows must contain at least one row')
  }

  const keys = Object.keys(rows[0])

  if (!compareStringArrays(schemaKeys, keys)) {
    throw new Error(`Columns names must be at this order: ${schemaKeys.join(', ')}`)
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
