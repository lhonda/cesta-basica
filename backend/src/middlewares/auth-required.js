import jwt from 'jsonwebtoken'

const UNAUTHORIZED_MESSAGE = 'Unauthorized request, check your credentials.'
const FORBIDDEN_MESSAGE = 'Forbidden'

export function authRequired (role) {
  return async function (req, res, next) {
    const token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: UNAUTHORIZED_MESSAGE })

    jwt.verify(token, process.env.SECRET, function (err, auth) {
      if (err) {
        // todo: implement logger
        console.log('Error on verify token', err)
        return res.status(401).send({ auth: false, message: UNAUTHORIZED_MESSAGE })
      }

      if (role && auth.role !== role) {
        return res.status(403).send({ auth: true, message: FORBIDDEN_MESSAGE })
      }

      req.auth = auth
      next()
    })
  }
}
