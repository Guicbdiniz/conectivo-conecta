import sql from '../db'
import { Trabalhador, ExperienciaProfissional } from '../types/TrabalhadorTypes'

/**
 * Insert a new Trabalhador instance in MySQL database.
 */
export function insert(newTrabalhador: Trabalhador, callback: Function) {
	sql.query(`INSERT INTO Trabalhador SET ?`, newTrabalhador, function (
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

/**
 * Insert a new Experiencia Profissional in MySQL database.
 */
export function insertExperienciaProfissional(
	newExperienciaProfissional: ExperienciaProfissional,
	cpf: Number,
	callback: Function
) {
	sql.query(
		`INSERT INSERT INTO \`experienciaprofissional\` (\`cargo\`, \`local\`, \`trabalhador\`) VALUES ('${newExperienciaProfissional.cargo}', '${newExperienciaProfissional.local}', '${cpf}');`,
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
