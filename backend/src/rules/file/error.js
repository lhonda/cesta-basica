import { fileStatus } from '../../repositories'
import updateFile from './update'

export default async (error, fileId, next) =>
  updateFile(
    {
      fileId,
      status: error.processStatus || fileStatus.error,
      message: error.message
    }
  ).then(next(error))
