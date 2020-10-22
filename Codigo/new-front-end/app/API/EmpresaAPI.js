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
