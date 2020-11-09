import axios from 'axios'
import Constants from 'expo-constants'

const API_URL = `http://${Constants?.manifest?.debuggerHost
	?.split(':')
	.shift()}:8080`

axios.defaults.baseURL = API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

/**
 * Make a POST request to the API to create a new Empresa.
 */
export async function createEmpresa(empresaData, userData) {
	try {
		const { data } = await axios({
			method: 'post',
			url: '/empresa/register/',
			data: {
				empresa: empresaData,
				conta: userData
			}
		})

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
 * Make a POST request to the API to log in a new empresa.
 *
 * Returns a data object with properties 'message' and 'token'.
 */
export async function loginEmpresa(email, senha) {
	try {
		const { data } = await axios({
			method: 'post',
			url: '/empresa/login/',
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
				throw 'Empresa não encontrado!'
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
 * Make a GET request to the API to get the empresa with the passed email.
 *
 * Returns a empresa object.
 */
export async function getEmpresa(email, token) {
	try {
		const { data } = await axios({
			method: 'get',
			url: '/empresa/' + email,
			headers: {
				Authorization: token
			}
		})

		return data.empresa
	} catch (err) {
		console.log(err.response)
		throw err
	}
}

/**
 * Make a DELETE request to the API to get the empresa with the passed email.
 */
export async function deleteEmpresa(email, token) {
	try {
		const { data } = await axios({
			method: 'delete',
			url: '/empresa/' + email,
			headers: {
				Authorization: token
			}
		})

		return data.empresa
	} catch (err) {
		console.log(token)
		console.log(err.response)
		throw err
	}
}
