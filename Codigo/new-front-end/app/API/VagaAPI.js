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

		console.log(data)
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
