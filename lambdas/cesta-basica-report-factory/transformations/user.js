const { parseDate } = require("../utils")

module.exports = data => {
  const header = 'Usuário;Nome;Entidade;RG;Telefone;Email;Data de Nascimento;Endereço;Cidade;UF;CEP;Comunidades Atendidas;Tipo de Usuário\n'
  const transformedData = `${header}\n${data.map(e => `${e.login};${e.name};${e.siteName};${e.rg};${e.phone};${e.email};${parseDate(e.birthdate)};${e.deliveryLocaton || "Não Informado"};${e.city};${e.state};${e.deliveryCep};${e.slums};${roleMap[e.role]}`).join('\n')}`

  return { byteSize: Buffer.byteLength(transformedData), data: transformedData, length: data.length }
}

const roleMap = {
  "leader": "Líder",
  "admin": "Administrador"
}