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
  deleteEvents
} from '../rules'

export const router = Router()

// verificacao de saude do back-end
router.get('/health-check', (req, res) => res.status(200).json(healthCheck()))

// criacao de novos usuarios
router.post('/users', authRequired('admin'), (req, res, next) =>
  createUser(req.body)
    .then(user => res.status(201).json(user))
    .catch(next))

// login generico / lider
router.post('/sign-in', (req, res) =>
  signin(req.body)
    .then(signinData => res.status(200).json(signinData))
    .catch(err => {
      console.log(err)
      res.status(401).json({ message: err.message })
    }))

// login de admin
router.post('/admin/sign-in', (req, res) => res.redirect(301, '/sign-in'))

// listar vouchers de uma doacao
router.get('/vouchers', authRequired('leader'), (req, res, next) =>
  listVouchers({
    login: req.auth.login,
    donationId: req.query.donationId
  })
    .then(data => res.status(200).json(data))
    .catch(next))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/donations', authRequired('leader'), (req, res, next) =>
  filterDonation(req.query.donationId)
    .then(data => res.status(200).json(data))
    .catch(next))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/leader', authRequired('leader'), (req, res, next) =>
  filterLeader(req.query.name)
    .then(data => res.status(200).json(data))
    .catch(next))

// listar doações que foram pre carregadas no banco de dados
router.get('/filter/site', authRequired('leader'), (req, res, next) =>
  filterSite(req.query.name)
    .then(data => res.status(200).json(data))
    .catch(next))

// listar doações que foram pre carregadas no banco de dados
router.get('/donations', authRequired(), (req, res, next) =>
  findDonationByUser(req.auth)
    .then(data => res.status(200).json(data))
    .catch(next))

// recebimento de doacoes SUPERMERCADO > LIDER
router.post('/donations/:donationId/receive', authRequired('leader'), (req, res, next) => {
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
  })
    .then(() => res.status(204).end())
    .catch(next)
})

// entregar p/ familia LIDER > FAMILIA
router.post('/donations/:donationId/donate', authRequired('leader'), (req, res, next) =>
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
  })
    .then(() => res.status(204).end())
    .catch(next))

// encerrar a doacao
router.post('/donations/:donationId/end', authRequired('leader'), (req, res, next) =>
  endDonation({ donationId: req.params.donationId })
    .then(() => res.status(204).end())
    .catch(next))

// guardar termo do lider, so retorna 201 sem conteudo
router.post('/commitment', authRequired('leader'), (req, res, next) =>
  commitment(req.auth)
    .then(() => res.status(201).end())
    .catch(next))

// deletar os eventos de determinando login, so retorna 204 sem conteudo
router.delete('/events', authRequired('admin'), (req, res, next) =>
  deleteEvents({ login: req.body.login })
    .then(() => res.status(204).end())
    .catch(next))

// retornar check commitment
router.get('/commitment/check', authRequired('leader'), (req, res, next) =>
  checkCommitment(req.auth)
    .then((data) => res.status(201).json(data))
    .catch(next))

// guardar checklist, so retorna 201 sem conteudo
router.post('/checklist', authRequired('leader'), (req, res, next) =>
  checklist(req.auth)
    .then(() => res.status(201).end())
    .catch(next))
