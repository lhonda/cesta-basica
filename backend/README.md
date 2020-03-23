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
