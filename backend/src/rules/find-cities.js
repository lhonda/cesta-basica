import { Site } from '../repositories'

export async function findCities ({
  state,
  city
}) {
  if (!state) {
    throw new Error('A variável state deve ser preenchida')
  }

  const filter = { state: new RegExp(`^${state}`, 'i') }

  if (city) {
    filter.city = new RegExp(`^${city}`, 'i')
  }

  let cities = await Site.find(filter, { _id: 0, city: 1 })

  cities = cities.filter(function (city) {
    return !this[JSON.stringify(city)] && (this[JSON.stringify(city)] = true)
  }, Object.create(null))

  return cities
}
