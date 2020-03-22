import { Router } from 'express'
import { healthCheck, signin, signup, donate, receive } from '../rules'
import { authRequired } from '../middlewares'

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

// entregar p/ familia
router.post('/donations/:donationId/donate', authRequired('leader'), (req, res) =>
  donate(req.body, req.file)
    .then(donationData => res.status(200).json(donationData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// recebimento de doacoes do lider
router.post('/donations/:donationId/receive', authRequired('leader'), (req, res) =>
  receive(req.body, req.file)
    .then(donationData => res.status(200).json(donationData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))
