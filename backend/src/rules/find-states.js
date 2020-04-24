import { Site } from '../repositories'

export async function findStates () {
  let states = await Site.find({}, { _id: 0, state: 1 })

  states = states.filter(function (city) {
    return !this[JSON.stringify(city)] && (this[JSON.stringify(city)] = true)
  }, Object.create(null))

  return states
}
