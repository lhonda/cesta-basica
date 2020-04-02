import { User } from '../repositories'

export async function listLeaders (name) {
  if (!name) {
    name = ''
  }
  const leaders = (await User.find(
    {
      role: 'leader',
      name: new RegExp(`^${name}`)
    },
    {
      name: 1,
      login: 1,
      siteId: 1
    })
  ).map(({ name, login, siteId }) => ({ name, login, siteId }))

  return leaders
}
