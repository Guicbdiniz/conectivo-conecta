import { Router } from 'express'
import { create } from '../controllers/TrabalhadorController'
import {
	checkTrabalhador,
	checkExperienciaProfissional
} from '../middlewares/DatabaseCheckers'

const router = Router()

// Middleware to check DB tables.
// Do not use them in production.
router.use(checkTrabalhador)
router.use(checkExperienciaProfissional)

router.post('/register/', create)

export default router
