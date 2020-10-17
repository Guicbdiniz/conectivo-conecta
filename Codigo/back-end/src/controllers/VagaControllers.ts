import { Request, Response } from 'express'
import { createVagaBodyIsValid } from '../validators/VagaValidators'
import { insertVaga } from '../models/VagaModels'

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
