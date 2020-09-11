import { Request, Response } from 'express'
import {
	insert,
	insertExperienciaProfissional
} from '../models/TrabalhadorModel'
import { Trabalhador, ExperienciaProfissional } from '../types/TrabalhadorTypes'
import bcrypt from 'bcrypt'
import { createBodyIsValid } from '../validators/TrabalhadorValidators'

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
