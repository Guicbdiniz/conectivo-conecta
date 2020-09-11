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
			resolve(newTrabalhador)
		})
	})
}

/**
 * Insert a new Experiencia Profissional in MySQL database.
 */
export function insertExperienciaProfissional(
	newExperienciaProfissional: ExperienciaProfissional,
	cpf: Number,
	callback: Function
) {
	sql.query(
		`INSERT INTO \`experienciaprofissional\` (\`cargo\`, \`local\`, \`trabalhador\`) VALUES ('${newExperienciaProfissional.cargo}', '${newExperienciaProfissional.local}', '${cpf}');`,
		function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				callback(err, null)
				return
			}

			console.log(
				'New ExperienciaProfissional was created!',
				newExperienciaProfissional
			)
			callback(null, newExperienciaProfissional)
		}
	)
}
