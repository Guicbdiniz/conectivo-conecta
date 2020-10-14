import { Router } from 'express'
import {
	create,
	login,
	getTrabalhador,
	deleteTrabalhador,
	getAllTrabalhadores,
	editTrabalhador
} from '../controllers/TrabalhadorController'
import { checkTrabalhador, checkUsuario } from '../middlewares/DatabaseCheckers'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

// Middleware to check DB tables.
// Do not use them in production.
router.use(checkUsuario)
router.use(checkTrabalhador)

router.post('/register/', create)
router.post('/login/', login)
router.get('/:email', authenticateJWTToken, getTrabalhador)
router.delete('/:email', authenticateJWTToken, deleteTrabalhador)
router.get('/', authenticateJWTToken, getAllTrabalhadores)
router.put('/:email', authenticateJWTToken, editTrabalhador)

export default router
