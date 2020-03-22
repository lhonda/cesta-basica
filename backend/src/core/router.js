import { Router } from 'express'
import { healthCheck, signin, signup } from '../rules'

export const router = Router()

router.get('/health-check', (req, res) => res.status(200).json(healthCheck()))

router.post('/sign-up', (req, res) => signup(req.body)
  .then(user => res.status(201).json(user))
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: err.message })
  }))

router.post('/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))
