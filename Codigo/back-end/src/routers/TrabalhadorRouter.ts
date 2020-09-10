import { Router } from 'express'
import { create } from '../controllers/TrabalhadorController'

const router = Router()

router.post('/register/', create)

export default router
