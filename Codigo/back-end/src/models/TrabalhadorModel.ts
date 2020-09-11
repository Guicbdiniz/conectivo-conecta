import sql from '../db'
import { Trabalhador, ExperienciaProfissional } from '../types/TrabalhadorTypes'

/**
 * Insert a new Trabalhador instance in MySQL database.
 */
export function insert(newTrabalhador: Trabalhador) {
	return new Promise(function (resolve, reject) {
		const queryString = `INSERT INTO Trabalhador SET ?`

		sql.query(queryString, newTrabalhador, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New trabalhador was created!\n', newTrabalhador)
			resolve(newTrabalhador)
		})
	})
}

/**
 * Insert a new Experiencia Profissional in MySQL database.
 */
export function insertExperienciaProfissional(
	newExperienciaProfissional: ExperienciaProfissional,
	cpf: Number
) {
	return new Promise(function (resolve, reject) {
		const queryString =
			'INSERT INTO `experienciaprofissional` ' +
			"(`cargo`, `local`, `trabalhador`) VALUES ('" +
			newExperienciaProfissional.cargo +
			"', '" +
			newExperienciaProfissional.local +
			"', '" +
			cpf +
			"');"

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log(
				'New ExperienciaProfissional was created!',
				newExperienciaProfissional
			)
			resolve(newExperienciaProfissional)
		})
	})
}
