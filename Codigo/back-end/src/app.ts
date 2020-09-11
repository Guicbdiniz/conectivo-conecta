import { config } from 'dotenv'

// Add environment variables
config()

import express from 'express'
import bodyParser from 'body-parser'

import TrabalhadorRouter from './routers/TrabalhadorRouter'
import HelloRouter from './routers/HelloRouter'

const app = express()

// Global Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/hello', HelloRouter)
app.use('/trabalhador', TrabalhadorRouter)

app.listen(8000, () => {
	console.log('Server is running...')
})
