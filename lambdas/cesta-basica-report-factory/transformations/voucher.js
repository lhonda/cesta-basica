module.exports = data => {
  const header = 'Borderô/Pacote,Voucher/Cartão,Status\n'
  const transformedData = `${header}\n${data.map(e => `${e.donationId},${e.voucherId},${e.status}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}