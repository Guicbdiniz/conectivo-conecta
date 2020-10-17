import { Router } from 'express'
import { createVaga } from '../controllers/VagaControllers'
import { authenticateJWTToken } from '../middlewares/TokenAuth'

const router = Router()

//Routes
router.post('/', createVaga)

export default router
