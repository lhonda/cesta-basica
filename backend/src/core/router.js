/* eslint-disable quotes */
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
  filterDonation,
  filterLeader,
  filterSite,
  findDonationByUser,
  receive,
  donate,
  endDonation,
  deleteEvents,
  updateDonation
} from '../rules'

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

// listar vouchers de uma doacao
router.get('/vouchers', authRequired('leader'), (req, res) =>
  listVouchers({
    login: req.auth.login,
    donationId: req.query.donationId
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/donations', authRequired('leader'), (req, res) =>
  filterDonation(req.query.donationId)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/leader', authRequired('leader'), (req, res) =>
  filterLeader(req.query.name)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/site', authRequired('leader'), (req, res) =>
  filterSite(req.query.name)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// listar doações que foram pre carregadas no banco de dados
router.get('/donations', authRequired(), (req, res) =>
  findDonationByUser(req.auth)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// recebimento de doacoes SUPERMERCADO > LIDER
router.post('/donations/:donationId/receive', authRequired('leader'), (req, res) => {
  console.log(req.auth)
  console.log(req.params)
  console.log(req.body)
  console.log(req.files)
  receive({
    login: req.auth.login,
    donationId: req.params.donationId,
    lat: req.body.lat,
    lon: req.body.lon,
    receivedQuantity: req.body.receivedQuantity,
    receiveDonationFile: req.files ? req.files.receiveDonationFile : undefined
  }).then(() => res.status(204).end()).catch(err => {
    console.log(err)
    res.status(500).json({ message: err.message })
  })
})

// entregar p/ familia LIDER > FAMILIA
router.post('/donations/:donationId/donate', authRequired('leader'), (req, res) =>
  donate({
    login: req.auth.login,
    donationId: req.params.donationId,
    voucherId: req.body.voucherId,
    leaderLogin: req.body,
    lat: req.body.lat,
    lon: req.body.lon,
    delivered: req.body.delivered,
    quantity: req.body.quantity,
    leaderComment: req.body.leaderComment,
    receivedCpf: req.body.receivedCpf,
    receivedName: req.body.receivedName,
    donateDonationFile: req.files ? req.files.donateDonationFile : undefined
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// encerrar a doacao
router.post('/donations/:donationId/end', authRequired('leader'), (req, res) =>
  endDonation({
    donationId: req.params.donationId
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// guardar termo do lider, so retorna 201 sem conteudo
router.post('/commitment', authRequired('leader'), (req, res) =>
  commitment(req.auth)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// deletar os eventos de determinando login, so retorna 204 sem conteudo
router.delete('/events', authRequired('admin'), (req, res) =>
  deleteEvents({
    login: req.body.login
  }).then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// retornar check commitment
router.get('/commitment/check', authRequired('leader'), (req, res) =>
  checkCommitment(req.auth)
    .then((data) => res.status(201).json(data))
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// guardar checklist, so retorna 201 sem conteudo
router.post('/checklist', authRequired('leader'), (req, res) =>
  checklist(req.auth)
    .then(() => res.status(201).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))

// dar update na donation através do admin
router.patch('/donations', authRequired('admin'), (req, res) =>
  updateDonation(
    req.auth.login,
    req.body.leaderLogin,
    req.body.siteId,
    req.body.donationId,
    req.body.quantity,
    req.body.sentDate
  )
    .then(() => res.status(204).end())
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message })
    }))
