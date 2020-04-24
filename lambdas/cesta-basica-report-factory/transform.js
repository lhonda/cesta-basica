const transformations = require('./transformations')

module.exports = (data, entity) => {
  console.log("Entered Transform")
  const transform = transformations[entity](data)
  console.log("TRANSFORM", transform)
  return transform
}