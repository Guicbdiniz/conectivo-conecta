import { Router } from 'express'
import { getView } from '../controllers/HelloController'

const router = Router()
router.get('/', getView)

export default router
