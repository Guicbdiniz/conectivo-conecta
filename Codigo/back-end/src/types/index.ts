/**
 * Trabalhor model's interface.
 */
export interface Trabalhador {
	cpf: Number
	senha: String
	nomeCompleto: String
	nomeCompletoPai: String
	nomeCompletoMae: String
	numeroDeRG: Number
	dataDeNascimento: String
	localDeNascimento: String
	estadoCivil: String
	temFilhos: Boolean
	telefoneDeContato: String
	email: String
	endereco: String
	escolaridade: String
	experienciasProfissionais: String[]
	objetivoProfissional: String
	resumoProfissional: String
}
