module.exports = data => {
  const header = 'Pacote,Usuário\n'
  const transformedData = `${header}\n${data.map(e => `${e.donationId},${e.leaderLogin}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}