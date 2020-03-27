import { Router } from 'express'
import { authRequired } from '../middlewares'
import {
  healthCheck,
  createUser,
  signin,
  commitment,
  checkCommitment,
  checklist,
  listVouchers,
  listDonations,
  receive,
  donate,
  endDonation
} from "../rules";

export const router = Router()

// verificacao de saude do back-end
router.get('/health-check', (req, res) => res.status(200).json(healthCheck()))

// criacao de novos usuarios
router.post('/users', authRequired('admin'), (req, res) => createUser(req.body)
  .then(user => res.status(201).json(user))
  .catch(err => {
    console.log(err)
    err.name === 'ValidationError'
      ? res.status(400).json({ message: err.message })
      : res.status(500).json({ message: 'Internal' })
  }))

// login generico / lider
router.post('/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// login de admin
router.post('/admin/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/vouchers', authRequired('leader'), (req, res) =>
  listVouchers(req.auth)
    .then(data => res.status(data.length === 0 ? 404 : 200).json(data))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/donations', authRequired('leader'), (req, res) =>
  listDonations(req.auth)
    .then(data => res.status(data.donations.length === 0 ? 404 : 200).json(data))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// recebimento de doacoes SUPERMERCADO > LIDER
router.post('/donations/:donationId/receive', authRequired('leader'), (req, res) =>
  receive({
    login: req.auth.login,
    donationId: req.params.donationId,
    lat: req.body.lat,
    lon: req.body.lon,
    receivedQuantity: req.body.receivedQuantity,
    receiveDonationFile: req.files.receiveDonationFile
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// entregar p/ familia LIDER > FAMILIA
router.post('/donations/:donationId/donate', authRequired('leader'), (req, res) =>
  donate({
    login: req.auth.login,
    donationId: req.params.donationId,
    voucherId: req.body.voucherId,
    leaderLogin: req.body,
    lat: req.body.lat,
    lon: req.body.lon,
    quantity: req.body.quantity,
    receivedCpf: req.body.receivedCpf,
    receivedName: req.body.receivedName,
    donateDonationFile: req.files ? req.files.donateDonationFile : undefined
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// encerrar a doacao
router.post('/donations/:donationId/end', authRequired('leader'), (req, res) =>
  endDonation({
    donationId: req.params.donationId
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// guardar termo do lider, so retorna 201 sem conteudo
router.post('/commitment', authRequired('leader'), (req, res) =>
  commitment(req.auth)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// retornar check commitment
router.get('/commitment/check', authRequired('leader'), (req, res) =>
  checkCommitment(req.auth)
    .then((data) => res.status(201).json(data))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// guardar checklist, so retorna 201 sem conteudo
router.post('/checklist', authRequired('leader'), (req, res) =>
  checklist(req.auth)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))
