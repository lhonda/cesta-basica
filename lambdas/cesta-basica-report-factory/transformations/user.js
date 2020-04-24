
module.exports = data => {
  const header = 'Usuário,Nome,Senha\n'
  const transformedData = `${header}\n${data.map(e => `${e.login},${e.name},${e.password}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}