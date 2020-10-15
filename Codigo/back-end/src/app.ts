import { config } from 'dotenv'

// Add environment variables
config()

import express from 'express'
import bodyParser from 'body-parser'

import TrabalhadorRouter from './routers/TrabalhadorRouter'
import { checkDatabase } from './middlewares/DatabaseCheckers'

const app = express()

// Global Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(checkDatabase)

// Routes
app.use('/trabalhador', TrabalhadorRouter)

export default app
