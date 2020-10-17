/**
 * Check if request body for inscricao creation is valid.
 */
export function createInscricaoBodyIsValid(body: any): Boolean {
	const { trabalhadorCpf, idDaVaga } = body
	return trabalhadorCpf && idDaVaga
}
