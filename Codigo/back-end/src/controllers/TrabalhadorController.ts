import { Request, Response } from 'express'
import {
	insert,
	insertExperienciaProfissional,
	selectByEmail
} from '../models/TrabalhadorModel'
import { Trabalhador, ExperienciaProfissional } from '../types/TrabalhadorTypes'
import bcrypt from 'bcrypt'
import {
	createBodyIsValid,
	loginBodyIsValid
} from '../validators/TrabalhadorValidators'
import jwt from 'jsonwebtoken'

/**
 * Create worker Controller.
 *
 * The request body must contain all the woker's attribute, along with an array with the working experience.
 */
export async function create(req: Request, res: Response) {
	if (createBodyIsValid(req.body)) {
		res.status(400).json({
			message: 'Error: Incorrect request body.'
		})
		return
	}

	const newTrabalhador: Trabalhador = { ...req.body.trabalhador }
	const experienciasProfissionais: ExperienciaProfissional[] =
		req.body.experienciasProfissionais

	const hashedPassword = await bcrypt.hash(newTrabalhador.senha, 10)
	newTrabalhador.senha = hashedPassword

	try {
		await insert(newTrabalhador)

		await createMultipleExperienciasProfissionais(
			experienciasProfissionais,
			newTrabalhador.cpf
		)

		res.status(200).json({
			message: 'Trabalhador created!',
			trabalhador: newTrabalhador,
			experienciasProfissionais: experienciasProfissionais
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Call multiple insertions of ExperienciasProfissionais, returning any errors.
 */
async function createMultipleExperienciasProfissionais(
	experienciasProfissionais: ExperienciaProfissional[],
	cpf: Number
) {
	try {
		for (const experiencia of experienciasProfissionais) {
			await insertExperienciaProfissional(experiencia, cpf)
		}
	} catch (err) {
		throw new Error(err)
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

		// Password check
		if (await bcrypt.compare(senha, selectedTrabalhador.senha.toString())) {
			const secretJWTKey = process.env.ACCESS_TOKEN_SECRET

			if (secretJWTKey === undefined) {
				throw new Error('Secret JWT key was not defined')
			}

			const accessToken = jwt.sign(selectedTrabalhador, secretJWTKey as string)

			res.status(200).json({
				message: 'User authenticated with success',
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
