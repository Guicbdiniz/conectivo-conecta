import { Request, Response } from 'express'
import {
	insert,
	insertConta,
	selectAllTrabalhadores,
	selectByEmail,
	selectAccountByEmail,
	removeTrabalhador,
	updateTrabalhador
} from '../models/TrabalhadorModel'
import {
	Trabalhador,
	TrabalhadorChanges,
	Conta
} from '../types/TrabalhadorTypes'
import bcrypt from 'bcrypt'
import {
	createBodyIsValid,
	editBodyIsValid,
	loginBodyIsValid
} from '../validators/TrabalhadorValidators'
import jwt from 'jsonwebtoken'

/**
 * Create worker Controller.
 *
 * The request body must contain all the woker's attribute, along with an array with the working experience and an account obejct.
 */
export async function create(req: Request, res: Response) {
	if (createBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: Incorrect request body.'
		})
		return
	}

	const newConta: Conta = { ...req.body.conta }
	const newTrabalhador: Trabalhador = { ...req.body.trabalhador }

	const hashedPassword = await bcrypt.hash(newConta.senha, 10)
	newConta.senha = hashedPassword

	try {
		await insertConta(newConta)

		await insert(newTrabalhador, newConta.email)

		res.status(200).json({
			message: 'Trabalhador created!',
			trabalhador: newTrabalhador,
			conta: newConta
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Login controller.
 *
 * After validation, a valid JWT is returned.
 */
export async function login(req: Request, res: Response) {
	if (!loginBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: request body is invalid!'
		})
		return
	}

	const { email, senha } = req.body

	try {
		const selectedTrabalhador = (await selectByEmail(email)) as Trabalhador
		const selectedAccount = (await selectAccountByEmail(email)) as Conta

		// Password check
		if (await bcrypt.compare(senha, selectedAccount.senha.toString())) {
			const secretJWTKey = process.env.ACCESS_TOKEN_SECRET

			if (secretJWTKey === undefined) {
				throw new Error('Secret JWT key was not defined')
			}

			const accessToken = jwt.sign(selectedTrabalhador, secretJWTKey as string)

			res.status(200).json({
				message: 'Account authenticated with success',
				token: accessToken
			})
		} else {
			res.status(400).json({
				message: 'Error: invalid password.'
			})
		}
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Get Trabalhador Controller.
 */
export async function getTrabalhador(req: Request, res: Response) {
	const { email } = req.params

	try {
		const trabalhador = (await selectByEmail(email)) as Trabalhador
		const conta = (await selectAccountByEmail(email)) as Conta

		res.status(200).json({
			message: 'Trabalhador getted!',
			trabalhador: trabalhador,
			conta: conta
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Delete trabalhador controller.
 */
export async function deleteTrabalhador(req: Request, res: Response) {
	const { email } = req.params

	try {
		await removeTrabalhador(email)

		res.status(200).json({
			message: `Trabalhador with email: ${email} deleted!`
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Get all trabalhadores controller.
 */
export async function getAllTrabalhadores(req: Request, res: Response) {
	try {
		const allTrabalhadores = (await selectAllTrabalhadores()) as Trabalhador[]

		res.status(200).json({
			message: 'Trabalhadores getted!',
			trabalhadores: allTrabalhadores
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}

/**
 * Edit a trabalhador controller.
 */
export async function editTrabalhador(req: Request, res: Response) {
	try {
		if (!editBodyIsValid(req.body)) {
			return res.status(400).json({
				message: 'Error: request body is invalid!'
			})
		}

		const { email } = req.params
		const changes = req.body.changes as TrabalhadorChanges

		await updateTrabalhador(email, changes as TrabalhadorChanges)
		const trabalhador = (await selectByEmail(email)) as Trabalhador

		res.status(200).json({
			message: 'Trabalhador with email ' + email + ' updated with success!',
			trabalhador: trabalhador
		})
	} catch (err) {
		res.status(500).json({
			message: 'Error: ' + err
		})
	}
}
