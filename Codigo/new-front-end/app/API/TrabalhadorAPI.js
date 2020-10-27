import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = `http://${Constants?.manifest?.debuggerHost
	?.split(':')
	.shift()}:8080`

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * Make a POST request to the API to create a new Trabalhador.
 */
export async function createTrabalhador(trabalhadorData, userData) {
	try {
		const { data } = await axios({
			method: 'post',
			url: '/trabalhador/register/',
			data: {
				trabalhador: trabalhadorData,
				conta: userData
			}
		})

		console.log(data)
		return data
	} catch (error) {
		const { response } = error
		if (!response) {
			throw 'Houve um erro por motivos desconhecidos.'
		} else {
			console.log(response)
			throw 'Não foi possível registrar a empresa.'
		}
	}
}

/**
 * Make a POST request to the API to log in a new trabalhador.
 *
 * Returns a data object with properties 'message' and 'token'.
 */
export async function loginTrabalhador(email, senha) {
	try {
		const { data } = await axios({
			method: 'post',
			url: '/trabalhador/login/',
			data: {
				email: email,
				senha: senha
			}
		})

		return data
	} catch (error) {
		const { response } = error
		if (!response) {
			throw 'Houve um erro por motivos desconhecidos.'
		} else {
			const { status } = response
			if (status === 404) {
				throw 'Trabalhador não encontrado!'
			} else if (status === 400) {
				throw 'Dados não preenchidos corretamente!'
			} else if (status === 401) {
				throw 'Senha inválida!'
			} else {
				throw 'Houve um erro interno do servidor!'
			}
		}
	}
}

/**
 * Make a GET request to the API to get the trabalhador with the passed email.
 *
 * Returns a trabalhador object.
 */
export async function getTrabalhador(email, token) {
	try {
		const { data } = await axios({
			method: 'get',
			url: '/trabalhador/' + email,
			headers: {
				Authorization: token
			}
		})

		return data.trabalhador
	} catch (err) {
		console.log(token)
		console.log(err.response)
		throw err
	}
}

/**
 * Make a DELETE request to the API to get the trabalhador with the passed email.
 */
export async function deleteTrabalhador(email, token) {
	try {
		const { data } = await axios({
			method: 'delete',
			url: '/trabalhador/' + email,
			headers: {
				Authorization: token
			}
		})

		return data.trabalhador
	} catch (err) {
		console.log(token)
		console.log(err.response)
		throw err
	}
}

/**
 * Make a PUT request to the API to edit the trabalhador with the passed email.
 */
export async function editTrabalhador(changes, email, token) {
	try {
		const { data } = await axios({
			method: 'put',
			url: '/trabalhador/' + email,
			headers: {
				Authorization: token
			},
			data: {
				changes: changes
			}
		})

		return data.trabalhador
	} catch (err) {
		console.log(token)
		console.log(err.response)
		throw err
	}
}
