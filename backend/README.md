# Cesta básica SP

## Software

Usamos NodeJS no backend, ReactsJS no frontend, AWS DocumentDB como banco de produção, AWS Lambda, AWS S3 para guardar os estáticos e as fotos.

## Configuração do Serverless framework

É necessário criar um usuário com credenciais AWS.

Foi criado um grupo com as devidas permissões inclusive a policy abaixo:

nome: cesta-basica-sp-api-gateway-restapis-allow

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1467321765000",
      "Effect": "Allow",
      "Action": [
        "apigateway:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}

## DocumentDB

arn: arn:aws:rds:us-east-1:336461205468:cluster:cesta-basica-sp-documentdb

cluster: cesta-basica-sp-documentdb

endpoint: cesta-basica-sp-documentdb.cluster-cuvqdex8zrqv.us-east-1.docdb.amazonaws.com

reader endpoint: cesta-basica-sp-documentdb.cluster-ro-cuvqdex8zrqv.us-east-1.docdb.amazonaws.com

master username: cestaBasicaDocdbAdmin
senha: configurado no env var dos devs.
