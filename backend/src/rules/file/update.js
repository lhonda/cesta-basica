import { File, fileStatus } from '../../repositories'

export default async ({ fileId, message, status = fileStatus.success }) => {
  await File.updateOne({ _id: fileId }, { status })

  return { message }
}
