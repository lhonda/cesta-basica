# cesta-basica

## deploy no S3

para enviar p/ o S3 bucket:

`npm run build`

`npm run deploy-dev`

## AWS Policy para o frontend no S3

Colocar se seguinte policy na aba "permissions" do bucket cesta-basica-sp-estaticos.

`{
  "Version": "2008-10-17",
    "Id": "cesta-basica-frontend-public-policy",
    "Statement": [
        {
      "Sid": "Statement-cesta-basica-sp-esticos-1",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::cesta-basica-sp-estaticos/*",
      "Principal": {
        "AWS": [
          "*"
        ]
      }
    },
    {
      "Sid": "Statement-cesta-basica-sp-esticos-2",
      "Action": [
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::cesta-basica-sp-estaticos",
      "Principal": {
        "AWS": [
          "*"
        ]
      }
    }
    ]
  }`
