export function roleRequired (role) {
  return (req, res, next) => {
    if (req.auth.role !== role) return res.status(403).send({ message: 'Forbidden' })
    next()
  }
}
