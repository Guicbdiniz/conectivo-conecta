import { isVaga } from '../types/VagaTypes'

/**
 * Check if request body for vaga creation is valid.
 */
export function createVagaBodyIsValid(body: any): Boolean {
	const { vaga } = body
	return isVaga(vaga)
}
