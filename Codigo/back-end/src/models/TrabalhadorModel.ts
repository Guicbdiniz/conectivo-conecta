import sql from '../db'
import { Trabalhador } from '../types'

/**
 * Create a new Trabalhador instance in MySQL database.
 */
export function createTrabalhador(
	newTrabalhador: Trabalhador,
	callback: Function
) {
	sql.query(`INSERT INTO trabalhador SET ?`, newTrabalhador, function (
		err,
		res
	) {
		if (err) {
			console.log('DB error: ', err)
			callback(err, null)
			return
		}

		console.log('New Trabalhador was created! ', newTrabalhador)
		callback(null, newTrabalhador)
	})
}
