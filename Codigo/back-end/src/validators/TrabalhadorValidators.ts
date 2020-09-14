import {
	isTrabalhador,
	isExperienciaProfissional,
	isUsuario
} from '../types/TrabalhadorTypes'

/**
 * Check if request body for worker creation is valid.
 */
export function createBodyIsValid(body: any): Boolean {
	const { trabalhador, experienciasProfissionais, usuario } = body

	for (const experiencia of experienciasProfissionais) {
		if (!isExperienciaProfissional(experiencia)) {
			return false
		}
	}

	return isTrabalhador(trabalhador) && isUsuario(usuario)
}

/**
 * Check if request body for login is valid.
 */
export function loginBodyIsValid(body: any): Boolean {
	return body.email && body.senha
}
