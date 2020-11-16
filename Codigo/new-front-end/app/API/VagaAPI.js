import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = `http://${Constants?.manifest?.debuggerHost
	?.split(':')
	.shift()}:8080`

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * Make a POST request to the API to create a new Vaga.
 */
export async function createVaga(vagaData, authToken) {
	try {
		const { data } = await axios({
			method: 'post',
			url: '/vaga/',
			headers: {
				Authorization: authToken
			},
			data: {
				vaga: vagaData
			}
		})

		return data
	} catch (error) {
		const { response } = error
		if (!response) {
			console.log(error)
			throw 'Houve um erro por motivos desconhecidos.'
		} else {
			console.log(response)
			throw 'Não foi possível registrar a vaga.'
		}
	}
}

/**
 * Make a GET request to the API to get the vaga with the passed id.
 *
 * Returns a vaga object.
 */
export async function getVaga(vagaId, token) {
	try {
		const { data } = await axios({
			method: 'get',
			url: '/vaga/' + vagaId,
			headers: {
				Authorization: token
			}
		})

		return data.vaga
	} catch (err) {
		console.log(err.response)
		throw err
	}
}

/**
 * Make a GET request to the API to get all the vagas related to the passed CNPJ.
 *
 * Returns a array of vagas objects.
 */
export async function getVagasFromCnpj(cnpj, token) {
	try {
		const { data } = await axios({
			method: 'get',
			url: '/vaga/withcnpj/' + cnpj,
			headers: {
				Authorization: token
			}
		})

		return data.vagas
	} catch (err) {
		console.log(err.response)
		throw 'Houve um erro ao tentar adquirir as vagas do seu perfil.'
	}
}

/**
 * Make a GET request to the API to get all the trabalhadores related to the passed vaga id.
 *
 * Returns a array of trabalhador objects.
 */
export async function getAllTrabalhadoresFromVaga(vagaId, token) {
	try {
		const { data } = await axios({
			method: 'get',
			url: '/trabalhador/fromvaga/' + vagaId,
			headers: {
				Authorization: token
			}
		})

		return data.trabalhadores
	} catch (err) {
		console.log(err.response)
		throw 'Houve um erro ao tentar adquirir as vagas do seu perfil.'
	}
}

/**
 * Make a DELETE request to the API to delete the vaga with the passed id.
 */
export async function deleteVaga(vagaId, token) {
	try {
		const { data } = await axios({
			method: 'delete',
			url: '/vaga/' + vagaId,
			headers: {
				Authorization: token
			}
		})

		return
	} catch (err) {
		console.log(err.response)
		throw 'Houve um erro ao tentar deletar a vaga.'
	}
}

/**
 * Make a PUT request to the API to edit the vaga with the passed id.
 */
export async function editVaga(vagaId, changes, token) {
	try {
		const { data } = await axios({
			method: 'put',
			url: '/vaga/' + vagaId,
			headers: {
				Authorization: token
			},
			data: {
				changes: changes
			}
		})

		return data.vaga
	} catch (err) {
		console.log(err.response)
		throw 'Houve um erro ao tentar editar a vaga.'
	}
}
