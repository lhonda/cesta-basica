import { File } from '../../repositories'

export default ({ limit = 25, skip = 0, type }) => {
  const query = {}

  if (type) {
    query.type = type
  }

  return File.find(
    query,
    undefined,
    {
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
      sort: { createdAt: -1 }
    }
  ).populate(
    {
      path: 'admin',
      select: 'email'
    }
  )
}
