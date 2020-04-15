import { File } from '../../repositories'

export default async ({ file, type, admin }) => {
  const fileInserted = await File.create({ fileName: file.name, type, admin })

  return { file, type, fileId: fileInserted._id }
}
