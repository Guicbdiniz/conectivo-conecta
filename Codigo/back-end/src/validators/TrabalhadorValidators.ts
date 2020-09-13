import {
	isTrabalhador,
	isExperienciaProfissional
} from '../types/TrabalhadorTypes'

/**
 * Check if request body for worker creation is valid.
 */
export function createBodyIsValid(body: any): Boolean {
	const { trabalhador, experienciasProfissionais } = body

	for (const experiencia of experienciasProfissionais) {
		if (!isExperienciaProfissional(experiencia)) {
			return false
		}
	}

	return isTrabalhador(trabalhador)
}

/**
 * Check if request body for login is valid.
 */
export function loginBodyIsValid(body: any): Boolean {
	return body.email && body.senha
}
