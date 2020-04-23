module.exports = data => {
  const header = 'Código,Nome,Cidade,UF\n'
  const transformedData = `${header}\n${data.map(e => `${e.siteId},${e.name},${e.city},${e.state}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}