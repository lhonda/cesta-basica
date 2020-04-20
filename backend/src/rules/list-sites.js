import { Site } from '../repositories'

export async function listSites ({ city }) {
  if (city) {
    return (await Site.find({ city: new RegExp(city, 'i') }, { name: 1, city: 1, state: 1, siteId: 1 }))
      .map(({ name, city, state, siteId }) => ({ name, city, state, siteId }))
  }

  return (await Site.find({}, { name: 1, city: 1, state: 1, siteId: 1 }))
    .map(({ name, city, state, siteId }) => ({ name, city, state, siteId }))
}
