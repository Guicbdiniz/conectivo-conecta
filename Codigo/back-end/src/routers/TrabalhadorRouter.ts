import { Router } from 'express'
import { create, login } from '../controllers/TrabalhadorController'
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
router.post('/login/', login)

export default router
