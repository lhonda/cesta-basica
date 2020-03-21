import { Router } from 'express'
import { healthCheck } from '../rules'

export const router = Router()
router.get('/health-check', (req, res) => res.status(200).json(healthCheck()))
