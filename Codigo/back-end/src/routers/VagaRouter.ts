import { Router } from 'express'
import { createVaga, deleteVaga } from '../controllers/VagaControllers'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

//Routes
router.post('/', authenticateJWTToken, createVaga)
router.delete('/:idVaga', authenticateJWTToken, deleteVaga)

export default router
