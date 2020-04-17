import { model, Schema } from 'mongoose'

export const fileStatus = {
  success: 'Processado com sucesso',
  partial: 'Processado parcialmente',
  invalid: 'Arquivo inválido',
  duplicated: 'Dados duplicados',
  inconsistency: 'Dados inconsistentes',
  error: 'Erro no processamento',
  processing: 'Em processamento'
}

export const fileTypes = {
  site: 'site',
  user: 'user',
  donation: 'donation',
  voucher: 'voucher',
  transfer: 'transfer'
}

export const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      trim: true,
      required: [true, 'fileName is required']
    },
    status: {
      type: String,
      trim: true,
      index: true,
      enum: Object.values(fileStatus),
      default: fileStatus.processing
    },
    type: {
      type: String,
      trim: true,
      index: true,
      required: [true, 'type is required']
    },
    admin: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const File = model('File', fileSchema)
