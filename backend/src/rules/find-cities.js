import { Site } from '../repositories'

export async function findCities ({
  state,
  city
}) {
  if (!state) {
    throw new Error('state is required')
  }

  const filter = { state: new RegExp(`^${state}`, 'i') }

  if (city) {
    filter.city = new RegExp(`^${city}`, 'i')
  }

  const cities = await Site.find(filter, { _id: 0, city: 1 })

  return cities
}
