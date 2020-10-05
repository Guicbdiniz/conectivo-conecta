import sql from '../db'
import {
	Trabalhador,
	ExperienciaProfissional,
	Usuario
} from '../types/TrabalhadorTypes'

/**
 * Insert a new Trabalhador instance in MySQL database.
 */
export function insert(
	newTrabalhador: Trabalhador,
	email: String
): Promise<Trabalhador> {
	return new Promise(function (resolve, reject) {
		const queryString = `INSERT INTO Trabalhador SET ?`

		const workerWithEmail: Trabalhador = { ...newTrabalhador, email: email }

		sql.query(queryString, workerWithEmail, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New trabalhador was created!\n', workerWithEmail)
			resolve(workerWithEmail)
		})
	})
}

/**
 * Insert a new Experiencia Profissional in MySQL database.
 */
export function insertExperienciaProfissional(
	newExperienciaProfissional: ExperienciaProfissional,
	cpf: Number
): Promise<ExperienciaProfissional> {
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

/**
 * Insert a new usuario in MySQL database.
 */
export function insertUsuario(usuario: Usuario): Promise<Usuario> {
	return new Promise(function (resolve, reject) {
		const queryString =
			'INSERT INTO `usuario` ' +
			"(`email`, `senha`) VALUES ('" +
			usuario.email +
			"', '" +
			usuario.senha +
			"');"

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New Usuario was created!', usuario)
			resolve(usuario)
		})
	})
}

/**
 * Select all workers from the DB with the passed email.
 */
export function selectByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = `SELECT * FROM Trabalhador WHERE email = '${email}';`

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No Trabalhador was found with the passed email.'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedTrabalhador = Object.values(
				JSON.parse(JSON.stringify(res))
			)[0]

			resolve(returnedTrabalhador)
		})
	})
}

/**
 * Select User with the passed email.
 */
export function selectUserByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = `SELECT * FROM usuario WHERE email = '${email}';`

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No Usuario was found with the passed email.'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedUser = Object.values(JSON.parse(JSON.stringify(res)))[0]

			resolve(returnedUser)
		})
	})
}

/**
 * Select all Trabalhadores from the DB.
 */
export function selectAllTrabalhadores() {
	return new Promise(function (resolve, reject) {
		const queryString = `SELECT * FROM trabalhador`

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			resolve(res)
		})
	})
}
