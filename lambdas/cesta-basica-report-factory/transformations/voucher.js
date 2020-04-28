const { parseDate } = require('../utils')

module.exports = data => {
  const bucketName = process.env.BUCKET_NAME
  const header = 'Borderô/Pacote;Voucher/Cartão;Status;CPF do Recebedor;Nome do Recebedor;Telefone do Recebedor;Líder;Entidade;Cidade;UF;Data/Hora da Entrega;URL da Foto Publica; Comentário não Entrega\n'
  const transformedData = `${header}\n${data.map(e => `${e.donationId};"${e.voucherId}";${voucherStatusMapper[e.status]};${e.receivedCpf || "Não Informado"};${e.receivedName || "Não Informado"};${e.receivedContactNumber || ""};${e.leader || ""};${e.site.name};${e.site.city};${e.site.state};${parseDate(e.delivered)};${getS3Link(bucketName, e.cardDonatedS3Key)};${e.leaderComment || ""}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}

const voucherStatusMapper = {
  1: 'Recebido pelo líder',
  2: 'Entregue',
  3: 'Não Entregue'
}

function getS3Link(bucketName, key) {
  if (!key) return ""
  return `https://${bucketName}.s3.amazonaws.com/${key}`
}