import { isTrabalhador, isUsuario } from '../types/TrabalhadorTypes'

/**
 * Check if request body for worker creation is valid.
 */
export function createBodyIsValid(body: any): Boolean {
	const { trabalhador, usuario } = body
	return isTrabalhador(trabalhador) && isUsuario(usuario)
}

/**
 * Check if request body for login is valid.
 */
export function loginBodyIsValid(body: any): Boolean {
	return body.email && body.senha
}
