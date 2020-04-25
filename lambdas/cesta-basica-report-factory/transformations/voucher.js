module.exports = data => {
  const bucketName = process.env.BUCKET_NAME
  const header = 'Borderô/Pacote;Voucher/Cartão;Status;CPF do Recebedor;Nome do Recebedor;Telefone do Recebedor;Líder;Entidade;Cidade;UF;Data/Hora da Entrega;URL da Foto Publica; Comentário não Entrega\n'
  const transformedData = `${header}\n${data.map(e => `${e.donationId};${e.voucherId};${e.status};${e.receivedCpf};${e.receivedName};${e.receivedContactNumber || ""};${e.leader};${e.site.name};${e.site.city};${e.site.state};${e.delivered};${getS3Link(bucketName, e.cardDonatedS3Key)};${e.receivedName}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}

function getS3Link(bucketName, key) {
  return `https://${bucketName}.s3.amazonaws.com/${key}`
}