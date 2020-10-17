import { Request, Response } from 'express'
import { createVagaBodyIsValid } from '../validators/VagaValidators'
import { insertVaga, removeVaga } from '../models/VagaModels'

/**
 * Create vaga controller.
 */
export async function createVaga(req: Request, res: Response) {
	if (!createVagaBodyIsValid(req.body)) {
		return res.status(400).json({
			message: 'Error: incorrect request body!'
		})
	}

	const { vaga } = req.body

	try {
		await insertVaga(vaga)

		res.status(200).json({
			message: 'Vaga criada com sucesso!',
			vaga: vaga
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}

/**
 * Delete vaga controller.
 */
export async function deleteVaga(req: Request, res: Response) {
	const { idVaga } = req.params

	if (!idVaga) {
		res.status(400).json({
			message: 'No id from vaga was found!'
		})
	}

	try {
		const idVagaAsNumber = parseInt(idVaga)

		await removeVaga(idVagaAsNumber)

		res.status(200).json({
			message: 'Vaga with ID ' + idVaga + ' removed!'
		})
	} catch (err) {
		res.status(500).json({
			message: `Error: ${err}`
		})
	}
}
