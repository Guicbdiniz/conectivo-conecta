import { Router } from 'express'
import {
	create,
	delete,
	login,
	getTrabalhador,
	getAllTrabalhadores
} from '../controllers/TrabalhadorController'
import { checkTrabalhador, checkUsuario } from '../middlewares/DatabaseCheckers'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

// Middleware to check DB tables.
// Do not use them in production.
router.use(checkTrabalhador)
router.use(checkUsuario)

router.post('/remove/', delete)
router.post('/register/', create)
router.post('/login/', login)
router.get('/:email', authenticateJWTToken, getTrabalhador)
router.get('/', authenticateJWTToken, getAllTrabalhadores)

export default router
